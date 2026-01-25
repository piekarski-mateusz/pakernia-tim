import React, { useState, useEffect } from "react";
import { View, Platform } from "react-native";
import { Text } from "react-native-paper";
import { Pedometer } from "expo-sensors";
import styles from "@utils/styles";
import colors from "@utils/colors";

const PedometerComponent = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [pastStepCount, setPastStepCount] = useState(0);

  useEffect(() => {
    let subscription = null;

    const subscribe = async () => {
      // Krokomierz działa tylko na urządzeniach mobilnych
      if (Platform.OS === "web") {
        setIsPedometerAvailable("web");
        return;
      }

      const isAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(isAvailable ? "available" : "unavailable");

      if (isAvailable) {
        // Pobierz kroki z ostatnich 24h - tylko na iOS
        // Android nie obsługuje getStepCountAsync
        if (Platform.OS === "ios") {
          const end = new Date();
          const start = new Date();
          start.setHours(0, 0, 0, 0); // Od północy

          try {
            const pastResult = await Pedometer.getStepCountAsync(start, end);
            if (pastResult) {
              setPastStepCount(pastResult.steps);
            }
          } catch (error) {
            console.log("Error getting past steps:", error);
          }
        }

        // Subskrybuj na bieżące kroki (działa na iOS i Android)
        subscription = Pedometer.watchStepCount((result) => {
          setCurrentStepCount(result.steps);
        });
      }
    };

    subscribe();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const totalSteps = pastStepCount + currentStepCount;
  const dailyGoal = 10000;
  const progress = Math.min((totalSteps / dailyGoal) * 100, 100);
  const isAndroid = Platform.OS === "android";

  if (isPedometerAvailable === "checking") {
    return (
      <View style={[styles.pedometerWrapper, pedometerStyles.container]}>
        <Text style={pedometerStyles.label}>Sprawdzanie krokomierza...</Text>
      </View>
    );
  }

  if (isPedometerAvailable === "web") {
    return (
      <View style={[styles.pedometerWrapper, pedometerStyles.container]}>
        <Text style={pedometerStyles.icon}>👟</Text>
        <Text style={pedometerStyles.label}>Krokomierz</Text>
        <Text style={pedometerStyles.unavailable}>
          Dostępny tylko na telefonie
        </Text>
      </View>
    );
  }

  if (isPedometerAvailable === "unavailable") {
    return (
      <View style={[styles.pedometerWrapper, pedometerStyles.container]}>
        <Text style={pedometerStyles.icon}>👟</Text>
        <Text style={pedometerStyles.label}>Krokomierz</Text>
        <Text style={pedometerStyles.unavailable}>
          Niedostępny na tym urządzeniu
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.pedometerWrapper, pedometerStyles.container]}>
      <Text style={pedometerStyles.icon}>👟</Text>
      <Text style={pedometerStyles.label}>
        {isAndroid ? "Kroki od uruchomienia aplikacji" : "Dzisiejsze kroki"}
      </Text>
      <Text style={pedometerStyles.steps}>{totalSteps.toLocaleString()}</Text>
      
      <View style={pedometerStyles.progressBar}>
        <View
          style={[pedometerStyles.progressFill, { width: `${progress}%` }]}
        />
      </View>
      
      <Text style={pedometerStyles.goal}>
        Cel: {dailyGoal.toLocaleString()} kroków ({Math.round(progress)}%)
      </Text>
      {isAndroid && (
        <Text style={pedometerStyles.androidNote}>
          Android nie obsługuje historii kroków
        </Text>
      )}
    </View>
  );
};

const pedometerStyles = {
  container: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 20,
    marginVertical: 15,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  steps: {
    color: colors.primary,
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 12,
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: colors.text + "22",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  goal: {
    color: colors.text,
    fontSize: 12,
    opacity: 0.6,
  },
  unavailable: {
    color: colors.text,
    fontSize: 14,
    opacity: 0.5,
    textAlign: "center",
  },
  androidNote: {
    color: colors.text,
    fontSize: 11,
    opacity: 0.5,
    marginTop: 6,
    textAlign: "center",
  },
};

export default PedometerComponent;

