# Pakernia - Aplikacja Treningowa

Aplikacja mobilna i webowa do śledzenia treningów i postępów.

## Wymagania

- **Node.js** 18+
- **Python** 3.10+ (tylko dla lokalnego backendu)
- **Expo Go** (aplikacja na telefon - opcjonalnie)

## Struktura projektu

```text
pakernia-tim/
├── .env                 ← plik konfiguracyjny (tylko dla lokalnego backendu)
├── backend/             ← serwer Django
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
├── src/                 ← kod frontendowy
├── app.config.js        ← konfiguracja Expo
└── package.json
```

---

## Opcja 1: Szybki start (Azure backend)

Frontend łączy się z backendem hostowanym na Azure.

### Krok 1: Zainstaluj zależności

```bash
npm install
```

### Krok 2: Uruchom aplikację

```bash
npx expo start --tunnel
```

### Dostęp do aplikacji

| Platforma        | Jak uruchomić                                              |
|------------------|-----------------------------------------------------------|
| **Przeglądarka** | Wciśnij `w` w terminalu lub otwórz `http://localhost:8081` |
| **Telefon**      | Zeskanuj kod QR aplikacją Expo Go                          |

---

## Opcja 2: Lokalny backend + Lokalny frontend

Oba serwery uruchomione lokalnie.

### Krok 1: Uruchom backend (Django)

Otwórz terminal i przejdź do folderu `backend/`:

```bash
cd backend
```

Utwórz i aktywuj środowisko wirtualne:

```bash
# Linux/Mac
python3 -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

Zainstaluj zależności i uruchom serwer:

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend działa pod: `http://localhost:8000/api`

### Krok 2: Uruchom frontend (Expo)

Otwórz **nowy terminal** i wróć do głównego folderu projektu.

Zainstaluj zależności:

```bash
npm install
```

Utwórz plik `.env` w **głównym folderze projektu** (tam gdzie `package.json`):

```text
API_URL=http://localhost:8000/api
```

Lub użyj komendy:

```bash
echo "API_URL=http://localhost:8000/api" > .env
```

Uruchom aplikację:

```bash
npx expo start
```

Frontend działa pod: `http://localhost:8081`

### Dostęp do aplikacji (lokalnie)

| Platforma        | Jak uruchomić                                              |
|------------------|-----------------------------------------------------------|
| **Przeglądarka** | Wciśnij `w` w terminalu lub otwórz `http://localhost:8081` |
| **Telefon**      | Zeskanuj kod QR aplikacją Expo Go                          |
