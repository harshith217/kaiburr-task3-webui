<img width="2806" height="1456" alt="Screenshot 2025-10-20 224423" src="https://github.com/user-attachments/assets/057d686c-26d7-4378-b74b-5a0420a13c05" /># Task 3 – Web UI (React + TS + Ant Design)

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
## Screenshots
<img width="2808" height="1450" alt="Screenshot 2025-10-20 224406" src="https://github.com/user-attachments/assets/1962d2c0-94ba-4076-842b-079a9f3dd05f" />
<img width="2806" height="1456" alt="Screenshot 2025-10-20 224423" src="https://github.com/user-attachments/assets/4e804660-d1e7-4928-bd9f-44b1db516346" />
<img width="2796" height="1444" alt="Screenshot 2025-10-20 224434" src="https://github.com/user-attachments/assets/f09caca6-429e-4937-928b-a2b64096016e" />
<img width="2798" height="1455" alt="Screenshot 2025-10-20 224446" src="https://github.com/user-attachments/assets/3cfffe2c-b17d-42c4-b0f9-8b6e8ba09803" />

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
