import { View } from "react-native"
import DrawerListItem from "./DrawerListItem"
import styles from "@utils/styles"
import colors from "@utils/colors"
import { Entypo } from "@expo/vector-icons"
import { FontAwesome } from "@expo/vector-icons"


const CustomDrawer = ({ navigateToScreen, navigateToStatistic }) => {
    return (
        <View style={styles.drawerWrapper}>
            <DrawerListItem
                title="Strona Główna"
                link="Home"
                handler={navigateToScreen}
                icon={<Entypo name="home" size={24} color={colors.primary} />}
            />
            <DrawerListItem
                title="Atlas ćwiczeń"
                link="Atlas List"
                handler={navigateToScreen}
                icon={
                    <FontAwesome
                        name="folder"
                        size={24}
                        color={colors.primary}
                    />
                }
            />
          
        
        </View>
    )
}

export default CustomDrawer
