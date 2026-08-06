# Blueprint: NOVUS MVP Scope

## Status

Founder-issued. This document defines what the MVP is. Any module not
listed under "MVP modules" is out of scope until this file says otherwise.

## Objective

Build the core foundation of NOVUS as an AI Operating System, validating
the essential experience before expanding into more advanced capabilities.

NOVUS is a scalable SaaS, not a prototype. The MVP must actually work.
It stays focused and is architected to support future growth without
implementing future features prematurely.

## MVP modules

### Authentication
User registration, login, logout, password recovery, user profile
management.

### Dashboard
The main entry point of NOVUS: daily overview, active projects, active
goals, recent conversations, recent activity, intelligent
recommendations, quick access to all modules.

### Chat
An interface to interact with NOVUS, **not the product itself**.
AI conversations, streaming responses, conversation history, markdown
support, code rendering, file attachments, conversation search,
persistent context.

### Memory Engine
Core component. Stores long-term memory; remembers conversations,
projects, goals, user preferences and important decisions; updates
memory automatically.

### Projects
Name, description, status, priority, related conversations, related
goals, files.

### Goals
Create and update goals, progress tracking, deadlines, priorities, goal
status.

### Financial Hub
Income tracking, expense tracking, categories, financial overview,
financial goals.

### Knowledge Base
Ingest PDF, DOCX, TXT and Markdown. Documents become searchable and
usable by the AI.

### AI Router
Automatically selects the most appropriate model for the task.
Providers: OpenAI, Anthropic, Gemini, Perplexity, DeepSeek.

### Decision Engine (initial version)
Contextual recommendations from user information: prioritize projects,
suggest next actions, detect risks, productivity insights, goal
reminders.

### Settings
User profile, AI preferences, API keys, privacy settings, memory
settings.

### Backend
Core services supporting every MVP module.

### Database
Users, conversations, messages, memories, projects, goals, documents,
financial records, settings.

### Infrastructure
GitHub, Vercel, Cloudflare, PostgreSQL, Supabase, Redis.

## Out of scope

The following belong to the long-term vision and **must not be
implemented in the MVP**. The architecture should be designed so they can
be added later without major rework.

Voice mode and always-on voice assistant. Specialized AI agents (CEO,
finance, sales, marketing, programming, research, legal, fitness,
nutrition, travel). Automation engine. Calendar integration (Google,
Outlook, Apple). Email integration (Gmail, Outlook). Messaging
integrations (WhatsApp, Slack, Discord). GitHub integration. Notion
integration. Cloud storage integrations (Google Drive, Dropbox, OneDrive,
iCloud). Multi workspace (personal, business, teams, clients). Team
collaboration with roles and permissions. Mobile apps (iOS, Android).
Desktop apps (Windows, macOS, Linux). Browser extension. Knowledge graph.
Advanced memory (semantic retrieval, compression, context optimization).
Advanced decision engine (predictions, simulations). Financial
intelligence and forecasting. Health hub. Business OS (CRM, sales,
operations). AI phone assistant. Vision. Screen understanding. AI
workspace. Marketplace. Public API. Enterprise (SSO, audit logs,
organization administration).

## Development note

Focus exclusively on the MVP modules above. The future roadmap exists
only as architectural guidance. Build with scalability in mind so future
features integrate without major architectural changes.
