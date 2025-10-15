# Contact Form (React + Laravel)

Простий проект контактної форми з React на фронтенді та Laravel на бекенді. Форма відправляє дані через API і надсилає лист на Gmail.

---

## 1. Клонування репозиторію

```bash
git clone <URL твого репозиторію>
cd contact-form
```

---

## 2. Налаштування Laravel (бекенд)

### 2.1 Встановлення залежностей
```bash
cd server
composer install
```

### 2.2 Налаштування .env

Створи файл `.env` (скопіювати з `.env.example`) і відредагуй:

```env
APP_NAME=ContactForm
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/server/database/database.sqlite

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=твій_емейл@gmail.com
MAIL_PASSWORD=твій_app_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=твій_емейл@gmail.com
MAIL_FROM_NAME="Contact Form"
```

> Для Gmail потрібно створити **App Password** (Security → App Passwords). Не використовуйте звичайний пароль.

### 2.3 Створити файл SQLite
```powershell
cd database
New-Item -ItemType File -Path database.sqlite
```

### 2.4 Очистити кеш конфігурації
```bash
php artisan config:clear
php artisan cache:clear
```

### 2.5 Запуск Laravel
```bash
php artisan serve --port=8000
```

- Сервер буде доступний за: `http://localhost:8000`

---

## 3. Налаштування React (фронтенд)

### 3.1 Встановлення залежностей
```bash
cd ../client
npm install
```

### 3.2 Запуск React
```bash
npm start
```

- Фронтенд буде доступний за: `http://localhost:3000`

> Переконайся, що `axios.post` у React звертається на `http://localhost:8000/api/submit-form`.

---

## 4. Тестування

1. Відкрий `http://localhost:3000` у браузері.  
2. Заповни форму:
   - Email **обов’язковий**
   - Name і Message — необов’язкові  
3. Натисни **Відправити**.  
4. Якщо дані валідні → ти побачиш повідомлення “Форма успішно відправлена!”  
5. На пошту `MAIL_FROM_ADDRESS` надійде лист з даними форми.  
6. Якщо Email порожній або некоректний → під полем з’явиться повідомлення про помилку.

---

## 5. Важливі нотатки

- Якщо ти отримуєш помилку **SMTP / App Password**, перевір:
  - Чи увімкнено двофакторну аутентифікацію Gmail
  - Чи використовуєш App Password у `.env`
- Якщо фронтенд не відправляє форму → перевір CORS у Laravel (`config/cors.php`):
```php
'paths' => ['api/*'],
'allowed_origins' => ['*'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
```

---

## 6. Корисні команди

- Перевірка маршрутів Laravel:
```bash
php artisan route:list
```
- Очистка кешу та конфігурації:
```bash
php artisan config:clear
php artisan cache:clear
```
- Встановлення залежностей фронтенду:
```bash
npm install
npm start
```

---

Тепер проект готовий до локального запуску та тестування контактної форми!

