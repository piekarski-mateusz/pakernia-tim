import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import styles from "@utils/styles";
import colors from "@utils/colors";

const toDDMMYYYY = (iso) => {
  if (!iso) return "";
  const [y, m, d] = String(iso).split("-");
  if (!y || !m || !d) return String(iso);
  return `${d}-${m}-${y}`;
};



const Item = ({ item, onRemove }) => {
  return (
    <View style={styles.progressCard}>
      <View style={styles.progressCardRow}>
        <Text style={styles.progressCardDate}>{toDDMMYYYY(item.date)}</Text>

        <Pressable onPress={() => onRemove(item.id)}>
          <Text style={styles.progressRemove}>Usuń</Text>
        </Pressable>
      </View>

      <Text style={styles.progressCardText}>Klatka: {item.chest} cm</Text>
      <Text style={styles.progressCardText}>Udo: {item.thigh} cm</Text>
      <Text style={styles.progressCardText}>Ręka: {item.arm} cm</Text>
      <Text style={styles.progressCardText}>Brzuch: {item.belly} cm</Text>
    </View>
  );
};

const ProgressList = ({ data, onRemove, onGoToForm }) => {
  return (
    <View style={styles.progressListWrapper}>
      <View style={styles.progressListHeader}>
        <Text style={styles.progressTitle}>Historia pomiarów</Text>
        <Pressable onPress={onGoToForm}>
          <Text style={{ color: colors.primary }}>Dodaj</Text>
        </Pressable>
      </View>

      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => <Item item={item} onRemove={onRemove} />}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={
          <Text style={styles.progressEmpty}>Brak zapisanych pomiarów.</Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProgressList;
