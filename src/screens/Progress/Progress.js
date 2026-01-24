import React from "react";
import { ScrollView, View } from "react-native";
import ProgressContainer from "@components/Progress/ProgressContainer";
import styles from "@utils/styles";

const Progress = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.progressScroll}>
        <ProgressContainer navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default Progress;
