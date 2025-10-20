# Task 3 – Web UI (React + TS + Ant Design)

This is a React 19 + TypeScript + Vite frontend for Task 1 backend. It supports:
- Create, list, search, and delete tasks
- Execute task commands and view execution output
- Ant Design v5 components, accessibility-minded UX

## Prerequisites
- Node.js 18+

## Quick start (Windows PowerShell)

```powershell
# Copy env and set API base URL
Copy-Item .env.example .env

# Install deps
npm install

# Start dev server
npm run dev

# Lint and test
npm run lint
npm test

# Build and preview
npm run build
npm run preview
```

Set `VITE_API_BASE_URL` in `.env` to your Task 1 API, e.g. `http://localhost:8080/api`.

## Structure
- `src/pages/RecordsList.tsx` – list/search/delete tasks
- `src/pages/RecordForm.tsx` – create task form
- `src/pages/CommandRunner.tsx` – execute task commands + view output
- `src/api/client.ts` – Axios client with base URL from env
- `src/types/models.ts` – Task and TaskExecution types

## Notes
- This UI connects to Task 1 backend endpoints:
  - `GET /tasks` – list all tasks
  - `GET /tasks?id={id}` – get single task
  - `GET /tasks/search?name={query}` – search by name
  - `PUT /tasks` – create or update task (requires id, name, owner, command)
  - `DELETE /tasks/{id}` – delete task
  - `PUT /tasks/{id}/execute` – run command, returns TaskExecution
- Adjust URLs/types in `src/types/models.ts` and `src/api/client.ts` if your API differs.

## Accessibility
- Keyboard-friendly controls
- ARIA attributes for busy/live regions
- Clear error/empty/loading states