const mongoose = require("mongoose");

import app  from "./app.js";

const { DB_HOST, PORT = 4000 } = process.env;
console.log(DB_HOST);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, (req) => {
      console.log(`Database connection successful. Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
