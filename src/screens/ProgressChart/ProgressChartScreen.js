import React from "react";
import { View, ScrollView } from "react-native";
import ProgressChartContainer from "@components/ProgressChart/ProgressChartContainer";
import styles from "@utils/styles"; 

const ProgressChartScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
       <View style={styles.contentNarrow}>
          <ProgressChartContainer />
       </View>
    </View>
  );
};

export default ProgressChartScreen;