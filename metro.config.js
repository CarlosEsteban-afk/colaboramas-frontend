const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { withMonicon } = require("@monicon/metro");

const config = getDefaultConfig(__dirname);

let finalConfig = withNativeWind(config, { input: "./app/global.css" });

finalConfig = withMonicon(finalConfig, {
  icons: [
    "fluent-mdl2:lock",
    "fluent-mdl2:view",
    "hugeicons:student",
    "mdi:school",
    "mdi-light:eye-off",
    "feather:activity",
    "logos:active-campaign",
    "mdi:home-outline",
    "feather:search",
    "mdi:calendar",
    "fluent:alert-20-regular",
    "mdi:account-circle-outline",
    "mdi:cog",
    "mdi:arrow-left",
    "mdi:translate-variant",
    "mdi:shield-check",
    "mdi:help-circle",
  ],
  collections: [], 
});

module.exports = finalConfig;
