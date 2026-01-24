# Pakernia - Aplikacja Treningowa

Aplikacja mobilna i webowa do śledzenia treningów i postępów.

## Wymagania

- **Node.js** 18+ 
- **Python** 3.10+ (tylko dla lokalnego backendu)
- **Expo Go** (aplikacja na telefon)

---

## Szybki start (Azure backend)


```bash
# 1. Zainstaluj zależności
npm install

# 2. Utwórz plik .env z adresem Azure API
echo "API_URL=https://pakernia-api.azurewebsites.net/api" > .env

# 3. Uruchom aplikację
npx expo start
```

**Dostęp do aplikacji:**
- **Przeglądarka:** wciśnij `w` w terminalu lub otwórz `http://localhost:8081`
- **Telefon:** zeskanuj kod QR aplikacją Expo Go

### Alternatywne komendy uruchomienia

```bash
# Standardowy start
npx expo start

# Start z tunelem (dla dostępu z telefonu przez internet)
npx expo start --tunnel

# Tylko web
npx expo start --web
# lub
npm run web
```

---

## Opcja 2: Lokalny backend + Lokalny frontend

### 1. Backend (Django)

```bash
# Utwórz środowisko wirtualne
python3 -m venv venv

# Aktywuj środowisko
source venv/bin/activate        # Linux/Mac
# lub: venv\Scripts\activate    # Windows

# Zainstaluj zależności
pip install -r requirements.txt

# Uruchom migracje bazy danych
python manage.py migrate

# Uruchom serwer
python manage.py runserver
```

Backend będzie dostępny pod: `http://localhost:8000/api`

### 2. Frontend (Expo)

W nowym terminalu:

```bash
# Zainstaluj zależności (jeśli jeszcze nie zainstalowane)
npm install

# Utwórz plik .env z adresem lokalnego API
echo "API_URL=http://localhost:8000/api" > .env

# Uruchom aplikację
npx expo start
```

**Dostęp do aplikacji:**
- **Przeglądarka:** wciśnij `w` w terminalu lub otwórz `http://localhost:8081`
- **Telefon:** zeskanuj kod QR aplikacją Expo Go

