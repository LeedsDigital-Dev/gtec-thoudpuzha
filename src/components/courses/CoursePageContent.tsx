import type { CourseContent, CourseListBlock } from "@/lib/course-content.types";

interface CoursePageContentProps {
  titleEn: string;
  titleMl: string | null;
  descriptionEn: string | null;
  descriptionMl: string | null;
  coverImageUrl: string | null;
  contentBlocks: CourseContent | null;
  preview?: boolean;
  locale?: string;
}

export function CoursePageContent({
  titleEn,
  titleMl,
  descriptionEn,
  descriptionMl,
  coverImageUrl,
  contentBlocks,
  preview = false,
  locale = "en",
}: CoursePageContentProps) {
  const t = (en: string | undefined | null, ml: string | undefined | null) =>
    locale === "ml" && ml ? ml : en ?? "";

  const tagline = t(contentBlocks?.heroTaglineEn, contentBlocks?.heroTaglineMl);
  const overview = t(contentBlocks?.overviewEn, contentBlocks?.overviewMl);
  const detailedContent = t(contentBlocks?.detailedContentEn, contentBlocks?.detailedContentMl);
  const detailedImage = contentBlocks?.detailedContentImageUrl;
  const courseLists = contentBlocks?.courseLists ?? [];
  const benefits = contentBlocks?.benefits;
  const description = t(descriptionEn, descriptionMl);

  return (
    <div className="space-y-10">
      {/* Hero */}
      {tagline && (
        <section className="rounded-lg bg-muted/40 p-8 text-center">
          <h2 className="text-3xl font-bold mb-3">
            {t(titleEn, titleMl)}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {tagline}
          </p>
        </section>
      )}

      {/* Fallback hero when no tagline but we want to show title */}
      {!tagline && (
        <section className="py-6">
          <h2 className="text-3xl font-bold mb-3">
            {t(titleEn, titleMl)}
          </h2>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </section>
      )}

      {/* Overview */}
      {overview && (
        <section className="prose prose-sm max-w-none">
          <p>{overview}</p>
        </section>
      )}

      {/* Detailed Content */}
      {detailedContent && (
        <section className="space-y-4">
          {detailedContent
            .split("\n\n")
            .filter(Boolean)
            .map((para, i) => (
              <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                {para}
              </p>
            ))}
        </section>
      )}

      {/* Content Image */}
      {detailedImage && (
        <section className="flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={detailedImage}
            alt=""
            className="max-w-full rounded-lg object-cover max-h-80"
            loading="lazy"
          />
        </section>
      )}

      {/* Course Lists */}
      {courseLists.length > 0 && (
        <section className="space-y-8">
          {courseLists.map((list, listIdx) => (
            <CourseListSection key={listIdx} list={list} />
          ))}
        </section>
      )}

      {/* Benefits */}
      {benefits && benefits.items.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-xl font-semibold">
            {benefits.heading || "Benefits of the course"}
          </h3>
          <ul className="space-y-2">
            {benefits.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                <span className="text-sm">{t(item.textEn, item.textMl)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Preview indicator when no content */}
      {preview && !tagline && !overview && !detailedContent && courseLists.length === 0 && !benefits?.items.length && (
        <section className="text-center py-8 text-muted-foreground">
          <p>No content configured yet. Fill in the tabs above to build this page.</p>
        </section>
      )}
    </div>
  );
}

function CourseListSection({ list }: { list: CourseListBlock }) {
  return (
    <div>
      {list.heading && (
        <h3 className="text-xl font-semibold mb-3">{list.heading}</h3>
      )}
      <div className="rounded border border-border overflow-x-auto">
        <table className="w-full min-w-[400px] border-collapse text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="border border-border px-4 py-2 text-left font-medium w-1/3 whitespace-nowrap">
                Code
              </th>
              <th className="border border-border px-4 py-2 text-left font-medium whitespace-nowrap">
                Course Name
              </th>
            </tr>
          </thead>
          <tbody>
            {list.items.map((item, idx) => (
              <tr key={idx} className="even:bg-muted/20">
                <td className="border border-border px-4 py-2 font-mono text-xs whitespace-nowrap">
                  {item.code}
                </td>
                <td className="border border-border px-4 py-2">{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
