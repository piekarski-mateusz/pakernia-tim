import { createNativeStackNavigator } from "@react-navigation/native-stack"
import CustomDrawer from "./Drawer"

const Stack = createNativeStackNavigator()

const optionScreen = {
    headerShown: false,
}

export default function StackNavigation() {
    return (
        <Stack.Navigator initialRouteName="HomeStack">

            <Stack.Screen
                name="HomeStack"
                component={CustomDrawer}
                options={optionScreen}
            />
        </Stack.Navigator>
    )
}
