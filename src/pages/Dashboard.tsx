import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Map from "../components/Map";

interface Visit {
  ip: string;
  country: string;
  region: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

const Dashboard: React.FC = () => {
  const { trackingId } = useParams<{ trackingId: string }>();
  const [dashboardData, setDashboardData] = useState<{
    visits: Visit[];
    uniqueCountries: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/dashboard/${trackingId}`
        );
        setDashboardData(response.data);
      } catch (err) {
        setError("Gagal mengambil data dashboard. Silakan coba lagi.");
      }
    };

    fetchDashboardData();
  }, [trackingId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!dashboardData) {
    return <div>Memuat...</div>;
  }

  const latestVisit =
    dashboardData.visits.length > 0
      ? dashboardData.visits[dashboardData.visits.length - 1]
      : null;

  return (
    <div className="dashboard">
      <div>
        <h1>Dashboard Pelacakan</h1>
        <div>
          <strong>Negara Unik</strong>
          <p className="unique-countries">{dashboardData.uniqueCountries}</p>
        </div>
        {latestVisit && (
          <>
            <div>
              <strong>Negara</strong>
              <p>{latestVisit.country}</p>
            </div>
            <div>
              <strong>Alamat IP</strong>
              <p>{latestVisit.ip}</p>
            </div>
            <div>
              <strong>Kunjungan Terakhir</strong>
              <p className="last-visit">
                {new Date(latestVisit.timestamp).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <strong>Wilayah</strong>
              <p>{latestVisit.region}</p>
            </div>
          </>
        )}
        <div>
          <strong>Riwayat Kunjungan</strong>
          <ul className="visit-history">
            {dashboardData.visits.map((visit, index) => (
              <li key={index}>
                {visit.country} ({visit.region}) - {visit.ip} pada{" "}
                {new Date(visit.timestamp).toLocaleString("id-ID")}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h2>Peta Lokasi</h2>
        {latestVisit && (
          <Map
            latitude={latestVisit.latitude}
            longitude={latestVisit.longitude}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
