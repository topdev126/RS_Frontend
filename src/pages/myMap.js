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




// import React from 'react'
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

// const containerStyle = {
//   width: '400px',
//   height: '400px',
// }

// const center = {
//   lat: 1.377202,
//   lng: 103.864252,
// }

// function RealEstateMap() {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: 'AIzaSyCC40uAAaQ5MtL6TQOmHIAsUMlEQQDXVNo',
//   })

//   const [map, setMap] = React.useState(null)

//   const onLoad = React.useCallback(function callback(map) {
//     // This is just an example of getting and using the map instance!!! don't just blindly copy!
//     const bounds = new window.google.maps.LatLngBounds(center)
//     map.fitBounds(bounds)

//     setMap(map)
//   }, [])

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null)
//   }, [])

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={2}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//     >
//       {/* Child components, such as markers, info windows, etc. */}
//       <></>
//     </GoogleMap>
//   ) : (
//     <></>
//   )
// }

// export default React.memo(RealEstateMap)