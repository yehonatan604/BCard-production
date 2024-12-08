import chalk from "chalk";
import { envService } from "../env/envService.js";
import { connect } from "mongoose";

const connectToDb = () => {
  const { ENVIRONMENT, MONGO_LOCAL_URI, MONGO_ATLAS_URI } = envService;
  const uri = ENVIRONMENT === "development" ? MONGO_LOCAL_URI : MONGO_ATLAS_URI;
  const loc = ENVIRONMENT === "development" ? "Local" : "Atlas";

  connect(uri)
    .then(() => console.log(chalk.magenta(`connected to MongoDb ${loc}!`)))
    .catch((error) =>
      console.log(chalk.red(`could not connect to mongoDb: ${error}`))
    );
};

export default connectToDb;
