import app from './src/app.js';
import dotenv from 'dotenv';
dotenv.config();

/* running server */
const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});