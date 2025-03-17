const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');

require('dotenv').config();

// Simple Route
app.get("/", (req, res) => {
    res.send("Welcome to the learning space.");
});

//enable cors
app.use(cors({
    origin: process.env.CLIENT_URL
}));

const db = require('./models');
db.sequelize.sync({ alter: true })
    .then(() => {
        let port = process.env.APP_PORT; //let port number be from .env

        app.listen(port, () => {
            console.log(`⚡ Sever running on http://localhost:${port}`);// listen to this port for information
        });
    })
    .catch((err) => {
        console.log(err);
    });

// Routes
const addressRoute = require('./routes/address');
app.use("/address", addressRoute);
