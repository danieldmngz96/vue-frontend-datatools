# PokéApp - Prueba Técnica Frontend

## 🧩 Descripción

PokéApp es una aplicación desarrollada con Vue 3 y Vite que consume la [PokéAPI](https://pokeapi.co/) para listar Pokémon y mostrar detalles individuales. Su diseño es simple, responsivo y enfocado en la claridad visual, utilizando buenas prácticas de desarrollo frontend como la separación de componentes, manejo de rutas, consumo de APIs externas y control de errores.

---

## 🌐 Demo en producción

Puedes ver la app funcionando en Vercel aquí:  
👉 [https://vue-frontend-datatools.vercel.app/](https://vue-frontend-datatools.vercel.app/)

---

## 🚀 Instalación y ejecución local

```bash
# Clonar el repositorio
git clone https://github.com/danieldmngz96/vue-frontend-datatools.git
cd vue-frontend-datatools

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
├── src
│   ├── assets         # Archivos estáticos como imágenes o estilos globales
│   ├── components     # Componentes reutilizables (como tarjetas)
│   ├── views          # Vistas asociadas a rutas (Lista y Detalle)
│   ├── router         # Configuración de rutas con vue-router
│   ├── App.vue        # Componente raíz
│   └── main.js        # Punto de entrada principal
graph TD
  A[Inicio] --> B[Listado de Pokémon]
  B --> C[Click en tarjeta]
  C --> D[Detalle del Pokémon]
