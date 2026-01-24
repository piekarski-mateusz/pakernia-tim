import { createNativeStackNavigator } from "@react-navigation/native-stack"

import CustomDrawer from "./Drawer"
import Login from "../screens/Authenticate/Login"
import Register from "../screens/Authenticate/Register"
import Home from "../screens/Home/Home"

const Stack = createNativeStackNavigator()

const optionScreen = {
    headerShown: false,
}

export default function StackNavigation() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Home"
                component={CustomDrawer}
                options={optionScreen}
            />

            <Stack.Screen
                name="Login"
                component={Login}
                options={optionScreen}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={optionScreen}
            />
     

        </Stack.Navigator>
    )
}