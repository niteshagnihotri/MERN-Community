require('dotenv').config({ path: './config.env' });
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const path = require('path');

require('./db/conn');
app.use(cookieParser());
app.use(express.json());
app.use((require('./router/route')));
app.use(cors());


app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () =>{
    console.log(`listening on ${port}`);
});