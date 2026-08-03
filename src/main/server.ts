import app from "./app";

import { configDotenv } from "dotenv";
configDotenv();

import { env } from "@/env";

const port = env.PORT || 3333;

 app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
