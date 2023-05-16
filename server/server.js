const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRouter = require("./router/userRouter");
const itemsRouter = require("./router/itemsRouter");

dotenv.config({path: "./config.env" });
const connect = require("./db/connection");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
    cors(
    {
        origin : ["https://partern-shop-i7tc-5hhiycz1q-nqdat2002.vercel.app","http://localhost:3000"],
        credentials: true, 
    })
);

app.get("/", (req,res) => res.send("Hello"));

app.use("/api/user", userRouter);
app.use("/api/items", itemsRouter);

const port = process.env.PORT || 8080;

connect.then((req, res) =>{
    app.listen(port, () => {
        console.log(`Server is runing on PORT: ${port}`);
    });
}).catch((err) =>{
    console.log(`DB has error: ${err}`);
});

module.exports = app;
