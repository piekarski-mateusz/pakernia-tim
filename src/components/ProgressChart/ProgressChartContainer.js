import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getMeasurements } from "../../services/api";
import ProgressChart from "./ProgressChart";

const ProgressChartContainer = () => {
  const [data, setData] = useState([]);
  const [selectedPart, setSelectedPart] = useState("chest"); 

  const loadData = async () => {
    const list = await getMeasurements();

    const sorted = [...list].sort((a, b) => (a.date || "").localeCompare(b.date || ""));
    setData(sorted);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const getPartLabel = (part) => {
    switch(part) {
        case 'chest': return 'Klatka';
        case 'thigh': return 'Udo';
        case 'arm': return 'Ręka';
        case 'belly': return 'Brzuch';
        default: return '';
    }
  }


  const recentData = data.slice(-6);

  const chartData = {
    labels: recentData.map((item) => {
        if (!item.date) return "";
        const parts = item.date.split('-'); 
        if (parts.length === 3) return `${parts[2]}.${parts[1]}`;
        return item.date;
    }),
    datasets: [
      {
        data: recentData.map((item) => {
             const val = parseFloat(item[selectedPart]);
             return isNaN(val) ? 0 : val;
        }),
      },
    ],
  };

  return (
    <ProgressChart 
        chartData={chartData} 
        selectedPart={selectedPart}
        setSelectedPart={setSelectedPart}
        hasData={recentData.length > 0}
        partLabel={getPartLabel(selectedPart)}
    />
  );
};

export default ProgressChartContainer;