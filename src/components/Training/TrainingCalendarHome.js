import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import styles from "@utils/styles";
import colors from "@utils/colors";
import { getMarkedDates } from "../../services/api";

const TrainingCalendarHome = ({ navigation }) => {
  const [markedDates, setMarkedDates] = React.useState({});

  const refresh = React.useCallback(async () => {
    try {
      const marked = await getMarkedDates();
      setMarkedDates(marked);
    } catch (error) {
      console.error("Error loading marked dates:", error);
    }
  }, []);

  React.useEffect(() => {
    const unsub = navigation.addListener("focus", refresh);
    refresh();
    return unsub;
  }, [navigation, refresh]);

  return (
    <View style={styles.trainingCalendarHomeWrapper}>
      <Text style={styles.trainingHomeTitle}>Kalendarz treningów</Text>

      <View style={styles.trainingCalendarBox}>
        <Calendar
          markedDates={markedDates}
          onDayPress={(day) => {
            navigation.navigate("TrainingDayScreen", { date: day.dateString });
          }}
          theme={{
            calendarBackground: colors.background,
            dayTextColor: colors.text,
            monthTextColor: colors.text,
            arrowColor: colors.primary,
            todayTextColor: colors.primary,
          }}
        />
      </View>
    </View>
  );
};

export default TrainingCalendarHome;