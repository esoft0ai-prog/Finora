# Known Limitations

- Android/OEM power-management policies can delay exact or idle alarms on some devices. Finora persists reminder schedules and reconciles them when the application starts or returns to the foreground, but users may still need to permit exact alarms or exempt the app from aggressive battery restrictions on affected OEMs.
- Exported JSON backups are integrity-checked but are not encrypted files. Store exported backups securely.
- The SQLite database uses Android app sandbox/device encryption rather than SQLCipher database-level encryption.
- The built-in financial assistant is intentionally rule-based and supports defined finance intents; it is not a general conversational AI.
- Currency configuration does not perform exchange-rate conversion because the application has no network/API dependency. Each record retains its currency code.
