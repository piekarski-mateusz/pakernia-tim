import { createDrawerNavigator } from "@react-navigation/drawer"

import Home from "@screens/Home/Home"
import styles from "@utils/styles"
import DrawerContentContainer from "../components/DrawerContent/DrawerContentContainer"
import DrawerHeaderContainer from "@components/DrawerHeader/DrawerHeaderContainer"
import ExcerciseDetails from "../screens/Exercises/ExcerciseDetails"
import ExcerciseList from "../screens/Exercises/ExcerciseList"
import AtlasList from "../screens/AtlasList/AtlasList"
import Progress from "../screens/Progress/Progress"
import ProgressList from "../screens/ProgressList/ProgressList"
import ProgressChartScreen from "../screens/ProgressChart/ProgressChartScreen";
import TrainingDayScreen from "../screens/Training/TrainingDayScreen";

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
                 <Drawer.Screen
                name="Progress"
                component={Progress}
                options={{
                    headerShown: true,
                }}
            />
             <Drawer.Screen
                name="ProgressList"
                component={ProgressList}
                options={{
                    headerShown: true,
                }}
            />
            <Drawer.Screen
                name="ProgressChartScreen"
                component={ProgressChartScreen}
                 options={{
                        headerShown: true,
                        title: "Wykresy postępów" 
        }}  
/>
            <Drawer.Screen
                name="TrainingDayScreen"
                component={TrainingDayScreen}
                options={{
                    headerShown: true,
                    title: "Trening"
                }}
            />
        </Drawer.Navigator>
    )
}