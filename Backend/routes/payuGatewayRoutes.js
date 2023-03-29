import express from "express";
import crypto from "crypto-js";
import axios from "axios";
import Transaction from "../models/Transaction/Transaction.js";
import Order from "../models/Order/orderModel.js";
import expressAsyncHandler from "express-async-handler";

const payuRouter = express.Router();

const API_KEY = process.env.PAYU_API_KEY;
const MERCHANT_ID = process.env.PAYU_MERCHANT_ID;
const ACCOUNT_ID = process.env.PAYU_ACCOUNT_ID;
const CURRENCY = process.env.PAYU_CURRENCY;

//const orderId = req.params.orderId;

payuRouter.post(
  "/payment_gateway/payumoney",
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    const requestBody = {
      merchantId: MERCHANT_ID,
      accountId: ACCOUNT_ID,
      description: "Pago en línea",
      referenceCode: order.id,
      amount: req.body.amount,
      tax: 0,
      taxReturnBase: 0,
      buyerEmail: req.body.email,
      signature: "",
      test: 1,
      currency: CURRENCY,
      buyerFullName: req.body.fullName,
      shippingAddress: req.body.shippingAddress,
      // telephone: req.body.phone,
      responseUrl: `${YOUR_DOMAIN}/payu/response`,
      confirmationUrl: `${YOUR_DOMAIN}/payu/confirmation`,
    };

    // Calcular firma digital
    const signature = crypto
      .createHmac("sha256", API_KEY)
      .update(
        `${MERCHANT_ID}${requestBody.referenceCode}${requestBody.amount}${requestBody.currency}${API_KEY}`
      )
      .digest("hex");
    requestBody.signature = signature;

    // Enviar solicitud de redireccionamiento a PayU
    try {
      const response = await axios.post(
        process.env.PAYU_REDIRECT_URL,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      // Redirigir al usuario a la página de pago de PayU
      console.log(response.data);
      res.redirect(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al procesar el pago");
    }
  })
);

payuRouter.post("/payu/response", async (req, res) => {
  const signature = crypto
    .createHmac("sha256", API_KEY)
    .update(
      `${req.body.merchantId}${req.body.referenceCode}${req.body.state}${req.body.paymentMethod}${req.body.value}${req.body.currency}${API_KEY}`
    )
    .digest("hex");

  if (signature === req.body.signature) {
    console.log("La firma es válida");
    // Actualizar estado de la transacción en tu sistema
    const transaction = await Transaction.findOneAndUpdate(
      { referenceCode: req.body.referenceCode },
      { state: req.body.state }
    );
    console.log(
      `Estado de la transacción ${transaction._id} actualizado a ${req.body.state}`
    );
  } else {
    console.log("La firma es inválida");
  }

  res.send("OK");
});

payuRouter.post("/payu/confirmation", async (req, res) => {
  const signature = crypto
    .createHmac("sha256", API_KEY)
    .update(
      `${req.body.merchantId}${req.body.referenceCode}${req.body.state}${req.body.processingDate}${API_KEY}`
    )
    .digest("hex");

  if (signature === req.body.signature) {
    console.log("La firma es válida");
    // Actualizar estado de la transacción en tu sistema
    const transaction = await Transaction.findOneAndUpdate(
      { referenceCode: req.body.referenceCode },
      { state: req.body.state }
    );
    console.log(
      `Estado de la transacción ${transaction._id} actualizado a ${req.body.state}`
    );
  } else {
    console.log("La firma es inválida");
  }

  res.send("OK");
  res.redirect(`http://127.0.0.1:5173/order/${order._id}`);
});

payuRouter.post("/payu/test", async (req, res) => {
  console.log("Ok")
  res.send("OK");
});

export default payuRouter;
