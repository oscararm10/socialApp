import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { AppDataSource } from "./setupDataSource";
import seed from "./seed";

const PORT = process.env.PORT || 4000;

AppDataSource.initialize()
  .then(async () => {
    console.log("DataSource initialized");
    await seed();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Error during Data Source initialization", err);
  });
