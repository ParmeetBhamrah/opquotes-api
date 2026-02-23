const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, ()=> {
        console.log(`Server is running on port ${PORT}`);
        if (process.env.NODE_ENV === 'dev') {
            console.log(`URL: http://localhost:${PORT}`);
        }
    });
});