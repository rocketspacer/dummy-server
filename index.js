// Dependencies
const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const Logger = require('koa-morgan');
const BodyParser = require('koa-bodyparser');

// Constants
const PORT = process.env.PORT || 8080;

// Router
const router = new Router();
router.get('/', async (ctx) => {
    return ctx.body = { message: 'hello' };
});

// Koa application
const app = new Koa();
app.use(new Logger('dev'));
app.use(new BodyParser({ enableTypes: ['json', 'form', 'text'] }));
app.use(router.routes());
app.use(router.allowedMethods());

// Server
const server = http.createServer(app.callback());
server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
