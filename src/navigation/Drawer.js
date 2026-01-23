import { createDrawerNavigator } from "@react-navigation/drawer"

import Home from "@screens/Home/Home"
import styles from "@utils/styles"
import DrawerContentContainer from "../components/DrawerContent/DrawerContentContainer"
import DrawerHeaderContainer from "@components/DrawerHeader/DrawerHeaderContainer"
import ExcerciseDetails from "../screens/Exercises/ExcerciseDetails"
import ExcerciseList from "../screens/Exercises/ExcerciseList"
import AtlasList from "../screens/AtlasList/AtlasList"

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
            <Drawer.Screen
                name="Excercise Details"
                component={ExcerciseDetails}
            />
            <Drawer.Screen
                name="Atlas List"
                component={AtlasList}
                options={{
                    headerShown: true,
                }}
            />
            <Drawer.Screen
                name="Excercise List"
                component={ExcerciseList}
                options={{
                    headerShown: true,
                }}
            />
                  </Drawer.Navigator>
    )
}