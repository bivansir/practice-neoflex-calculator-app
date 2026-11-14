# 💳 Credit Card Conveyor — симулятор оформления кредитной карты

Учебный проект, выполненный в рамках практики Neoflex. Веб-приложение, которое имитирует страницу банка для оформления кредитной карты. Пользователь заполняет заявку, получает 4 кредитных предложения, выбирает одно, проходит шаги подписания документов и получает карту.

Микросервисная архитектура на **Spring Boot**, обмен событиями через **Kafka**, хранение заявок в **PostgreSQL** и SPA на **React + TypeScript**.

<!-- ![Главная страница](docs/screenshots/landing.png) -->

---

## 📋 Содержание

- [Возможности](#-возможности)
- [Архитектура](#-архитектура)
- [Технологии](#-технологии)
- [Быстрый старт](#-быстрый-старт)
- [API](#-api)
- [Логика расчёта кредита](#-логика-расчёта-кредита)
- [Жизненный цикл заявки](#-жизненный-цикл-заявки)
- [Тестирование](#-тестирование)
- [Структура проекта](#-структура-проекта)
- [Статус и планы](#-статус-и-планы)

---

## ✨ Возможности

**Лендинг кредитной карты**
- Hero-блок с карточкой Platinum и всплывающими подсказками по условиям
- Вкладки «About card», «Rates and Conditions», «Cashback», «FAQ» (аккордеон)
- Блок «How to get a card»

**Оформление заявки (многошаговый сценарий)**
1. **Анкета** — слайдер суммы (15 000 – 600 000 ₽), срок, ФИО, email, дата рождения, паспорт; валидация на лету
2. **Выбор предложения** — 4 варианта кредита (со страховкой / без, зарплатный клиент / нет) с расчётом ставки и ежемесячного платежа
3. **Продолжение анкеты** — пол, семейное положение, иждивенцы, данные о занятости и доходе
4. **График платежей** — согласие с графиком или отказ от заявки через модальное окно
5. **Подписание документов** и **подтверждение кодом** из 4 цифр
6. **Финальный экран** — «карта оформлена»

**Прочее**
- Черновики форм сохраняются в `localStorage` (Zustand `persist` + debounce), прогресс не теряется при перезагрузке
- `StepGuard` не даёт перейти на шаг, который пользователь ещё не прошёл
- Email-уведомление клиенту через Kafka → сервис `dossier` → SMTP
- Сквозной `requestId` в логах каждого запроса (MDC)
- Единый формат ошибок API: `code`, `message`, `details`, `timestamp`
- Swagger UI для бэкенд-сервисов

---

## 🏗 Архитектура

```
                     ┌──────────────┐
  Browser ──────────▶│   frontend   │  React SPA, nginx (:3000)
                     └──────┬───────┘
                            │ /deal/*  (проксирование)
                            ▼
                     ┌──────────────┐   REST    ┌───────────────┐
                     │ dealservice  │──────────▶│  calcservice  │
                     │   (:8082)    │           │    (:8081)    │
                     └──┬────────┬──┘           └───────────────┘
                        │        │                расчёт предложений,
              JPA       │        │ Kafka          прескоринг, график
                        ▼        ▼ topic: send-documents
               ┌────────────┐  ┌──────────────┐  SMTP  ┌──────────┐
               │ PostgreSQL │  │   dossier    │───────▶│ Mailpit  │
               │  (:5432)   │  │   (:8083)    │        │ (:8025)  │
               └────────────┘  └──────────────┘        └──────────┘
```

| Сервис | Назначение |
|--------|------------|
| **calcservice** | Stateless-калькулятор: прескоринг (проверка возраста), расчёт 4 предложений, ставки, ПСК, аннуитетного платежа и графика платежей |
| **deal** | Оркестратор сделки: сохраняет клиента и заявку в БД, вызывает калькулятор, ведёт историю статусов, публикует событие в Kafka |
| **dossier** | Kafka-consumer: формирует и отправляет клиенту письмо со ссылкой на документы |
| **frontend** | SPA: лендинг и пошаговое оформление заявки |

---

## 🛠 Технологии

**Backend**
- Java 17, Spring Boot 4 (Web MVC, Data JPA, Validation, Actuator, Mail)
- Spring Kafka, Apache Kafka + Zookeeper (Confluent 7.6)
- PostgreSQL 15, Liquibase (миграции), Hibernate (JSONB-колонки через `@JdbcTypeCode`)
- RestClient — межсервисное взаимодействие
- springdoc-openapi (Swagger UI), Lombok
- JUnit 5, Mockito, Testcontainers

**Frontend**
- React 19, TypeScript, Vite
- React Router 7, React Hook Form, Zustand, Axios
- Vitest, React Testing Library
- ESLint (+ jsx-a11y), архитектура по Feature-Sliced Design (`app / pages / widgets / features / entities / shared`)

**Инфраструктура**
- Docker, Docker Compose, nginx, Mailpit (тестовый SMTP)

---

## 🚀 Быстрый старт

### Требования

- Docker и Docker Compose
- Node.js ≥ 20 (только для запуска фронтенда в dev-режиме)
- Java 17 и Maven (только для локального запуска сервисов без Docker)

### Вариант 1. Всё в Docker

```bash
git clone https://github.com/bivansir/practice-neoflex-calculator-app.git
cd practice-neoflex-calculator-app

docker compose up --build -d
```

### Вариант 2. Бэкенд в Docker, фронтенд в dev-режиме

 Запустить скрипт `./dev.sh`

После запуска будут доступны:

| Что | Адрес |
|-----|-------|
| Приложение | http://localhost:3000/loan |
| Swagger — calcservice | http://localhost:8081/swagger-ui.html |
| Swagger — deal | http://localhost:8082/swagger-ui.html |
| Mailpit (входящие письма) | http://localhost:8025 |
| PostgreSQL | `localhost:5432`, БД `dealservice_db`, пользователь `dealservice_user` / `admin` |

---

## 📡 API

### deal (`:8082`)

| Метод | Путь | Описание |
|-------|------|----------|
| `POST` | `/deal/statement` | Создаёт клиента и заявку, возвращает 4 кредитных предложения |
| `POST` | `/deal/select` | Фиксирует выбранное предложение, рассчитывает кредит, отправляет письмо |

### calcservice (`:8081`)

| Метод | Путь | Описание |
|-------|------|----------|
| `POST` | `/calculator/offers` | Прескоринг и расчёт 4 предложений |
| `POST` | `/calculator/calc` | Полный расчёт кредита: ставка, ПСК, платёж, график |

<details>
<summary>Пример запроса <code>POST /deal/statement</code></summary>

```json
{
  "amount": 200000,
  "term": 12,
  "firstName": "Илья",
  "lastName": "Семенов",
  "middleName": "Игоревич",
  "email": "test@example.com",
  "birthdate": "2000-08-25",
  "passportSeries": "1234",
  "passportNumber": "123456"
}
```
</details>

<details>
<summary>Формат ошибки</summary>

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Невалидные параметры запроса",
  "details": {
    "email": "Неверный формат почты",
    "amount": "Размер кредита должен быть не менее 10.000"
  },
  "timestamp": "2026-03-08T12:12:12"
}
```

Коды ошибок: `VALIDATION_ERROR`, `BAD_REQUEST`, `CALCULATOR_SERVICE_ERROR`, `KAFKA_SEND_ERROR`, `INTERNAL_ERROR`.
</details>

**Ограничения на входные данные:** сумма 10 000 – 5 000 000, срок 6 – 360 месяцев, имя и фамилия 2–50 символов (буквы и дефис), серия паспорта 4 цифры, номер 6 цифр.

---

## 🧮 Логика расчёта кредита

Параметры задаются в `calcservice/src/main/resources/application.properties`:

| Параметр | Значение | Смысл |
|----------|----------|-------|
| `baseRate` | 25% | базовая годовая ставка |
| `minRate` | 20% | ставка не опускается ниже |
| `salaryClientDiscount` | −2 п.п. | скидка зарплатному клиенту |
| `insurancePercentDiscount` | −1 п.п. | скидка за страховку (кредит < 500 000) |
| `insuranceCostMultiplier` | 1% в год | стоимость страховки для небольших кредитов |
| `insurancePacketCost` | 10 000 в год | пакетная страховка для кредитов ≥ 500 000 |
| `commissionRate` | 40% | доля банка от страховки (влияет на скидку для крупных кредитов) |

**Прескоринг:** клиенту должно быть не меньше 18 лет, а на момент окончания кредита — не больше 65.

**Предложения:** формируются 4 комбинации «страховка × зарплатный клиент». Они сортируются по ставке, а при равной ставке — по переплате за страховку.

**Ежемесячный платёж** считается по аннуитетной формуле:

```
P = S · i · (1 + i)^n / ((1 + i)^n − 1),   i = ставка / 12
```

График платежей делит каждый платёж на проценты и основной долг. В последнем месяце остаток долга гасится полностью.

---

## 🧪 Тестирование
Тестами покрыто 80% кода.

```bash
# Backend (в каталоге сервиса)
cd calcservice && ./mvnw test
cd deal && ./mvnw test
cd dossier && ./mvnw test

# Frontend
cd frontend && npm run test
```

- **calcservice** — unit-тесты расчётов и API-тесты контроллера (MockMvc)
- **deal** — unit-тесты сервисов (Mockito) и интеграционные тесты с PostgreSQL в Testcontainers
- **dossier** — тесты формирования и отправки письма
- **frontend** — тесты store, `StepGuard`, валидаторов и UI-компонентов (Input, Slider, Tabs, Accordion, Tooltip и др.)

---

## 📁 Структура проекта

```
.
├── calcservice/          # МС «Калькулятор»
│   └── src/main/java/ru/neoflex/calcservice/
│       ├── controller/   # REST, обработка ошибок, RequestIdFilter
│       ├── dto/          # request / response
│       ├── service/      # CalcService — расчёты
│       ├── properties/   # параметры ставок из application.properties
│       └── util/         # прескоринг
├── deal/                 # МС «Сделка»
│   └── src/main/
│       ├── java/ru/neoflex/deal/
│       │   ├── controller/  service/  repository/
│       │   ├── entity/      # Client, Credit, Statement, Passport
│       │   └── configuration/  # RestClient к калькулятору
│       └── resources/db/changelog/  # миграции Liquibase
├── dossier/              # МС «Досье» — Kafka consumer + email
├── frontend/             # React SPA (Feature-Sliced Design)
│   └── src/
│       ├── app/          # роутинг, точка входа
│       ├── pages/        # LoanPage, ApplicationPage (+ StepGuard)
│       ├── widgets/      # Header, Footer
│       ├── features/     # шаги оформления заявки, API
│       ├── entities/     # store заявки (Zustand)
│       └── shared/       # UI-kit, http-клиент, хуки
├── docker-compose.yml
└── dev.sh
```
