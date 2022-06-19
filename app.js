const express  = require('express');
const app = express();

app.get('/',(req,res)=>{
  res.send("hello from server");
});

app.listen(3001, ()=> console.log('serer running'));