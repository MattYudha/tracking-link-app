import axios from "axios";
import { LocationData } from "../types"; // Impor LocationData

export const fetchLocationData = async (): Promise<LocationData> => {
  try {
    const response = await axios.get("https://ipapi.co/json/");
    const data = response.data;
    return {
      ip: data.ip,
      country: data.country_name,
      region: data.region,
      latitude: data.latitude,
      longitude: data.longitude,
      lastVisit: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
  } catch (error) {
    console.error("Gagal mengambil data lokasi:", error);
    return {
      ip: "Tidak Diketahui",
      country: "Tidak Diketahui",
      region: "Tidak Diketahui",
      latitude: 0,
      longitude: 0,
      lastVisit: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
  }
};

export const getBrowserLocation = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation tidak didukung"));
    }
  });
};
