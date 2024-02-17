// config pout les migrations et les seeders

// commande pour créer un model : npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
// commande pour créer une migration : npx sequelize-cli migration:generate --name create-users
// commande pour créer un seeder : npx sequelize-cli seed:generate --name demo-user

// commande pour exécuter les migrations : npx sequelize-cli db:migrate
// commande pour exécuter les seeders : npx sequelize-cli db:seed:all

// commande pour annuler les migrations : npx sequelize-cli db:migrate:undo
// commande pour annuler les seeders : npx sequelize-cli db:seed:undo
// commande pour annuler toutes les migrations : npx sequelize-cli db:migrate:undo:all
// commande pour annuler tous les seeders : npx sequelize-cli db:seed:undo:all
// commande pour annuler toutes les migrations et seeders : npx sequelize-cli db:reset
// commande pour annuler toutes les migrations et seeders et les recréer : npx sequelize-cli db:reset:hard

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    define: {
        timestamps: true,
        underscored: true
    }
}