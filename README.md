# HoneyChat

HoneyChat – это real-time чат, который позволяет обмениваться сообщениями в режиме реального времени.

## Возможности

- **Профиль пользователя**: Пользователи могут создавать свои профили.
- **Изменение аватарок**: Возможность изменять аватарки.
- **Создание новых чатов**: Пользователи могут создавать новые чаты с участниками.
- **Присоединение к существующим чатам**: Присоединяйтесь к существующим чатам с помощью кода доступа, доступного только администратору, для обеспечения приватности.
- **Управление участниками**: Администраторы могут удалять участников из чата.
- **Поиск участников**: Отображение списка участников чата и возможность их поиска.

## Технологии

Приложение разработано на следующих технологиях:
- **React**
- **Redux Toolkit**
- **Redux Saga**
- **Socket IO**

## Установка

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/Lozick13/HoneyChat.git
   ```
2. Перейдите в каталог проекта:
   ```bash
   cd HoneyChat
   ```
3. Установите зависимости:
   ```bash
   npm install
   ```
4. Запустите приложение:
   ```bash
   npm run preview
   ```

## Настройка проекта

Вам необходимо настроить проект перед использованием. 

### На фронтенде

1. В файле `src/api/socketio.ts` указан URL бекенда по умолчанию. Убедитесь, что он соответствует вашему окружению:

   ```typescript
   export const URL = process.env.PATH || 'http://localhost:3000'; // поменяйте на ваш URL
   ```

### На бекенде

1. В файле `config.ts` указан URL фронтенда по умолчанию и порт сервера. Убедитесь, что они соответствуют вашему окружению:

   ```typescript
   export const url = 'http://localhost:4173';
   export const port = process.env.PORT ? process.env.PORT : 3000;
   ```

## Тестовые аккаунты

Для ознакомления с функционалом приложения вы можете использовать следующие тестовые аккаунты:

- **test1@test1.com** - пароль: `111`
- **test2@test2.com** - пароль: `111`
- **test3@test3.com** - пароль: `111`
- **test4@test4.com** - пароль: `111`

## Реализация базы данных

База данных реализована локально в TypeScript файлах через классы и массивы, чтобы упростить ознакомление с проектом.

## Ссылки

- [Ссылка на бекенд проекта](https://github.com/Lozick13/HoneyChat-Server)
- [Демо версия приложения](https://honeychat.na4u.ru/auth)
```

### Изменения:

1. **Добавлены тестовые аккаунты**: Включены учетные записи с паролями для ознакомления с функционалом.
2. **Информация о реализации базы данных**: Указано, что база данных реализована локально в TypeScript файлах через классы и массивы для упрощения работы с проектом.

Если есть еще какие-то изменения или дополнения, которые вы хотите внести, дайте знать!
