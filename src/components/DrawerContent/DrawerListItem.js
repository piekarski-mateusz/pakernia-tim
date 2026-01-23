import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import styles from "@utils/styles";

/**
 * @param icon ikona wyświetlana w menu szuflady
 * @param title tytuł wyświetlany w menu szuflady
 * @param link nazwa ekranu z src/navigation/drawer do którego prowadzi nawigacja
 * @param handler funkcja realizująca przejście do innego ekranu
 */
const DrawerListItem = ({ icon, title, link, handler }) => {
  return (
    <View style={styles.drawerListItem}>
      <Pressable onPress={() => handler(link)}>
        <View style={styles.drawerItemWrapper}>
          <View style={styles.iconWrapper}>{icon}</View>
          <Text style={styles.h4}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default DrawerListItem;
