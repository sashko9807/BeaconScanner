## About

BeaconScanner is the application through which user receives the personalized data transmitted by the beacon.

## Testing

As of now there is no way to simulate ranged beacons, which means that scanning for beacons can only be tested on real device.<br>
In order to test scanning for beacons you need either, a real BLE beacon, or alternatively a second device which emulates beacon. BLE beacons can be emulated, via 3rd-party applications such as [Beacon Simulator](https://play.google.com/store/apps/details?id=net.alea.beaconsimulator). <br>

Only iBeacon and ALTbeacon protocols are supported for now.

## Setup for local development

### Prerequisites

- [Node.js](https://nodejs.org/en/download)
- [Expo CLI](https://docs.expo.dev/archive/expo-cli/)
- [Yarn](https://yarnpkg.com/getting-started/install)
- Existing firebase project, with Cloud Messaging API enabled

### Setting up Firebase Cloud Messaging

1. Go to [firebase console](https://console.firebase.google.com/) and select existing, or create new project. The project should be the same as [beacon-restful-service](https://github.com/sashko9807/beacon-restful-service)
2. Create a new android app
3. Download the generated `google-services.json`, and paste it in `/android/app/`
4. Go to `/android/app/src/main/AndroidManifest.xml` and rename the package name, with the name of the app, which was created in firebase

### Setting up project

1. Go to root directory and run `cp env.example .env`
2. Run `yarn`

### Connecting to local server

1. If the express server is ran locally then:

- Open cmd/powershell, and type `ipconfig`(Windows) or `ip a`(Linux)
- Copy the ipv4 address, and replace the IP of the `API_URL` from `.env` with it.

### Building debug apk

1. Run `yarn android:buildDebug` to build debug apk<br>
   _Debug build can be found at `android/app/build/outputs/debug/`_
2. Alternatively if USB debugging is enabled you can run `yarn android:installDebug` to install the debug apk.

### Enviroment variables

| Setting   | description              | default value                  |
| --------- | ------------------------ | ------------------------------ |
| `API_URL` | URL to the API endpoints | `http://10.0.2.2:3001/api/v1/` |
| `CDN_URL` | URL to CDN server        | `http://10.0.2.2:3001/uploads` |
