# Finora QA Report

## Completed static checks in this build workspace

- TS/TSX syntax transpilation across application and test files: PASS.
- Relative import target resolution across application/tests: PASS.
- TODO/FIXME/not-implemented marker scan across source/native code: PASS.
- Pure TypeScript finance calculation compilation: PASS.
- Dependency-free deterministic calculation smoke tests: PASS.
- Android XML resource/manifest well-formedness: checked during final packaging.
- Product source includes unit/service test files, Android native configuration, CI workflow and documentation.

## Environment limitations

This execution host has Node.js 22 and JDK 21, but it does not have an Android SDK configured. The shell also cannot reach the npm package registry, so `npm install`, full `tsc` against installed third-party type declarations, Jest execution, Gradle dependency resolution and APK compilation cannot be completed here.

No APK file is included unless a successful Gradle build actually creates it. Do not rename a ZIP or placeholder as an APK.

## Required build verification on Android-capable CI/developer host

1. `npm install`
2. `npm run typecheck`
3. `npm test`
4. `cd android && ./gradlew assembleDebug`
5. Install `app-debug.apk` on a device/emulator and execute the device QA checklist in `TESTING.md`.
6. Configure a persistent release keystore.
7. `./gradlew assembleRelease`
8. Inspect merged release permissions and verify no `INTERNET` permission.
9. Install the release APK with Wi-Fi/mobile data disabled and exercise all core flows.

GitHub Actions workflow `.github/workflows/android.yml` performs typecheck, tests and release APK build once this project is placed in a GitHub repository.
