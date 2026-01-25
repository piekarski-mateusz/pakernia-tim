import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { Text, TextInput, ActivityIndicator } from "react-native-paper";
import styles from "@utils/styles";
import colors from "@utils/colors";
import ButtonWithoutMargin from "@components/ButtonWithoutMargin/ButtonWithoutMargin";
import {
  getTrainingForDate,
  saveTrainingForDate,
  deleteTrainingForDate,
} from "../../services/api";
import excercisesData from "@data/excercisesListData.json";

const TrainingDayScreen = ({ route, navigation }) => {
  const dateParam = route?.params?.date;
  const today = new Date().toISOString().split("T")[0];
  const date = dateParam || today;

  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [message, setMessage] = useState(null); // komunikat sukcesu/błędu

  const loadTraining = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTrainingForDate(date);
      setExercises(data.exercises || []);
    } catch (error) {
      console.error("Error loading training:", error);
      setExercises([]);
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    loadTraining();
  }, [loadTraining]);

  const handleSave = async () => {
    if (exercises.length === 0) {
      setMessage({ type: "error", text: "Dodaj przynajmniej jedno ćwiczenie" });
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      await saveTrainingForDate(date, exercises);
      setMessage({ type: "success", text: "✓ Trening został zapisany!" });
    } catch (error) {
      setMessage({ type: "error", text: "Nie udało się zapisać treningu" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = () => {
      return new Promise((resolve) => {
        if (Platform.OS === "web") {
          resolve(window.confirm("Czy na pewno chcesz usunąć ten trening?"));
        } else {
          Alert.alert("Usuń trening", "Czy na pewno chcesz usunąć ten trening?", [
            { text: "Anuluj", style: "cancel", onPress: () => resolve(false) },
            { text: "Usuń", style: "destructive", onPress: () => resolve(true) },
          ]);
        }
      });
    };

    const confirmed = await confirmDelete();
    if (!confirmed) return;

    setSaving(true);
    setMessage(null);
    try {
      await deleteTrainingForDate(date);
      setMessage({ type: "success", text: "✓ Trening został usunięty" });
      setExercises([]);
    } catch (error) {
      setMessage({ type: "error", text: "Nie udało się usunąć treningu" });
    } finally {
      setSaving(false);
    }
  };

  const addExercise = (exercise) => {
    setExercises((prev) => [
      ...prev,
      {
        id: exercise.id,
        title: exercise.title,
        sets: "3",
        reps: "10",
        weight: "",
      },
    ]);
    setShowPicker(false);
  };

  const removeExercise = (index) => {
    setExercises((prev) => prev.filter((_, i) => i !== index));
  };

  const updateExercise = (index, field, value) => {
    setExercises((prev) =>
      prev.map((ex, i) => (i === index ? { ...ex, [field]: value } : ex))
    );
  };

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}.${month}.${year}`;
  };

  if (loading) {
    return (
      <View style={[styles.trainingWrapper, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
    >
      <Text style={styles.progressTitle}>Trening: {formatDate(date)}</Text>

      {message && (
        <View
          style={{
            backgroundColor: message.type === "success" ? "#2ecc71" : "#e74c3c",
            padding: 12,
            borderRadius: 8,
            marginBottom: 16,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
            {message.text}
          </Text>
        </View>
      )}

      {exercises.map((ex, index) => (
        <View key={index} style={styles.trainingExerciseCard}>
          <View style={styles.trainingRow}>
            <Text style={styles.trainingExerciseName}>{ex.title}</Text>
            <TouchableOpacity
              onPress={() => removeExercise(index)}
              style={styles.trainingRemove}
            >
              <Text style={{ color: "#ff6b6b", fontSize: 18 }}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.trainingRow}>
            <View style={styles.trainingHalf}>
              <Text style={styles.trainingExerciseMeta}>Serie</Text>
              <TextInput
                style={styles.textInputForm3}
                value={ex.sets}
                onChangeText={(v) => updateExercise(index, "sets", v)}
                keyboardType="numeric"
                textColor={colors.text}
              />
            </View>
            <View style={styles.trainingHalf}>
              <Text style={styles.trainingExerciseMeta}>Powtórzenia</Text>
              <TextInput
                style={styles.textInputForm3}
                value={ex.reps}
                onChangeText={(v) => updateExercise(index, "reps", v)}
                keyboardType="numeric"
                textColor={colors.text}
              />
            </View>
          </View>

          <View style={styles.trainingRow}>
            <View style={styles.trainingHalf}>
              <Text style={styles.trainingExerciseMeta}>Ciężar (kg)</Text>
              <TextInput
                style={styles.textInputForm3}
                value={ex.weight}
                onChangeText={(v) => updateExercise(index, "weight", v)}
                keyboardType="numeric"
                placeholder="opcjonalne"
                textColor={colors.text}
              />
            </View>
          </View>
        </View>
      ))}

      {!showPicker ? (
        <ButtonWithoutMargin
          name="+ Dodaj ćwiczenie"
          handler={() => setShowPicker(true)}
        />
      ) : (
        <View style={styles.trainingExerciseCard}>
          <Text style={styles.trainingExerciseName}>Wybierz ćwiczenie:</Text>
          <ScrollView style={{ maxHeight: 300 }} nestedScrollEnabled>
            {excercisesData.map((ex) => (
              <TouchableOpacity
                key={ex.id}
                onPress={() => addExercise(ex)}
                style={{
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.primary + "33",
                }}
              >
                <Text style={{ color: colors.text, fontSize: 16 }}>
                  {ex.title}
                </Text>
                <Text style={{ color: colors.text + "99", fontSize: 12 }}>
                  {ex.partTitle}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ButtonWithoutMargin
            name="Anuluj"
            handler={() => setShowPicker(false)}
          />
        </View>
      )}

      <View style={{ marginTop: 20 }}>
        <ButtonWithoutMargin
          name={saving ? "Zapisywanie..." : "Zapisz trening"}
          handler={handleSave}
        />
      </View>

      {exercises.length > 0 && (
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            onPress={handleDelete}
            style={{
              backgroundColor: "#ff4444",
              padding: 12,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Usuń trening
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default TrainingDayScreen;

