import app from "./app";

import { configDotenv } from "dotenv";
configDotenv();

import { env } from "@/env";

const port = env.PORT || 3333;

 app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });

// class Server {

//     constructor( private port: number) {
//         this.start();
//     }
//    private start() {
//     app.listen(this.port, () => {
//       console.log(`🚀 Server running on port ${this.port}`);
//     });
//   }
// }

// new Server(env.PORT);