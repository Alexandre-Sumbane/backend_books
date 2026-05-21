import app from "./app";

import { configDotenv } from "dotenv";
configDotenv();

const PORT = Number(process.env.PORT);

class Server {

    constructor( private port: number) {
        this.start();
    }
   private start() {
    app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

new Server(PORT);