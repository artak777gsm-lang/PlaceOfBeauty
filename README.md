# Place of Beauty

Сайт салона красоты в Гродзиск-Мазовецки — [placeof.beauty](https://placeof.beauty).

- **frontend** — React 19 (Create React App через craco), Tailwind, react-router 7, react-helmet-async
- **backend** — FastAPI + MongoDB (услуги, отзывы, галерея, админка)

## Локальный запуск

Нужны Node 22+, Yarn 1, Python 3.10+ и запущенная MongoDB.

### Бэкенд

```bash
cd backend
cp .env.example .env          # пропиши MONGO_URL и DB_NAME
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --reload --port 8000
```

### Фронтенд

```bash
cd frontend
cp .env.example .env          # REACT_APP_BACKEND_URL=http://localhost:8000
yarn install
yarn start                    # http://localhost:3000
```

Фронтенд поднимется и без бэкенда: страницы статичные, из API подтягивается
только прайс на `/uslugi`, и его загрузка молча падает.

## Сборка

```bash
yarn build
```

Это две операции: `craco build` собирает бандл, затем `scripts/prerender.js`
обходит маршруты из `public/sitemap.xml` headless-браузером и раскладывает
готовый HTML по `build/<маршрут>/index.html`.

Пререндер нужен потому, что CRA отдаёт один `index.html` на все URL: до
исполнения JS краулер видел на `/uslugi/piercing` заголовок и описание главной,
а `react-helmet` подставлял правильные только после запуска бандла. Nginx
разбирает готовые каталоги без изменений конфига — `try_files $uri $uri/
/index.html` находит директорию раньше, чем доходит до заглушки.

Сборка не падает, если пререндер не отработал: без доступного Chromium сайт
просто соберётся как раньше, с предупреждением в логе.

| Переменная | Зачем |
|---|---|
| `PUPPETEER_EXECUTABLE_PATH` | Свой бинарник Chromium вместо скачанного puppeteer |
| `PRERENDER_API_ORIGIN` | Куда проксировать `/api` во время рендера (по умолчанию `http://127.0.0.1:8000`) |
| `PRERENDER_TIMEOUT` | Таймаут на маршрут, мс (по умолчанию 30000) |

Прайс на `/uslugi` попадёт в HTML только если во время сборки отвечает бэкенд.
При обновлении боевого сервера он работает (отдаёт прошлый релиз), при первом
разворачивании — нет, и страница отрендерится без прайса.

Отдельно рендерить, не пересобирая бандл, — `yarn prerender`. Скрипт откажется
работать поверх уже пререндеренного `build/index.html` и попросит `yarn build`.

Проверить, что на боевом сервере всё разложилось:

```bash
curl -s https://placeof.beauty/uslugi/piercing | grep -E '<title>|x-prerender'
```

## Деплой

`deploy.sh` — первичная установка на сервер, `update.sh` — обновление
(git pull, зависимости, сборка, nginx, рестарт сервиса).

Учти: `puppeteer` в devDependencies тянет свой Chromium (~180 МБ) при
`yarn install`. Если на сервере тесно с диском, поставь системный Chromium и
пропиши `PUPPETEER_SKIP_DOWNLOAD=true` — скрипт сам найдёт `/usr/bin/chromium`.
