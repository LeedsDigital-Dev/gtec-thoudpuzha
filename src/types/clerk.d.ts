export interface SessionClaimsMetadata {
  role?: string;
}

declare global {
  interface CustomJwtSessionClaims {
    metadata?: SessionClaimsMetadata;
  }
}
