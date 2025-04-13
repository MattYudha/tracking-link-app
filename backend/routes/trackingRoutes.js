const express = require("express");
const router = express.Router();
const trackingController = require("../controllers/trackingController");

router.post("/create", trackingController.createTrackingLink);
router.get("/track/:trackingId", trackingController.trackVisit);
router.get("/dashboard/:trackingId", trackingController.getDashboardData);

module.exports = router;
