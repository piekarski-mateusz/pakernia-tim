import React from "react";
import { Image, View, ScrollView } from "react-native";
import logo from "@public/main-logo.png";
import { TextInput, Text } from "react-native-paper";
import styles from "@utils/styles";
import colors from "@utils/colors";
import ButtonWithoutMargin from "../ButtonWithoutMargin/ButtonWithoutMargin";

const RegisterForm = ({
  createAccount,
  goToLogin,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  name,
  setName,
  loading,
}) => {
  return (
    <ScrollView
      contentContainerStyle={styles.authContent}
      keyboardShouldPersistTaps="handled"
    >
      <Image source={logo} style={styles.authLogo} />

      <View style={styles.formCard}>
        <View>
          <Text style={styles.h4}>Imię (opcjonalne)</Text>
          <TextInput
            style={styles.textInputForm2}
            placeholder="Wprowadź imię"
            textColor={colors.text}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            activeUnderlineColor={colors.primary}
          />
        </View>

        <View>
          <Text style={styles.h4}>Email</Text>
          <TextInput
            style={styles.textInputForm2}
            placeholder="Wprowadź email"
            textColor={colors.text}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            activeUnderlineColor={colors.primary}
          />
        </View>

        <View>
          <Text style={styles.h4}>Hasło</Text>
          <TextInput
            style={styles.textInputForm2}
            placeholder="Wprowadź hasło (min. 6 znaków)"
            textColor={colors.text}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            activeUnderlineColor={colors.primary}
          />
        </View>

        <View>
          <Text style={styles.h4}>Powtórz hasło</Text>
          <TextInput
            style={styles.textInputForm2}
            placeholder="Powtórz hasło"
            textColor={colors.text}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            activeUnderlineColor={colors.primary}
          />
        </View>

        <ButtonWithoutMargin 
          name={loading ? "Rejestracja..." : "Zarejestruj"} 
          handler={createAccount} 
        />

        <View style={styles.centerContent}>
          <Text style={styles.text}>lub</Text>
        </View>

        <ButtonWithoutMargin name="Zaloguj" handler={goToLogin} />
      </View>
    </ScrollView>
  );
};

export default RegisterForm;
