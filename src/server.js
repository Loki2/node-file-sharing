import http from 'http';
import app from './app.js';
import dotenv from 'dotenv';
import dbClient from "./configs/database.js";

dotenv.config()

// const app = express();
const PORT = process.env.PORT;



const server = http.createServer(app);
server.listen(PORT, () => {
  console.log('🚀 Server is running http://localhost:' + PORT);
  dbClient;
});