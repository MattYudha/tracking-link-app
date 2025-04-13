const TrackingLink = require("../models/TrackingLink");
const axios = require("axios");

// Buat link pelacakan baru
exports.createTrackingLink = async (req, res, next) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) {
      throw new Error("URL asli diperlukan");
    }

    const trackingId = Math.random().toString(36).substring(2, 10);
    const trackingLink = new TrackingLink({ originalUrl, trackingId });
    await trackingLink.save();

    // Tambahkan parameter pelacakan ke URL asli
    const url = new URL(originalUrl);
    url.searchParams.append("track", trackingId);
    const trackingUrl = url.toString();

    res.status(201).json({
      trackingId,
      trackingUrl,
    });
  } catch (error) {
    next(error);
  }
};

// Catat kunjungan saat link diklik dan redirect ke URL asli
exports.trackVisit = async (req, res, next) => {
  try {
    const trackingId = req.query.track || req.params.trackingId;

    const trackingLink = await TrackingLink.findOne({ trackingId });
    if (!trackingLink) {
      throw new Error("Link pelacakan tidak ditemukan");
    }

    // Ambil data lokasi menggunakan API ipapi.co
    let visit;
    try {
      const response = await axios.get("https://ipapi.co/json/");
      const data = response.data;

      visit = {
        ip: data.ip || "Tidak Diketahui",
        country: data.country_name || "Tidak Diketahui",
        region: data.region || "Tidak Diketahui",
        latitude: data.latitude || 0,
        longitude: data.longitude || 0,
        timestamp: new Date(),
      };
    } catch (apiError) {
      // Penanganan error jika API gagal
      visit = {
        ip: "Tidak Diketahui",
        country: "Tidak Diketahui",
        region: "Tidak Diketahui",
        latitude: 0,
        longitude: 0,
        timestamp: new Date(),
      };
    }

    trackingLink.visits.push(visit);
    await trackingLink.save();

    // Redirect ke URL asli tanpa parameter pelacakan
    res.redirect(trackingLink.originalUrl);
  } catch (error) {
    next(error);
  }
};

// Ambil data untuk dashboard
exports.getDashboardData = async (req, res, next) => {
  try {
    const { trackingId } = req.params;

    const trackingLink = await TrackingLink.findOne({ trackingId });
    if (!trackingLink) {
      throw new Error("Link pelacakan tidak ditemukan");
    }

    // Hitung negara unik
    const uniqueCountries = [
      ...new Set(trackingLink.visits.map((visit) => visit.country)),
    ];

    res.status(200).json({
      visits: trackingLink.visits,
      uniqueCountries: uniqueCountries.length,
    });
  } catch (error) {
    next(error);
  }
};
