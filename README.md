# План — Angular task manager

Небольшое Angular-приложение для управления задачами: добавление, фильтрация, отметка выполнения, удаление, прогресс и автоматическое сохранение в браузере.

## Локальный запуск

Требуются Node.js 24.15+ и pnpm 11.

```sh
pnpm install
pnpm start
```

Сборка: `pnpm build`. Результат — `dist/angular-deploy-task-manager/browser`.

## CI/CD

GitHub Actions собирает приложение для pull request и при push в `main`. После успешной сборки workflow собирает production-версию и публикует её в Vercel. В GitHub → Settings → Secrets and variables → Actions добавьте `VERCEL_TOKEN`, `VERCEL_ORG_ID` и `VERCEL_PROJECT_ID`.

Файл `vercel.json` задаёт каталог сборки и SPA rewrite на `index.html`.
