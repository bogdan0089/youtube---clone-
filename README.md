# YouTube Clone

Клон YouTube: бекенд на Django + DRF, фронтенд на React + Vite.

## Стек

- **Backend:** Python 3.12+, Django 5.2, Django REST Framework, PostgreSQL 17
- **Frontend:** React 19, Vite
- **Інфраструктура:** Docker Compose

## Структура

```
youtube-clone/
├── backend/             # Django API
│   ├── apps/            # модулі проєкту (core, users, videos…)
│   ├── config/          # налаштування і головні urls
│   └── manage.py
├── frontend/            # React-застосунок
│   └── src/
├── docker-compose.yml   # PostgreSQL
└── .env.example         # шаблон змінних оточення
```

## Що встановити

- [Git](https://git-scm.com/downloads/win)
- [Python 3.12+](https://www.python.org/downloads/) — при встановленні відмітити **Add python.exe to PATH**
- [Node.js 20+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Перший запуск

Усі команди для PowerShell.

**1. Клонувати репозиторій**

```
git clone https://github.com/bogdan0089/youtube---clone-.git youtube-clone
cd youtube-clone
```

**2. Створити `.env`**

```
Copy-Item .env.example .env
```

У `.env` замінити `SECRET_KEY=change-me` на випадковий рядок.

**3. Запустити базу**

```
docker compose up -d
```

**4. Backend** (перше вікно терміналу)

```
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver 8010
```

Перевірка: http://127.0.0.1:8010/api/health/ → `{"status": "ok"}`

Якщо `activate` видає помилку про scripts:

```
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

**5. Frontend** (друге вікно терміналу)

```
cd frontend
npm install
npm run dev
```

Відкрити http://localhost:5173 — має бути **Backend: ok**.

## Звідки запускати команди

| Команди | Папка |
|---|---|
| `git …`, `docker compose …` | `youtube-clone/` |
| `python manage.py …`, `pip …` | `youtube-clone/backend/` |
| `npm …` | `youtube-clone/frontend/` |

## Як працюємо з git

- `main` — стабільна версія, `dev` — робоча гілка.
- Напряму в `main` і `dev` не пушимо.
- Кожна задача — окрема гілка від `dev`:

```
git checkout dev
git pull
git checkout -b feature/назва-задачі
```

- Коміти короткі, англійською, з префіксом:
  - `feat:` — нова функціональність
  - `fix:` — виправлення помилки
  - `chore:` — налаштування, залежності
  - `docs:` — документація
- Після пушу гілки відкриваємо Pull Request у `dev`.

## Команда

- [bogdan0089](https://github.com/bogdan0089)
