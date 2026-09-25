# Finora Security and Privacy

## Threat model

Finora minimizes exposure by keeping financial data local and removing the release app's Internet permission. It does not contain ad SDKs, analytics SDKs, cloud credentials, API keys or remote login flows.

## App lock

PIN credentials are stored through `react-native-keychain`, backed by Android credential/keystore facilities. PINs are not stored in SQLite or AsyncStorage. Biometric unlock uses a keychain entry protected by the currently enrolled biometric set or device passcode. Auto-lock is enforced after the configured background timeout.

## Database protection

SQLite lives in Android's private application sandbox and Android backups are disabled in the manifest. The application does **not** claim SQLCipher-level database encryption. Protection at rest therefore depends on Android app sandboxing and the device's storage encryption. A rooted/compromised device or privileged forensic access is outside the app-lock security boundary.

## Permissions

Release permissions are limited to:

- `POST_NOTIFICATIONS`
- `RECEIVE_BOOT_COMPLETED`
- `SCHEDULE_EXACT_ALARM`
- `VIBRATE`

`INTERNET` exists only in the debug manifest for Metro development. There are no location, contacts, SMS, call log, camera or microphone permissions.

## Backup safety

Export is user initiated. Backup JSON is integrity-checked but not encrypted; once exported, the destination chosen by the user controls its confidentiality. Restore validates the Finora format/version/checksum and requires an explicit merge or replace action. Imported SQL values are parameterized.

## Hardcoded secrets

There are no application secrets. The checked-in Android debug keystore is development-only. Production release keystores/passwords must never be committed; `android/keystore.properties` and release keystore patterns are ignored by Git.
