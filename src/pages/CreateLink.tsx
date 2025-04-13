import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateLink: React.FC = () => {
  const [url, setUrl] = useState<string>(
    "https://www.instagram.com/p/DJUXC5gH9dql"
  );
  const [trackingLink, setTrackingLink] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const generateTrackingLink = async () => {
    try {
      setError(null);
      const response = await axios.post("http://localhost:5000/api/create", {
        originalUrl: url,
      });
      setTrackingLink(response.data.trackingUrl);
    } catch (err) {
      setError("Gagal membuat link pelacakan. Silakan coba lagi.");
    }
  };

  return (
    <div>
      <h1>Buat Link Pelacakan</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Masukkan URL Anda</label>
        <br />
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          style={{ width: "300px" }}
        />
        <br />
        <button onClick={generateTrackingLink}>Buat Link Pelacakan</button>
      </div>
      {trackingLink && (
        <div>
          <h3>Link Pelacakan Anda</h3>
          <p>{trackingLink}</p>
          <button
            onClick={() =>
              navigate(`/dashboard/${trackingLink.split("track=")[1]}`)
            }
          >
            Lihat Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateLink;
