import * as Location from "expo-location";

interface LocationCoords {
  latitude: number;
  longitude: number;
}

/**
 * Try to get device location via GPS first,
 * then fall back to geocoding from city and country
 */
export const getLocationCoords = async (
  city?: string,
  country?: string
): Promise<LocationCoords | null> => {
  try {
    // Option 1: Try device GPS location
    const deviceLocation = await getDeviceLocation();
    if (deviceLocation) {
      console.log("Got location from device GPS:", deviceLocation);
      return deviceLocation;
    }

    // Option 2: Fall back to geocoding from city/country
    if (city && country) {
      const geocodedLocation = await getLatLongFromCity(city, country);
      if (geocodedLocation) {
        console.log("Got location from geocoding:", geocodedLocation);
        return geocodedLocation;
      }
    }

    console.warn("Could not obtain location from device or geocoding");
    return null;
  } catch (error) {
    console.error("Error getting location:", error);
    return null;
  }
};

/**
 * Get device location using GPS
 */
const getDeviceLocation = async (): Promise<LocationCoords | null> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Location permission denied");
      return null;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error("Error getting device location:", error);
    return null;
  }
};

/**
 * Geocode city and country to lat/long using OpenStreetMap Nominatim
 * (Free, no API key required)
 */
const getLatLongFromCity = async (
  city: string,
  country: string
): Promise<LocationCoords | null> => {
  try {
    const query = encodeURIComponent(`${city}, ${country}`);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`
    );

    const data = await response.json();

    if (data && data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
      };
    }

    console.warn(`No location found for ${city}, ${country}`);
    return null;
  } catch (error) {
    console.error("Error geocoding location:", error);
    return null;
  }
};
