const app = require('./app');

const port = process.env.PORT || 5000;
console.log(process.env.MONGGO_URI);
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
