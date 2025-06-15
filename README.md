# Currency Exchange Application

Приложение для просмотра курсов валют и конвертации валют

## Требования

- Node.js (версия 16 или выше)
- npm или yarn

## Установка

1. Клонируйте репозиторий:
```bash
git clone <https://github.com/natakryl/perfect_panel_test.git>
cd <perfect_panel_test>
```

2. Установите зависимости:
```bash
npm install
# или
yarn install
```

3. Создайте файл `.env` в корневой директории проекта и добавьте следующие переменные окружения:
```env
VITE_COMMISSION_RATE=0.03
VITE_PAGE_SIZES=10,25,50,100
VITE_REFRESH_INTERVAL=30000
VITE_API_BASE_URL=https://api.alternative.me/v2/ticker/
VITE_AUTH_USERNAME=demo
VITE_AUTH_PASSWORD=demo
```

## Запуск проекта

### Режим разработки

```bash
npm run dev
# или
yarn dev
```

Приложение будет доступно по адресу: http://localhost:5173

### Сборка для продакшена

```bash
npm run build
# или
yarn build
```

Собранные файлы будут находиться в директории `dist/`

### Предпросмотр собранного проекта

```bash
npm run preview
# или
yarn preview
```

## Функциональность

- Просмотр списка валют с их текущими курсами
- Сортировка валют по курсу
- Конвертация валют с учетом комиссии
- Адаптивный дизайн для мобильных устройств
- Авторизация пользователей

## Технологии

- React 19
- TypeScript 5.8
- Material-UI 7
- Redux Toolkit 2.8
- React Router 7
- Axios
- Vite 6.3

## Структура проекта

```
src/
  ├── components/     # React компоненты
  ├── pages/         # Страницы приложения
  ├── store/         # Redux store и слайсы
  ├── services/      # API сервисы
  ├── hooks/         # Пользовательские хуки
  ├── types/         # TypeScript типы
  └── utils/         # Вспомогательные функции
```

## Скрипты

- `npm run dev` - запуск сервера разработки
- `npm run build` - сборка проекта
- `npm run preview` - предпросмотр собранного проекта
- `npm run lint` - проверка кода линтером
