import * as Location from "expo-location";

const tenMetersWithDegres = 0.0001;
const getLocation = (increament) => {
  return {
    timestamp: 10000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 5,
      longitude: 77.3397096 + increament * tenMetersWithDegres,
      latitude: 28.487502 + increament * tenMetersWithDegres,
    },
  };
};

let counter = 0;
setInterval(() => {
  Location.EventEmitter.emit("Expo.locationChanged", {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter),
  });
  counter++;
}, 1000);
