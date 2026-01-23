# Pakernia - Aplikacja Treningowa

Aplikacja mobilna i webowa do śledzenia treningów i postępów.

## Wymagania

- **Node.js** 18+ 
- **Python** 3.10+
- **Expo Go** (aplikacja na telefon)

---

## Opcja 1: Lokalny backend + Lokalny frontend

### Backend

```bash
cd Pakernia/backend
python3 -m venv venv
source venv/bin/activate        # Linux
# lub: venv\Scripts\activate    # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend: `http://localhost:8000/api`

### Frontend

```bash
cd Pakernia
npm install
```

Utwórz plik `.env`:
```env
API_URL=http://localhost:8000/api
```

Uruchom:
```bash
npx expo start --tunnel
```

- **Przeglądarka:** wciśnij `w` lub otwórz `http://localhost:8081`
- **Telefon:** zeskanuj kod QR aplikacją Expo Go

---

## Opcja 2: Azure backend + Lokalny frontend

Nie wymaga uruchamiania backendu

```bash
cd Pakernia
npm install
```

Utwórz plik `.env`:
```env
API_URL=https://pakernia-api.azurewebsites.net/api
```

Uruchom:
```bash
npx expo start --tunnel
```

- **Przeglądarka:** wciśnij `w` lub otwórz `http://localhost:8081`
- **Telefon:** zeskanuj kod QR aplikacją Expo Go
