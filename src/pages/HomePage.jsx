import React, { useState } from "react";
import axios from "axios";
import InputForm from "../components/InputForm";
import Map from "../components/Map";
import TollDetails from "../components/TollDetails";

const HomePage = () => {
  const [route, setRoute] = useState(null);
  const [tollPoints, setTollPoints] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const handleTollCalculation = async (start, end) => {
    try {
      const requestData = {
        from: { address: start },
        to: { address: end },
        serviceProvider: "here",
        waypoints: [],  // You can add waypoints if necessary
        vehicle: { type: "2AxlesAuto" }, // Adjust vehicle type if necessary
      };
  
      const response = await axios.post(
        "https://apis.tollguru.com/toll/v2/origin-destination-waypoints",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_TOLLGURU_API_KEY,
          },
        }
      );
  
      console.log("API Response:", response.data);
  
      if (response.data.routes && response.data.routes.length > 0) {
        const routeData = response.data.routes[0];
  
        // Check if the route has tolls
        if (routeData.tolls && routeData.tolls.length > 0) {
          setTollPoints(routeData.tolls);
  
          // Calculate the total toll cost
          const totalTollCost = routeData.tolls.reduce(
            (sum, toll) => sum + (toll.cashCost || 0),
            0
          );
          setTotalCost(totalTollCost);
        } else {
          console.log("No toll data available for this route.");
          alert("No toll data available for this route.");
        }
      } else {
        console.error("No route data found.");
        alert("No route data available. Please check your inputs.");
      }
    } catch (error) {
      console.error("Error fetching toll data:", error.response?.data || error.message);
      alert("Failed to calculate toll costs. Please try again.");
    }
  };
  
   

  return (
    <div className="p-8 space-y-6">
      <InputForm onSubmit={handleTollCalculation} />
      <TollDetails totalCost={totalCost} />
      <Map route={route} tollPoints={tollPoints} />
    </div>
  );
};

export default HomePage;
