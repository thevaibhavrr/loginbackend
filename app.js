 const express = require("express");
 const dotenv = require("dotenv");
 const bcrypt = require("bcryptjs");
 const PORT = process.env.PORT || 5000; 


 dotenv.config({ path: "./config.env" });
 const app = express();
 app.use(express.json());

 require("./db/conn");
 app.use(require("./routes/router"));

//  if(process.env.NODE_ENV = 'production'){
//     app.use(express.static('client/build'))
//  }

 app.listen(PORT, () => console.log(`server is running on ${PORT}`));


