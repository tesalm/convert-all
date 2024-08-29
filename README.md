# Convert All

Universal measurement unit conversion tool

This is a [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

### Install on Android
[Google Play](https://play.google.com/store/apps/details?id=com.convertall)

### Exchange rates API
[app.exchangerate-api.com](https://app.exchangerate-api.com/dashboard)

Example Request:  
`https://v6.exchangerate-api.com/v6/<personal-api-key>/latest/USD`

### Features
* U.S., British and metric units.
* 36 measurements: Acceleration, Angle, Area, Bandwidth, Capacitance, Data storage, Density, Dynamic viscosity, Electric charge, Electric current, Electric potential, Electrical conductance, Electrical resistance, Energy, Force, Frequency, Illuminance, Inductance, Kinematic viscosity, Length, Magnetic field, Magnetic flux, Mass, Mass flow rate, Molar Mass, Numerals, Power, Pressure, Radiation, Radioactive decay, Speed, Temperature, Time, Torque, Volume, Volumetric flow rate
* 572 units of measurements
* Currency converter with 168 currencies (rates updated once a day)
* Time zone conversion with 325 different time zones
* Precision selection

### Screenshots
<!--![plot](./screenshots/screenshot_main.png)-->
<img src="./screenshots/main.png" height="380"/> <img src="./screenshots/units.png" height="380"/> <img src="./screenshots/measurements.png" height="380"/> <img src="./screenshots/main_tz.png" height="380"/> <img src="./screenshots/units_tz.png" height="380"/> <img src="./screenshots/main_currency.png" height="380"/>

# Development guide

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Running On Device
### Enable Debugging over USB

Most Android devices can only install and run apps downloaded from Google Play, by default. You will need to enable USB Debugging on your device in order to install your app during development.

To enable USB debugging on your device, you will first need to enable the "Developer options" menu by going to Settings → About phone → Software information and then tapping the Build number row at the bottom seven times. You can then go back to Settings → Developer options to enable "USB debugging".

### Plug in your device via USB to your development machine

Now check that your device is properly connecting to ADB, the Android Debug Bridge, by running `adb devices`

### Run your app

From the root of your project, run the following in your command prompt to install and launch your app on the device: `npm run android`

More info: https://reactnative.dev/docs/running-on-device

## Publishing to Google Play Store
Generate the release AAB  
`npx react-native build-android --mode=release`

The generated AAB can be found under `android/app/build/outputs/bundle/release/app-release.aab`, and is ready to be uploaded to Google Play.

Testing the release build of your app  
`npm run android -- --mode="release"`

More info: https://reactnative.dev/docs/signed-apk-android


# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
