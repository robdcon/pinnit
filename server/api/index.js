// const app = require('express')();
// // const { v4 } = require('uuid');

// app.get('/', (req, res) => {
//   const path = `/item/${v4()}`;
//   res.setHeader('Content-Type', 'text/html');
//   res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
//   res.end(`<p>Hello! Go to item: <a href="${path}">${path}</a></p>`);
// });

// app.get('/item/:slug', (req, res) => {
//   const { slug } = req.params;
//   res.end(`<p>Item: ${slug}</p><a href="/">Go back</a>`);
// });

// export default app;

// index.js
const express = require('express')

const app = express()
const PORT = 4000

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
})

// Export the Express API
module.exports = app
