import React from "react";
import { View, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import styles from "@utils/styles";
import colors from "@utils/colors";

import TrainingCalendarHome from "@components/Training/TrainingCalendarHome";
import ButtonWithoutMargin from "@components/ButtonWithoutMargin/ButtonWithoutMargin";

const Home = ({ navigation }) => {
  return (
    <ScrollView
      style={[styles.containerNoCenter, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingHorizontal: 16, paddingTop: 10 }}>
        <ButtonWithoutMargin
          name="Dodaj trening"
          handler={() => navigation.navigate("Training")}
        />
        <TrainingCalendarHome navigation={navigation} />
      </View>
    </ScrollView>
  );
}

export default Home;