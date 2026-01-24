import React from "react";
import Progress from "./Progress";
import { addMeasurement } from "../../services/api";

const pad2 = (n) => String(n).padStart(2, "0");

const todayDDMMYYYY = () => {
  const d = new Date();
  return `${pad2(d.getDate())}-${pad2(d.getMonth() + 1)}-${d.getFullYear()}`;
};

const ddmmyyyyToISO = (s) => {
  if (!s) return "";
  const [dd, mm, yyyy] = s.split("-");
  if (!dd || !mm || !yyyy) return "";
  return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
};

const normalizeNumber = (value) => {
  if (!value) return "";
  let v = value.replace(/\s/g, "").replace(",", ".");
  v = v.replace(/[^0-9.]/g, "");
  const parts = v.split(".");
  if (parts.length > 2) v = `${parts[0]}.${parts.slice(1).join("")}`;
  return v;
};

const toFloatOrNull = (value) => {
  const v = normalizeNumber(value);
  if (!v) return null;
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : null;
};

const isValidDateDDMMYYYY = (s) => /^\d{2}-\d{2}-\d{4}$/.test(s);

const ProgressContainer = ({ navigation }) => {
  // ✅ start w DD-MM-YYYY
  const [date, setDateRaw] = React.useState(todayDDMMYYYY());

  const [chest, setChestRaw] = React.useState("");
  const [thigh, setThighRaw] = React.useState("");
  const [arm, setArmRaw] = React.useState("");
  const [belly, setBellyRaw] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const setDate = (v) => setDateRaw((v || "").trim());
  const setChest = (v) => setChestRaw(normalizeNumber(v));
  const setThigh = (v) => setThighRaw(normalizeNumber(v));
  const setArm = (v) => setArmRaw(normalizeNumber(v));
  const setBelly = (v) => setBellyRaw(normalizeNumber(v));

  const onGoToList = () => navigation.navigate("ProgressList");

  const onSubmit = async () => {
    setError("");

    if (!isValidDateDDMMYYYY(date)) {
      setError("Data musi być w formacie DD-MM-YYYY.");
      return;
    }

    const isoDate = ddmmyyyyToISO(date);
    if (!isoDate) {
      setError("Nieprawidłowa data.");
      return;
    }

    const chestN = toFloatOrNull(chest);
    const thighN = toFloatOrNull(thigh);
    const armN = toFloatOrNull(arm);
    const bellyN = toFloatOrNull(belly);

    if ([chestN, thighN, armN, bellyN].some((x) => x === null)) {
      setError("Uzupełnij wszystkie pola liczbami (w cm).");
      return;
    }

    const inRange = (n) => n > 0 && n < 300;
    if (![chestN, thighN, armN, bellyN].every(inRange)) {
      setError("Wartości muszą być > 0 i < 300 cm.");
      return;
    }

    const payload = {
      date: isoDate,
      chest: chestN,
      thigh: thighN,
      arm: armN,
      belly: bellyN,
    };

    setLoading(true);
    try {
      await addMeasurement(payload);
      navigation.navigate("ProgressList");
    } catch (err) {
      setError("Błąd podczas zapisywania: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Progress
      date={date}              
      setDate={setDate}
      chest={chest}
      setChest={setChest}
      thigh={thigh}
      setThigh={setThigh}
      arm={arm}
      setArm={setArm}
      belly={belly}
      setBelly={setBelly}
      error={error}
      onSubmit={onSubmit}
      onGoToList={onGoToList}
      loading={loading}
    />
  );
};

export default ProgressContainer;
