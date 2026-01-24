import React from "react";
import { View } from "react-native";
import ProgressListContainer from "@components/Progress/ProgressListContainer";

const ProgressList = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <ProgressListContainer navigation={navigation} />
    </View>
  );
};

export default ProgressList;