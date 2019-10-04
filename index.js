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
  return ctx.body = {
    'X-Client-IP': ctx.request.get('X-Client-IP'),
    'X-Forwarded-For': ctx.request.get('X-Forwarded-For'),
    'X-Forwarded': ctx.request.get('X-Forwarded'),
    'Forwarded-For': ctx.request.get('Forwarded-For'),
    'Forwarded': ctx.request.get('Forwarded'),
    'CF-Connecting-IP': ctx.request.get('CF-Connecting-IP'),
    'Fastly-Client-IP': ctx.request.get('Fastly-Client-IP'),
    'True-Client-IP': ctx.request.get('True-Client-IP'),
    'X-Real-IP': ctx.request.get('X-Real-IP'),
    'X-Cluster-Client-IP': ctx.request.get('X-Cluster-Client-IP'),
    'req.connection.remoteAddress': ctx.req.connection.remoteAddress,
  };
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
