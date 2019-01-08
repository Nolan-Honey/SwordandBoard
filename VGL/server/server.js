const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      config = require('./config/DB');
      playerRoutes = require('./routes/playerRoutes');
      gameRoutes=require('./routes/gamesRoutes')
      
      mongoose.Promise = global.Promise;
      mongoose.connect(config.DB).then(
          () => {console.log('Database is connected') },
          err => { console.log('Can not connect to the database'+ err)}
        );

      const app = express();
      app.use(bodyParser.json());
      app.use(cors());
      const port = process.env.PORT || 4000;
      app.use('/players', playerRoutes);
      app.use('/games', gameRoutes);
      app.listen(port, function(){
         console.log('Listening on port ' + port);
       });
       