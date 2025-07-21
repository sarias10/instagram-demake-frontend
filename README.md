## 🚀 Demo en vivo

Visita la app en vivo

👉 [https://instagram-demake.sarias.uk](https://instagram-demake.sarias.uk)


## 🗺️ Diagrama de arquitectura en AWS
Este es el diagrama de despliegue de la página web Instagram Demake en AWS:


![arquitectura aws de instagram demake](assets/instagram-demake.png)


## 🎬 Funcionamiento de la aplicación

Mira cómo funciona la app en este video (click en la imagen):

[![Demo en video](https://img.youtube.com/vi/Wojw2Cp-O8k/hqdefault.jpg)](https://www.youtube.com/watch?v=Wojw2Cp-O8k)


![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![AWS](https://img.shields.io/badge/AWS-S3-orange?logo=amazonaws)


# React + TypeScript + Vite

# "build": "tsc -b && vite build"

construye el proyecto de producción

tsc -b → Compila el código TypeScript en modo "build".
vite build → Construye la aplicación para producción usando Vite.

las variables de entorno de .env.production se incrustan durante el build en la aplicación

# "preview": "vite preview"

en el package.json se usa para previsualizar la versión generada (dist) tras un build de Vite.
