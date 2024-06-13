
   const express = require('express');
   const mongoose = require('mongoose');
   const bodyParser = require('body-parser');
   const movieRoutes = require('./movieRoutes');

   const app = express();
   const port = process.env.PORT || 3000;

   app.use(bodyParser.json());
   app.use('/api', movieRoutes);

   mongoose.connect('mongodb://localhost:27017/movies', { useNewUrlParser: true, useUnifiedTopology: true });

   mongoose.connection.once('open', () => {
       console.log('Connected to MongoDB');
       app.listen(port, () => {
           console.log(`Server is running on port ${port}`);
       });
   });