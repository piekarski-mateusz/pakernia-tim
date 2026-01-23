import { createDrawerNavigator } from "@react-navigation/drawer"

import Home from "@screens/Home/Home"
import styles from "@utils/styles"
import DrawerContentContainer from "../components/DrawerContent/DrawerContentContainer"
import DrawerHeaderContainer from "@components/DrawerHeader/DrawerHeaderContainer"


const Drawer = createDrawerNavigator()

export default function CustomDrawer(props) {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
                header: ({ navigation, route, options }) => (
                    <DrawerHeaderContainer
                        navigation={navigation}
                        options={options}
                    />
                ),
                headerStyle: styles.drawerHeader,
                drawerStyle: styles.drawerStyle,
                drawerLabelStyle: styles.drawerLabel,
            }}
            drawerContent={(props) => <DrawerContentContainer {...props} />}
        >
            <Drawer.Screen name="Home" component={Home} />
                  </Drawer.Navigator>
    )
}