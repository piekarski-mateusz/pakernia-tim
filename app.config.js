// Expo env var
export default {
  expo: {
    name: "Pakernia",
    slug: "Pakernia",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./public/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./public/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./public/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      favicon: "./public/favicon.png"
    },
    plugins: [
      "expo-router"
    ],
    extra: {
      apiUrl: process.env.API_URL || "https://pakernia-api.azurewebsites.net/api",
    }
  }
};

