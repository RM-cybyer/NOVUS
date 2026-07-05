# Embeddings

## Purpose

Define how NOVUS may use embeddings for retrieval, similarity and memory discovery without coupling to a provider.

## Responsibilities

- Support semantic retrieval.
- Represent memories, documents, entities and conversations for search.
- Keep embedding generation provider-neutral.
- Govern privacy and retention for embedded content.

## Inputs

- Text content approved for embedding.
- Entity summaries.
- Memory summaries.
- Document chunks.
- Model registry embedding capability.
- Security policy.

## Outputs

- Embedding records.
- Similarity search results.
- Retrieval candidates.
- Reindexing tasks.
- Embedding metadata.

## Interactions with Other Modules

- Memory Engine uses embeddings for retrieval.
- Knowledge Graph can link similar or related entities.
- Context Builder uses retrieval candidates.
- AI Registry selects embedding models.
- Provider Layer calls embedding providers through abstraction.
- Security module controls what content can be embedded.

## Future Scalability

Embeddings should support:

- Multiple embedding models.
- Reindexing after model changes.
- Hybrid keyword and semantic retrieval.
- Domain-specific indexes.
- Privacy-aware indexes.
- User-level data separation.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Fable, QA.

## Engineering Considerations

- Embeddings can leak semantic information and must be treated as sensitive.
- Store enough metadata to reindex.
- Do not embed secrets unless explicitly approved by security policy.
- Retrieval quality should be measured.
- Embedding models should be replaceable through the AI Registry.

## Example Embedding Targets

- Memory summaries.
- User documents.
- Meeting summaries.
- Project notes.
- Goal descriptions.
- Decision records.

