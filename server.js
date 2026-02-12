const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const path = require("path");

const serviceAccount = JSON.parse(process.env.FIREBASE_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

// صفحة الويب
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// مسار إرسال الإشعار
app.post("/send", async (req, res) => {
  const { message } = req.body;

const payload = {
  data: {
    title: "Love1",
    body: message,
  },
  topic: "love_all",
};


  try {
    await admin.messaging().send(payload);
    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.send({ success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});



