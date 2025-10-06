const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { withMonicon } = require("@monicon/metro");

const config = getDefaultConfig(__dirname);

let finalConfig= withNativeWind(config, { input: "./app/global.css" });

finalConfig = withMonicon(finalConfig, {
  icons: [
    "hugeicons:student",
    "mdi:school",         
    "feather:activity",
    "logos:active-campaign",
  ],
  collections: ["hugeicons","mdi"],   
});

module.exports = finalConfig 
