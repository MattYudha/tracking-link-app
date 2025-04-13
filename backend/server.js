const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const trackingRoutes = require("./routes/trackingRoutes");
const { errorHandler } = require("./middleware/errorHandler");

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Izinkan hanya dari frontend
  })
);
app.use(express.json());

// Logging untuk debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Rute dasar untuk memastikan server berjalan
app.get("/", (req, res) => {
  res.send("Backend berjalan!");
});

// Rute API
app.use("/api", trackingRoutes);

// Penanganan error
app.use(errorHandler);

// Koneksi ke MongoDB dan jalankan server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Terhubung ke MongoDB");
    app.listen(PORT, () => {
      console.log(`Server berjalan di port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Gagal terhubung ke MongoDB:", err);
    process.exit(1);
  });
