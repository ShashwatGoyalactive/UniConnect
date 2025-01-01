require("dotenv").config();
const {connectDB} = require("./db/connect");
const {app} = require("./app");

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
