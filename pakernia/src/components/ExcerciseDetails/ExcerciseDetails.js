import React from "react";
import { View, Text, useWindowDimensions, ScrollView, Platform } from "react-native";
import styles from "../../utils/styles";
import ExcerciseHeader from "@components/ExcerciseHeader/ExcerciseHeader";
import YoutubePlayer from "@components/Youtube/YoutubePlayer";

const WEB_PLAYER_WIDTH = 900; // stałe na web
const WEB_PADDING = 30; 

const ExcerciseDetails = ({ url, exerciseName, exerciseDescription }) => {
  const { width } = useWindowDimensions();

   const videoWidth =
    Platform.OS === "web"
      ? Math.min(WEB_PLAYER_WIDTH, width - WEB_PADDING * 2)
      : width - 30;

  const videoHeight = (videoWidth * 9) / 16;


  return (
    <View style={styles.containerExerciseDetailsOut}>
      <ExcerciseHeader title={exerciseName} />

      <ScrollView
        contentContainerStyle={styles.exerciseDetailsScrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

      <View style={styles.containerExerciseDetails}>
        <View style={{ alignItems: "center" }}>
          <YoutubePlayer
            width={videoWidth}
            height={videoHeight}
            play={true}
            videoId={url}
          />
        </View>

        <View style={styles.containerVideoText}>
          <Text style={styles.containerVideoTextText}>{exerciseDescription}</Text>
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

export default ExcerciseDetails;
