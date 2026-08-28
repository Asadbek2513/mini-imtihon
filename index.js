const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const { lids } = require("./routes/lidRoute");
const { students } = require("./routes/studentRoute");
const { groups } = require("./routes/groupRoute");
const { payments } = require("./routes/paymentRoute");
const { lessonRouter } = require("./routes/lessonRoute");

app.use("/lesson", lessonRouter);
app.use("/lid", lids);
app.use("/student", students);
app.use("/group", groups);
app.use("/payment", payments);

async function connectToDB() {
  try {
    if (!process.env.MONGO_URL) {
        throw new Error("MONGO_URL .env faylida aniqlanmadi");
    }
    await connect(process.env.MONGO_URL);
    console.log("MongoDB is connected!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}
connectToDB();

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRM va Savdo API Dokumentatsiyasi",
      version: "1.0.0",
      description: "Barcha modullar uchun mukammal API tavsifi",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server"
      }
    ]
  },
  apis: ["./routes/*.js"], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions); 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Swagger UI sahifasi: http://localhost:${PORT}/api-docs`);
});