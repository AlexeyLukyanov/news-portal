The project is under development. Commits at this stage will begin with the word -dev-

When you'll git clone dont forget execute npm instal for install node_moduls.

Для локального развертывания проекта выполните следующие действия:

1. Cкачайте репозиторий с помощью git clone (инструкция на gitHub);

2. Установите модули из зависимостей, для этого выполните команду < npm install > в корне проекта;

3. Установите локально базу данных PostgeQSL (инструкция на официальном сайте www.posgresql.org );

4. Выполните миграцию базы данных своего проекта, для этого выполните команду < $ npx sequelize-cli db:migrate > в корне проекта;

5. Запустите сервер командой < npm run serverstart > из директории server/ 

Сервер запущен и прослушивает сообщения приходящие на localhost:3000 ( http://localhost:3000/ ).
