import React from "react";
import { Image, View, ScrollView} from "react-native";
import logo from "@public/big-logo.png";
import { TextInput, Text } from "react-native-paper";
import styles from "@utils/styles";
import colors from "@utils/colors";
import Button from "@components/Button/Button";

const LoginForm = ({
  authenticate,
  goToRegister,
  email,
  setEmail,
  password,
  setPassword,
  loading,
}) => {
  return (
      <ScrollView
        contentContainerStyle={styles.authContent}
        keyboardShouldPersistTaps="handled"
      >
        <Image source={logo} />

        <View style={styles.formCard}>
          <View>
            <Text style={styles.h3}>Email</Text>
            <TextInput
              style={styles.textInputForm}
              placeholder="Wprowadź email"
              keyboardType="email-address"
              autoCapitalize="none"
              textColor={colors.text}
              activeUnderlineColor={colors.primary}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View>
            <Text style={styles.h3}>Hasło</Text>
            <TextInput
              style={styles.textInputForm}
              placeholder="Wprowadź hasło"
              textColor={colors.text}
              secureTextEntry
              activeUnderlineColor={colors.primary}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.centerContent}>
            <Button 
              name={loading ? "Logowanie..." : "Zaloguj"} 
              handler={authenticate} 
            />
          </View>

          <View style={styles.centerContent}>
            <Text style={styles.text}>lub</Text>
          </View>

          <Button name="Zarejestruj" handler={goToRegister} />
        </View>
      </ScrollView>
  );
};

export default LoginForm;
