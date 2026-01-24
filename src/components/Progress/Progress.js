import React from "react";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import styles from "@utils/styles";
import colors from "@utils/colors";
import ButtonWithoutMargin from "@components/ButtonWithoutMargin/ButtonWithoutMargin";

const Progress = ({
  date,
  setDate,

  chest,
  setChest,
  thigh,
  setThigh,
  arm,
  setArm,
  belly,
  setBelly,

  error,
  onSubmit,
  onGoToList,
}) => {
  return (
    <View style={styles.progressWrapper}>
      <Text style={styles.progressTitle}>Wymiary ciała (cm)</Text>

      {error ? <Text style={styles.progressError}>{error}</Text> : null}

      <View style={styles.progressField}>
        <Text style={styles.h4}>Data (DD-MM-YYYY)</Text>
        <TextInput
          style={styles.textInputForm2}
          placeholder="np. 15-01-2026"
          textColor={colors.text}
          activeUnderlineColor={colors.primary}
          value={date}
          onChangeText={setDate}
        />
      </View>

      <View style={styles.progressField}>
        <Text style={styles.h4}>Obwód klatki</Text>
        <TextInput
          style={styles.textInputForm2}
          placeholder="np. 102"
          keyboardType="numeric"
          textColor={colors.text}
          activeUnderlineColor={colors.primary}
          value={chest}
          onChangeText={setChest}
        />
      </View>

      <View style={styles.progressField}>
        <Text style={styles.h4}>Obwód uda</Text>
        <TextInput
          style={styles.textInputForm2}
          placeholder="np. 58"
          keyboardType="numeric"
          textColor={colors.text}
          activeUnderlineColor={colors.primary}
          value={thigh}
          onChangeText={setThigh}
        />
      </View>

      <View style={styles.progressField}>
        <Text style={styles.h4}>Obwód ręki</Text>
        <TextInput
          style={styles.textInputForm2}
          placeholder="np. 36"
          keyboardType="numeric"
          textColor={colors.text}
          activeUnderlineColor={colors.primary}
          value={arm}
          onChangeText={setArm}
        />
      </View>

      <View style={styles.progressField}>
        <Text style={styles.h4}>Obwód brzucha</Text>
        <TextInput
          style={styles.textInputForm2}
          placeholder="np. 90"
          keyboardType="numeric"
          textColor={colors.text}
          activeUnderlineColor={colors.primary}
          value={belly}
          onChangeText={setBelly}
        />
      </View>

      <View style={styles.progressButtons}>
        <ButtonWithoutMargin name="Zapisz" handler={onSubmit} />
        <View style={{ marginTop: 10 }}>
          <ButtonWithoutMargin name="Zobacz historię" handler={onGoToList} />
        </View>
      </View>
    </View>
  );
};

export default Progress;
