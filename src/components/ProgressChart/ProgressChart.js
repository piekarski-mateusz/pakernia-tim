import React from "react";
import { View, Dimensions, ScrollView, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import styles from "@utils/styles";
import colors from "@utils/colors";

const screenWidth = Dimensions.get("window").width;

const darkThemeOverride = { colors: { onSurface: colors.text } };

const FilterButton = ({ label, value, selected, onSelect }) => (
    <Pressable 
        onPress={() => onSelect(value)}
        style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            backgroundColor: selected ? colors.primary : 'transparent',
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.primary,
            marginRight: 8
        }}
    >
        
        <Text 
            theme={darkThemeOverride}
            style={{ fontWeight: selected ? 'bold' : 'normal' }}
        >
            {label}
        </Text>
    </Pressable>
);

const ProgressChart = ({ chartData, selectedPart, setSelectedPart, hasData, partLabel }) => {
  return (

    <View style={[styles.trainingWrapper, { minHeight: 400 }]}>
      

      <Text 
        style={[styles.progressTitle, { marginBottom: 20 }]}
        theme={darkThemeOverride}
      >
        Wykres postępów: {partLabel}
      </Text>


      <View style={{ flexDirection: 'row', marginBottom: 20, justifyContent: 'center' }}>
          <FilterButton label="Klatka" value="chest" selected={selectedPart === 'chest'} onSelect={setSelectedPart} />
          <FilterButton label="Udo" value="thigh" selected={selectedPart === 'thigh'} onSelect={setSelectedPart} />
          <FilterButton label="Ręka" value="arm" selected={selectedPart === 'arm'} onSelect={setSelectedPart} />
          <FilterButton label="Brzuch" value="belly" selected={selectedPart === 'belly'} onSelect={setSelectedPart} />
      </View>

      {hasData ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <LineChart
            data={chartData}
            width={Math.max(screenWidth - 40, chartData.labels.length * 60)} 
            height={220}
            chartConfig={{
              backgroundColor: colors.background,
              backgroundGradientFrom: colors.background,
              backgroundGradientTo: colors.background,
              decimalPlaces: 1, 

              color: (opacity = 1) => `rgba(170, 27, 24, ${opacity})`, 

              labelColor: (opacity = 1) => `rgba(223, 223, 223, ${opacity})`, 
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "5",
                strokeWidth: "2",
                stroke: colors.tertiary,
              },

              propsForBackgroundLines: {
                strokeDasharray: "", 
                stroke: "rgba(255,255,255,0.1)"
              }
            }}
            bezier 
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </ScrollView>
      ) : (
        <Text 
            style={[styles.textCenter, { marginTop: 20 }]}
            theme={darkThemeOverride}
        >
            Brak danych do wyświetlenia. Dodaj pomiary w zakładce "Zapisz postęp".
        </Text>
      )}
    </View>
  );
};

export default ProgressChart;