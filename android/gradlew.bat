@echo off
setlocal
set APP_HOME=%~dp0
set WRAPPER_JAR=%APP_HOME%gradle\wrapper\gradle-wrapper.jar
if exist "%WRAPPER_JAR%" (
  java -classpath "%WRAPPER_JAR%" org.gradle.wrapper.GradleWrapperMain %*
  exit /b %ERRORLEVEL%
)
set GRADLE_VERSION=9.4.1
if "%GRADLE_USER_HOME%"=="" set GRADLE_USER_HOME=%USERPROFILE%\.gradle
set CACHE_PARENT=%GRADLE_USER_HOME%\finora-bootstrap
set CACHE_DIR=%CACHE_PARENT%\gradle-%GRADLE_VERSION%
set GRADLE_BIN=%CACHE_DIR%\bin\gradle.bat
if not exist "%GRADLE_BIN%" (
  echo Bootstrapping Gradle %GRADLE_VERSION%...
  powershell -NoProfile -ExecutionPolicy Bypass -Command "$u='https://services.gradle.org/distributions/gradle-%GRADLE_VERSION%-bin.zip'; $z=Join-Path $env:TEMP 'gradle-%GRADLE_VERSION%-bin.zip'; Invoke-WebRequest -Uri $u -OutFile $z; New-Item -ItemType Directory -Force -Path '%CACHE_PARENT%' | Out-Null; if(Test-Path '%CACHE_DIR%'){Remove-Item -Recurse -Force '%CACHE_DIR%'}; Expand-Archive -Path $z -DestinationPath '%CACHE_PARENT%' -Force; Remove-Item $z"
  if errorlevel 1 exit /b 1
)
call "%GRADLE_BIN%" -p "%APP_HOME%" %*
exit /b %ERRORLEVEL%
