const Koa = require('koa')
const cors = require('@koa/cors')
const metadata = require('./index')
const app = new Koa()

app.use(cors({
  origin: '*'
}))
app.use(async ctx => {
  const { url } = ctx.request.query
  if (!url) {
    ctx.body = {
      'message': 'URL cannot be empty'
    }
  } else {
    try {
      const data = await metadata.get(url)
      ctx.body = data;
    } catch (error) {
      ctx.body = {
        'message': error.message
      }
    }
  }
  
})

module.exports = app.callback() 
