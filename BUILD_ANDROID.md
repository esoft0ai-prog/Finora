# Building Finora for Android

## Requirements

- Node.js 22.13 or newer
- npm
- JDK 17 or newer (JDK 21 supported)
- Android Studio with Android SDK/build tools compatible with compile SDK 37
- `ANDROID_HOME` / Android SDK configured

## Install dependencies

```bash
npm install
```

## Debug APK

```bash
cd android
./gradlew assembleDebug
```

APK: `android/app/build/outputs/apk/debug/app-debug.apk`

Debug builds include Android `INTERNET` permission only for Metro development.

## Release APK

For a quick sideload test:

```bash
cd android
./gradlew assembleRelease
```

APK: `android/app/build/outputs/apk/release/app-release.apk`

The build config falls back to the debug signing key when no release key configuration exists. This is convenient for testing but should not be used as a permanent distribution identity.

## Production signing

Generate a private key once and keep it permanently:

```bash
keytool -genkeypair -v \
  -keystore finora-release.keystore \
  -alias finora \
  -keyalg RSA -keysize 4096 -validity 10000
```

Copy it to `android/app/finora-release.keystore` and create `android/keystore.properties`:

```properties
storeFile=finora-release.keystore
storePassword=YOUR_STORE_PASSWORD
keyAlias=finora
keyPassword=YOUR_KEY_PASSWORD
```

Both are Git-ignored. Back up this keystore securely. Android will reject upgrades signed with a different key.

## Versioning

Edit `versionCode` and `versionName` in `android/app/build.gradle`. Increase `versionCode` for every distributed update.

## R8 / resource shrinking

Release builds enable code minification and resource shrinking. Notifee's package is kept explicitly; React Native libraries also supply their consumer ProGuard rules. Always exercise notification scheduling, SQLite access and restore flows on the minified release build.

## Gradle bootstrap

The repository records Gradle 9.4.1 in `gradle-wrapper.properties`. If `gradle-wrapper.jar` is not present, the provided `gradlew`/`gradlew.bat` bootstrap downloads Gradle 9.4.1 on the build machine once, then reuses it. This affects development/build only; the installed application remains fully offline.

## Sideloading

Transfer the APK to a phone, open it, and allow **Install unknown apps** for the app used to open the file when Android asks. No Play Store account is necessary.
