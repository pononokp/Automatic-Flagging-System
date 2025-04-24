// Mongo DB connection will go here in the future
// For this case it is our local file directory
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export async function connectToDB() {
    const db = path.join(__dirname, "../../mock_database");
    if (!fs.existsSync(db)) {
        fs.mkdirSync(db, { recursive: true });
    }
    return db;
}
