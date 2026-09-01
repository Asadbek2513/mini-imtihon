const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(express.json());
app.use(cors());

const { branchRoute } = require("./routes/branchRoute");
const { stageRoute } = require("./routes/stageRoute");
const { roleRoute } = require("./routes/roleRoute");
const { stuffRoute } = require("./routes/stuffRoute");
const { stuffRoleRoute } = require("./routes/stuff_roleRoute");
const { groupRoute } = require("./routes/groupRoute");
const { groupStuffRoute } = require("./routes/group_stuffRoute");
const { lidStatusRoute } = require("./routes/lid_statusRoute");
const { reasonLidRoute } = require("./routes/reason_lidRoute");
const { lidRoute } = require("./routes/lidRoute");
const { studentRoute } = require("./routes/studentRoute");
const { studentGroupRoute } = require("./routes/student_groupRoute");
const { lessonRoute } = require("./routes/lessonRoute");
const { studentLessonRoute } = require("./routes/student_lessonRoute");
const { paymentRoute } = require("./routes/paymentRoute");

app.use("/branch", branchRoute);
app.use("/stage", stageRoute);
app.use("/role", roleRoute);
app.use("/stuff", stuffRoute);
app.use("/stuff-role", stuffRoleRoute);
app.use("/group", groupRoute);
app.use("/group-stuff", groupStuffRoute);
app.use("/lid-status", lidStatusRoute);
app.use("/reason-lid", reasonLidRoute);
app.use("/lid", lidRoute);
app.use("/student", studentRoute);
app.use("/student-group", studentGroupRoute);
app.use("/lesson", lessonRoute);
app.use("/student-lesson", studentLessonRoute);
app.use("/payment", paymentRoute);

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

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRM va Savdo API Dokumentatsiyasi",
      version: "1.0.0",
      description: "Barcha 15 ta modul uchun mukammal API tavsifi",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
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