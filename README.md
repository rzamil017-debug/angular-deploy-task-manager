# Angular task manager

Небольшое Angular-приложение для списка задач. Можно добавлять задачи, отмечать выполненные, фильтровать, удалять и смотреть прогресс. Данные сохраняются в браузере.

## Запуск локально

Требуются Node.js 24 и pnpm 11.

```sh
pnpm install
pnpm start
```

Production-сборка: `pnpm build`. Файлы сборки находятся в `dist/angular-deploy-task-manager/browser`.

## CI/CD

GitHub Actions автоматически устанавливает зависимости и собирает приложение на pull request и при каждом push в `main`.

Для публикации подключите этот GitHub-репозиторий в Vercel. Vercel будет автоматически собирать и публиковать коммиты из `main`; в настройках проекта Vercel укажите команду сборки `pnpm build` и каталог `dist/angular-deploy-task-manager/browser`. Файл `vercel.json` настраивает каталог и SPA-маршрутизацию на `index.html`.
