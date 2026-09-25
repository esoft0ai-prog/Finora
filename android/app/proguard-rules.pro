# React Native libraries supply consumer ProGuard rules. Keep only application-specific rules here.
-keepattributes Signature,InnerClasses,EnclosingMethod
-keep class app.notifee.** { *; }
-dontwarn app.notifee.**
