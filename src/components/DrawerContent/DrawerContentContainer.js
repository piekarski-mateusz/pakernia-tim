import { Platform } from 'react-native'
import DrawerContent from './DrawerContent'
import { logout } from '../../services/api'
import { CommonActions } from '@react-navigation/native'

const DrawerContentContainer = ({navigation}) => {
    const navigateToScreen = (screenName) => {
        navigation.navigate(screenName);
    };

    const navigateToStatistic = ()=>{
        navigation.navigate("Atlas List", {intent: "Statistic"})
    }

    const handleLogout = async () => {
        try {
            await logout()
            // Obrzydliwe ale działa
            if (Platform.OS === 'web') {
                window.location.href = '/login'
            } else {
                const parent = navigation.getParent()
                if (parent) {
                    parent.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    })
                }
            }
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    const props = {
        navigateToScreen: navigateToScreen,
        navigateToStatistic: navigateToStatistic,
        handleLogout: handleLogout,
    }
    
    return <DrawerContent {...props}/>
}

export default DrawerContentContainer