const app = require('./app');

process.on('uncaughtException', console.error);

app.listen(process.env.APP_PORT || 3000, () => {
    console.log('[APP] Running at', (process.env.APP_PORT || 3000));
});