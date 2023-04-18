import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import payuRouter from "./routes/payuGatewayRoutes.js";
import cors from "cors";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials: true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,DELETE,OPTIONS,POST,PUT"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, authorization"
  );
  next();
});

//app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/pay", payuRouter);

app.use(cors());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error interno del servidor: " + err.message);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`serve at https://back-ecommerce-wu5w.onrender.com:${port}`);
});
