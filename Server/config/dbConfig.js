import { createConnection } from "mysql2";
const connection = createConnection(process.env.DATABASE_URL);

export default connection;
