export default {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'boot',
    database: 'tasklist',
    define: {
        timestamp: true,
        underscored: true,
        underscoredAll: true
    }
};