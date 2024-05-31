chat - server

Server app for chat app made with nodejs

Install necessary dependencies

`npm i`

IMPORTANT! To run app locally, configure your connection

    1. Copy file 'config/.config.sample.json'
        `cp config/config.sample.json config/config.json`

    2. Replace secret and connection placeholder values with your secret connection data

    3. Run migrations
        `npx sequelize-cli db:migrate`

    4. (optional) Seed database with some data
        `npx sequelize-cli db:seed:all`

Run app locally

`npm start`
