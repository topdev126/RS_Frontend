import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Your Google Maps API Key
const GOOGLE_MAPS_API_KEY = "AIzaSyCC40uAAaQ5MtL6TQOmHIAsUMlEQQDXVNo";

// API endpoint for Google Geocoding service
const GEOCODING_API_URL = "https://maps.googleapis.com/maps/api/geocode/json";

const RealEstateMap = ({ properties }) => {
  console.log(properties);
  const [location, setLocation] = useState({ lat: 1.3521, lng: 103.8198 }); // Default to Singapore's coordinates
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const fullAddress = `${properties.address}, ${properties.district}, Singapore`;
        const url = `${GEOCODING_API_URL}?address=${encodeURIComponent(
          fullAddress
        )}&key=${GOOGLE_MAPS_API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "OK") {
          const { lat, lng } = data.results[0].geometry.location;
          setLocation({ lat, lng });
        } else {
          setError("Unable to find location");
        }
      } catch (err) {
        setError("Error fetching coordinates");
        console.error(err);
      }
    };

    fetchCoordinates();
  }, [properties]);

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ height: "500px", width: "100%" }}
        center={location}
        zoom={10}
      >
        <Marker position={location} />
      </GoogleMap>
      {error && <div>{error}</div>}
    </LoadScript>
  );
};

export default RealEstateMap;
