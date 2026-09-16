import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

let s3Client: S3Client | null = null;

function getS3Client(): S3Client {
  if (!s3Client) {
    s3Client = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
    });
  }
  return s3Client;
}

import { promises as fs } from "node:fs";
import path from "node:path";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string[] }> },
) {
  const { key } = await params;
  const objectKey = key.join("/");
  const bucket = process.env.R2_BUCKET_NAME;

  // 1. If R2 is configured, attempt to fetch from R2
  if (bucket && process.env.R2_ACCESS_KEY_ID) {
    try {
      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: objectKey,
      });

      const response = await getS3Client().send(command);

      if (response.Body) {
        const body = await response.Body.transformToByteArray();
        const contentType = response.ContentType ?? "application/octet-stream";

        return new NextResponse(Buffer.from(body), {
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      }
    } catch {
      // Fall through to local check / fallback
    }
  }

  // 2. Check local filesystem fallback (e.g. public/uploads or public)
  const publicRoot = path.join(process.cwd(), "public");
  try {
    const candidatePaths = [
      path.join(publicRoot, "uploads", objectKey),
      path.join(publicRoot, objectKey),
      path.join(publicRoot, "images", objectKey),
    ];

    for (const candidate of candidatePaths) {
      const resolved = path.resolve(candidate);

      // `objectKey` is attacker-controlled, and `path.join` does not neutralise
      // `..` segments — without this guard a request for `/api/media/..%2f.env.local`
      // escapes `public/` and reads arbitrary files from the project root.
      if (!resolved.startsWith(publicRoot + path.sep)) {
        continue;
      }

      try {
        const data = await fs.readFile(resolved);
        const ext = path.extname(resolved).toLowerCase();
        const mimeMap: Record<string, string> = {
          ".png": "image/png",
          ".jpg": "image/jpeg",
          ".jpeg": "image/jpeg",
          ".webp": "image/webp",
          ".svg": "image/svg+xml",
          ".pdf": "application/pdf",
        };
        const contentType = mimeMap[ext] ?? "application/octet-stream";

        return new NextResponse(data, {
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      } catch {
        // Try next candidate path
      }
    }
  } catch {
    // Ignore filesystem errors and return fallback
  }

  // 3. Return a 1×1 transparent PNG as a silent fallback for missing images
  const FALLBACK_PNG = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    "base64",
  );
  return new NextResponse(FALLBACK_PNG, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
