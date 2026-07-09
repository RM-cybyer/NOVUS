# Storage Architecture

## Purpose

Define the official storage architecture for NOVUS.

## Decisions

- Supabase Storage is the primary application storage layer.
- Cloudflare R2 is the future-ready object storage option for scale, cost optimization or enterprise requirements.
- Storage access must be mediated by authorization and policy.

## Responsibilities

- Store user-uploaded files when product features require them.
- Store generated exports and documents when approved.
- Support future document intelligence workflows.
- Preserve privacy and access control.

## Supabase Storage Role

Supabase Storage is preferred initially because it integrates with Supabase Auth, Postgres and Row Level Security policies.

## Cloudflare R2 Role

Cloudflare R2 remains future-ready for:

- Large object storage.
- Cost-sensitive high-volume storage.
- Enterprise or regional storage patterns.
- Provider diversification.

Introducing R2 requires an ADR or blueprint because it adds provider, credential and lifecycle complexity.

## Storage Rules

- No public bucket may store private user data.
- File metadata should be stored in PostgreSQL when it affects product behavior.
- Storage permissions must be tied to auth and ownership.
- Uploads require validation of size, type and intended use.
- Deletion and retention policies must be documented before user files are stored.

## Sensitive Data

Private documents, financial files, identity records and business documents are sensitive. They require:

- Access control.
- Audit consideration.
- Retention policy.
- Provider routing awareness if used for AI context.

## Non-Goals

- No buckets are created here.
- No storage SDK is installed here.
- No upload flow is implemented here.

