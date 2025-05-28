const express = require('express');
const db = require('./db');

// routers
const accountRoutes     = require('./routes/accounts');
const destinationRoutes = require('./routes/destinations');
const dataHandlerRoute  = require('./routes/incomingData');

const app = express();
app.use(express.json());

// v1 API prefix
app.use('/api/v1/accounts',accountRoutes);
app.use('/api/v1/destinations',  destinationRoutes);
app.use('/server',               dataHandlerRoute);

// health-check
app.get('/ping',(req,res)=>res.send('pong'));

// start after DB sync
(async()=>{
  await db.sync();          
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, ()=>console.log(`↗  Server ready on ${PORT}`));
})();
