
# CLAUDE.md — Project Instructions for Claude Code

## Codebase Reference

Read `CODEBASE_INDEX.md` at the project root before making changes.
It contains a complete catalog of every file, component, route, hook,
utility, API endpoint, style, config, and asset in this project.

## Session Memory Protocol

**START of every session:**
1. Call `read_session_log` (last_n: 5) to load context from recent sessions
2. Call `read_codebase_index` to understand current project structure
3. If the user references a specific area, call `search_index` with relevant terms

**END of every session (or after significant changes):**
Call `log_session_facts` with ALL of the following that apply:
- `summary`: One-line description of what was accomplished
- `files_changed`: Every file created, modified, deleted, or renamed
- `decisions`: Any architectural or design decisions and WHY they were made
- `bugs_found`: Bugs identified, their status (fixed/in_progress/deferred), and fixes
- `context`: Important state information (e.g., "auth is half-migrated to Clerk")
- `todos`: Unfinished work flagged for future sessions
- `dependencies`: Packages added, removed, or updated

**After structural changes (new pages, deleted files, reorganization):**
Call `reindex_codebase` to regenerate CODEBASE_INDEX.md

## Rules

- Never guess at file locations. Check the index or use search_index first.
- When creating new files, follow existing patterns visible in the index.
- Log every session. Skipping this breaks continuity for the next session.
