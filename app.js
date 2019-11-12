const express = require('express');
const app = express();
const bodyParser = require('body-parser');


//   SPOTIFY ----------------------------------------------------
//   ------------------------------------------------------------
/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var cors = require('cors');
var cookieParser = require('cookie-parser');

// app.use(express.static(__dirname + '/client/public'))
app.use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser());

//   END SPOTIFY ------------------------------------------------
//   ------------------------------------------------------------


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.use(function (req, res, next) {

  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(require('./routes'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');

  app.get('/keys'), (req, res) => {
    res.json({ keys: keys });
  };

  app.get('/api/keys'), (req, res) => {
    res.json({ keys: keys });
  };

  app.get('*', (req, res) => {
    res.render(path.resolve(__dirname, 'client', 'build', 'index.html'), { keys: keys });
  });
};

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
