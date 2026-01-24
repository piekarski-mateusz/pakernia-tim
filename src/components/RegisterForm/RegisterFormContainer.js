import RegisterForm from "./RegisterForm"
import { useState } from "react"
import { register } from "../../services/api"

const RegisterFormContainer = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)

    const createAccount = async () => {
        if (!email || !password) {
            alert("Proszę wypełnić wszystkie pola")
            return
        }

        if (password !== confirmPassword) {
            alert("Hasła nie są identyczne")
            return
        }

        if (password.length < 6) {
            alert("Hasło musi mieć minimum 6 znaków")
            return
        }

        setLoading(true)
        try {
            const response = await register(email, password, name)
            console.log("Registration successful:", response.user)
            alert("Konto utworzone pomyślnie!")
            navigation.navigate("Login")
        } catch (error) {
            console.error("Registration error:", error)
            alert("Rejestracja nie powiodła się: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    const goToLogin = () => {
        navigation.navigate("Login")
    }

    const props = {
        createAccount: createAccount,
        goToLogin: goToLogin,
        email: email,
        setEmail: setEmail,
        password: password,
        setPassword: setPassword,
        confirmPassword: confirmPassword,
        setConfirmPassword: setConfirmPassword,
        name: name,
        setName: setName,
        loading: loading,
    }

    return <RegisterForm {...props} />
}

export default RegisterFormContainer
