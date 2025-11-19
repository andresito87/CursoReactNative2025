# React Native CLI + TypeScript – Curso y Proyectos

Repositorio personal con las apps, ejercicios y ejemplos que voy desarrollando siguiendo el curso:

**“TypeScript, React Native CLI, Google y Apple maps, cámara, GPS, polylines, hooks, autenticación, despliegues y más”**

---

## 🚀 Objetivo del repositorio

Este repo es mi cuaderno de trabajo del curso: aquí voy guardando todo el código, pruebas y proyectos que realizo a lo largo de las clases.  
La idea es que me sirva como:

- Referencia rápida de ejemplos (navegación, mapas, cámara, GPS, etc.).
- Base para futuras apps reales.
- Historial de mi progreso con React Native CLI + TypeScript.

---

## 🧩 Contenido del curso reflejado en este repo

A lo largo del curso se trabajan muchos temas. En este repositorio irás encontrando ejemplos relacionados con:

- **React Native CLI** (sin Expo)
- **TypeScript** en todo el proyecto:
  - Tipos básicos
  - Tipado de respuestas de APIs
  - Tipos de props y rutas
  - Argumentos obligatorios en componentes y navegación
- **Navegación con React Navigation**:
  - Stack Navigator
  - Drawer Navigator
  - Bottom Tabs
  - Top Tabs / Material Top Tabs
  - Envío de argumentos entre pantallas
- **Estilos y diseño**:
  - Flexbox, Box Model y Position
  - Gradientes
  - Temas: Dark, Light y tema personalizado
- **Consumo de APIs y lógica de negocio**:
  - Axios (instancias, middlewares, configuración)
  - CRUDs
  - Carga y subida de imágenes
  - Reutilización de componentes y hooks
- **Recursos nativos**:
  - Google Maps
  - Apple Maps
  - GPS
  - Cámara
  - Galería de imágenes
- **Experiencia de usuario**:
  - Infinite Scroll
  - Pull to Refresh
  - Slideshows y carruseles
  - Búsquedas con debouncers
- **Autenticación**:
  - Login con JWT
- **Despliegues**:
  - Preparación de builds
  - Publicación en Google Play Store
  - Publicación en Apple App Store

---

## 📂 Organización del repositorio

> Nota: la estructura puede ir cambiando según avance en el curso.

Una posible organización (y la que intento seguir) es:

- `01-intro-hola-mundo/` – Primeros pasos con React Native CLI.
- `02-typescript-bases/` – Fundamentos de TypeScript aplicados a RN.
- `03-componentes-layout/` – Componentes básicos, estilos y Flexbox.
- `04-navegacion/` – Stack, Tabs, Drawer, argumentos, etc.
- `05-temas-y-context/` – Temas Dark/Light y Context API.
- `06-apis-y-cruds/` – Axios, consumo de APIs, CRUDs.
- `07-maps-gps/` – Google/Apple Maps, GPS, polylines.
- `08-camara-galeria/` – Cámara, galería y manejo de imágenes.
- `09-autenticacion/` – Autenticación con JWT.
- `10-despliegues/` – Notas y config para builds y despliegues.

Cada carpeta suele incluir su propio mini-README o comentarios en el código explicando qué se practica allí.

---

## 🛠️ Tecnologías y herramientas

- **React Native CLI**
- **TypeScript**
- **React Navigation**
- **Axios**
- **Context API / Hooks**
- **Google Maps / Apple Maps**
- **Módulos nativos de cámara, galería y GPS**
- **iOS / Android emuladores y dispositivos físicos**

---

## ✅ Requisitos

Para poder ejecutar los proyectos de este repo se recomienda:

- Conocimientos previos de **React con Hooks**
- Conocimientos básicos de **JavaScript**
- (Opcional pero recomendable) Bases de **TypeScript**
- Entorno configurado para **React Native CLI**:
  - Node.js y npm/yarn
  - Android Studio + SDK configurado (para Android)
  - Xcode (para iOS, en caso de usar Mac)
- Posibilidad de instalar herramientas como administrador en el equipo
- Dispositivo físico o emulador (Android / iOS)

---

## ▶️ Cómo ejecutar los proyectos

1. **Clonar el repositorio**

   ```bash
   git clone <URL_DE_ESTE_REPO>
   cd <NOMBRE_DEL_REPO>
    ```

2. **Instalar dependencias**

   ```bash
   npm install
   # o
   yarn
   ```

3. **Entrar a la app o ejemplo que quieras ejecutar**
   (si uso varias apps organizadas por carpetas)

   ```bash
   cd 01-intro-hola-mundo
   ```

4. **Ejecutar en Android**

   ```bash
   npx react-native run-android
   ```

5. **Ejecutar en iOS** (solo en macOS)

   ```bash
   npx pod-install ios
   npx react-native run-ios
   ```

> Algunos ejemplos (como Maps, GPS o autenticación) pueden requerir claves de API o configuración adicional.
> Esas instrucciones específicas se documentan dentro de la carpeta correspondiente.

## 📚 Curso original
Fernando Herrera – Curso de React Native CLI + TypeScript en Udemy
- [TypeScript, React Native CLI, Google y Apple maps, cámara, GPS, polylines, hooks, autenticación, despliegues y más](https://www.udemy.com/course/react-native-fh/)

---

## 📜 Licencia

Código de uso personal/educativo.
Si alguien más lo usa, que sea también con fines de aprendizaje 🙂

