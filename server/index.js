require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
//const Customer = require('./routes/customers');

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const CustomerRouter=require('./routes/customers')
app.use('/', CustomerRouter);

const ProductRouter=require('./routes/products')
app.use('/',ProductRouter);

const CompanyRouter=require('./routes/companies')
app.use('/',CompanyRouter)

const PaymentRouter=require('./routes/payments')
app.use('/',PaymentRouter)

app.use('/Image', express.static('Image'));

const InvoiceRouter=require('./routes/invoices')
app.use('/',InvoiceRouter)

const TemplateRouter=require('./routes/templates')
app.use('/',TemplateRouter)

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
