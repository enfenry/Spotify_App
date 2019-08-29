const express = require('express');

const app = express();

// app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// }));

app.use(require('./routes'));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  };
  
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`)
  })
  