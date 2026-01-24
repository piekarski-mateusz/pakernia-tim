import { View } from "react-native"
import DrawerListItem from "./DrawerListItem"
import styles from "@utils/styles"
import colors from "@utils/colors"
import { Entypo } from "@expo/vector-icons"
import { FontAwesome } from "@expo/vector-icons"
import { FontAwesome6, MaterialCommunityIcons} from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"


const CustomDrawer = ({ navigateToScreen, navigateToStatistic, handleLogout }) => {
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
          
                    <DrawerListItem
                title="Zapisz postęp"
                link="Progress"
                handler={navigateToScreen}
                icon={
                    <FontAwesome6
                        name="bars-progress"
                        size={24}
                        color={colors.primary}
                    />
                }
            />
            <DrawerListItem
                title="Wykresy"
                link="ProgressChartScreen"
                handler={navigateToScreen}
                icon={
                <MaterialCommunityIcons
                name="chart-line"
                size={24}
                color={colors.primary}
            />
    }
/>
            <DrawerListItem
                title="Zobacz postępy"
                link="ProgressList"
                handler={navigateToScreen}
                icon={
                    <Entypo
                        name="back-in-time"
                        size={24}
                        color={colors.primary}
                    />
                }
            />
            <View style={{ marginTop: 'auto', paddingTop: 20 }}>
                <DrawerListItem
                    title="Wyloguj"
                    link=""
                    handler={handleLogout}
                    icon={
                        <MaterialIcons
                            name="logout"
                            size={24}
                            color={colors.primary}
                        />
                    }
                />
            </View>
        </View>
    )
}

export default CustomDrawer
