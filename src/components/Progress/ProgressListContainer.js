import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import ProgressList from "./ProgressList";
import { getMeasurements, removeMeasurement } from "../../services/api";

const sortByDateDesc = (arr) =>
  [...arr].sort((a, b) => (b.date || "").localeCompare(a.date || ""));

const ProgressListContainer = ({ navigation }) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const list = await getMeasurements();
      setData(sortByDateDesc(list));
    } catch (error) {
      console.error("Error loading measurements:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      load();
    }, [load])
  );

  const onRemove = async (id) => {
    try {
      await removeMeasurement(id);
      // Reload the list from API
      const list = await getMeasurements();
      setData(sortByDateDesc(list));
    } catch (error) {
      console.error("Error removing measurement:", error);
      alert("Błąd podczas usuwania: " + error.message);
    }
  };

  const onGoToForm = () => navigation.navigate("Progress");

  return <ProgressList data={data} onRemove={onRemove} onGoToForm={onGoToForm} loading={loading} />;
};

export default ProgressListContainer;
