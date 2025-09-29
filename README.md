# Colabora+ - Frontend

Este proyecto es el **frontend** de la aplicación móvil, desarrollada en [React Native](https://reactnative.dev/), utilizando en framework [Expo](https://docs.expo.dev/). 
Se conecta a la API construida en [Spring Boot](https://spring.io/projects/spring-boot).

---

## Requisitos previos

- [Node.js 20+](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Watchman](https://facebook.github.io/watchman/docs/install) (solo en Linux/macOS, recomendado para vigilar cambios en el código y mejorar el hot-reload). 

---
## ¿Qué es Expo?

[Expo](https://docs.expo.dev/) es un framework y plataforma que facilita el desarrollo de aplicaciones móviles con React Native.
Permite arrancar rápidamente un proyecto sin necesidad de configuraciones nativas complejas (Xcode/Android SDK), ya que provee:

Un servidor de desarrollo (Metro bundler) que compila y actualiza la app en tiempo real.

Integración sencilla con librerías nativas comunes.

Herramientas para desplegar y publicar aplicaciones.

## Cómo correr el proyecto

1. Instalar dependencias:

```bash
npm install
```

2. Iniciar el servidor de desarrollo de Expo:

```bash
npx expo start
```
3. Opciones para correr la app:

    - En tu teléfono:

        - Instalar la app Expo Go desde [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent) o [App Store](https://apps.apple.com/us/app/expo-go/id982107779)
        - Escanear el código QR que aparece en la terminal o en la interfaz web de Expo.
    - en un emulador Android (requiere [Android Studio](https://developer.android.com/studio))
        - Configurar un AVD (Android Virtual Device).
        - Desde la terminal de Expo presionar a para lanzar la app en el emulador.
    - En un simulador iOS (solo en macOS con Xcode instalado):
        - Presionar i en la terminal de Expo.

## Estructura de carpetas recomendadas

Aca se entrega un [link](https://docs.expo.dev/get-started/start-developing/#file-structure) a la documentacion oficial con una estructura de carpetas recomendada para un proyecto react native.

Ademas existe en el repositorio una carpeta con una app-example que contiene una estructura de archivos para guiarse.

```bash
.
├── app
│   ├── _layout.tsx
│   ├── modal.tsx
│   └── (tabs)
│       ├── explore.tsx
│       ├── index.tsx
│       └── _layout.tsx
├── components
│   ├── external-link.tsx
│   ├── haptic-tab.tsx
│   ├── hello-wave.tsx
│   ├── parallax-scroll-view.tsx
│   ├── themed-text.tsx
│   ├── themed-view.tsx
│   └── ui
│       ├── collapsible.tsx
│       ├── icon-symbol.ios.tsx
│       └── icon-symbol.tsx
├── constants
│   └── theme.ts
├── hooks
│   ├── use-color-scheme.ts
│   ├── use-color-scheme.web.ts
│   └── use-theme-color.ts
└── scripts
    └── reset-project.js
```