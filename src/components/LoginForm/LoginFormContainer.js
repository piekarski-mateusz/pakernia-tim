import LoginForm from "./LoginForm"
import { useState } from "react"
import { login } from "../../services/api"

const LoginFormContainer = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const authenticate = async () => {
        if (!email || !password) {
            alert("Proszę wypełnić wszystkie pola")
            return
        }

        setLoading(true)
        try {
            const response = await login(email, password)
            console.log("Login successful:", response.user)
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomeStack' }],
            })
        } catch (error) {
            console.error("Login error:", error)
            alert("Logowanie nie powiodło się: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    const goToRegister = () => {
        navigation.navigate("Register")
    }

    const props = {
        authenticate: authenticate,
        goToRegister: goToRegister,
        email: email,
        setEmail: setEmail,
        password: password,
        setPassword: setPassword,
        loading: loading,
    }

    return <LoginForm {...props} />
}

export default LoginFormContainer
