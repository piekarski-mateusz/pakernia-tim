import React from "react";
import { View, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import styles from "@utils/styles";
import colors from "@utils/colors";

import TrainingCalendarHome from "@components/Training/TrainingCalendarHome";
import ButtonWithoutMargin from "@components/ButtonWithoutMargin/ButtonWithoutMargin";
import PedometerComponent from "@components/Pedometer/Pedometer";

const Home = ({ navigation }) => {
  // Pobierz dzisiejszą datę w formacie YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  return (
    <ScrollView
      style={[styles.containerNoCenter, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingHorizontal: 16, paddingTop: 10 }}>
        <ButtonWithoutMargin
          name="Dodaj trening"
          handler={() => navigation.navigate("TrainingDayScreen", { date: today })}
        />
        <PedometerComponent />
        <TrainingCalendarHome navigation={navigation} />
      </View>
    </ScrollView>
  );
}

export default Home;