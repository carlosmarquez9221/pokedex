# ⚡ Pokémon Vue App

Una aplicación web moderna, intuitiva y responsiva de Pokémon construida con **Vue 3**, **TypeScript**, **Pinia** y **Sass/SCSS**, siguiendo los principios de **Atomic Design** y **Clean Architecture**.

---

## 🧠 Arquitectura, Elecciones Tecnológicas y Decisiones de Diseño

### 🛠️ Resumen de Tecnologías y Por Qué las Elegimos

1. **Vue 3 (Composition API & `<script setup>`)**
   - **Elección:** Utilizado como framework principal de interfaz de usuario.
   - **Razón:** La Composition API permite una mejor organización de la lógica por funcionalidades, ofrece una inferencia de tipos perfecta con TypeScript y reduce el código repetitivo (*boilerplate*), mejorando el rendimiento de re-renderizado.

2. **TypeScript (Strict Type System)**
   - **Elección:** Tipado estático riguroso en toda la aplicación (`PokemonDetails`, `PokemonApiResponse`, etc.).
   - **Razón:** Elimina errores en tiempo de ejecución, garantiza contratos de datos claros entre la API, los Stores de Pinia y los componentes visuales, y facilita el mantenimiento y refactorización del código a medida que la Pokédex crece.

3. **Pinia (Setup Stores)**
   - **Elección:** Gestor de estado oficial de Vue utilizando la sintaxis de Setup Store (`defineStore('pokemon', () => { ... })`).
   - **Razón:** Centraliza el estado global (lista de Pokémon, Pokémon seleccionado, modal y favoritos) en un único punto. Evita el *props drilling* y sincroniza las vistas de forma inmediata.

4. **Sass / SCSS con Metodología BEM**
   - **Elección:** Preprocesador CSS con arquitectura de estilos modular.
   - **Razón:** Permite utilizar variables globales, mixins, mapas de tipos/colores de Pokémon y *nesting* ordenado, garantizando que los componentes sean visualmente atractivos, coherentes y altamente adaptables sin depender de frameworks CSS pesados.

5. **Vue i18n**
   - **Elección:** Sistema de internacionalización multi-idioma (Español / Inglés).
   - **Razón:** Separa las cadenas de texto del marcado HTML y habilita el cambio dinámico de idioma de forma fluida.

6. **Vitest & Vue Test Utils**
   - **Elección:** Suite de pruebas unitarias ultrarrápida ejecutada sobre Vite.
   - **Razón:** Facilita el *mocking* de servicios, stores e i18n, permitiendo validar componentes atómicos y lógica de negocio con ejecución instantánea.

---

## 📊 Pensando en Gran Cantidad de Datos (Estrategia de Escalabilidad)

Aunque una Pokédex sencilla maneja un lote inicial de datos, el diseño de esta solución fue concebido pensando en la **escalabilidad masiva** y el manejo eficiente de **miles de registros**:

### 1. Manejo Eficiente de Peticiones y Concurrencia
- **Peticiones en Paralelo (`Promise.all`):** Para cargar los detalles de múltiples Pokémon simultáneamente sin crear cuellos de botella secuenciales (*waterfall requests*).
- **Consolidación de Payload (`PokemonDetails`):** La respuesta de la API original de Pokémon contiene objetos extensos con datos redundantes. Transformamos esta información a un contrato plano y liviano (`PokemonDetails`), reduciendo significativamente la huella en memoria.

### 2. Estructura de Favoritos Optimizada ($O(1)$ Hash Map)
- En lugar de guardar copias completas de objetos Pokémon en `localStorage` o arreglos pesados, los favoritos se gestionan mediante una tabla hash / diccionario `Record<string, boolean>` (`{ "25": true, "6": true }`).
- **Ventaja:** Búsquedas, inserciones y eliminaciones en tiempo constante $O(1)$, reduciendo el consumo de memoria en disco de megabytes a solo unos pocos bytes.

### 3. Filtrado y Ordenamiento Reactivo en Memoria
- El filtrado por búsqueda (nombre o ID), tipo (Planta, Fuego, Agua, etc.) y ordenamiento se realiza mediante **propiedades computadas (`computed`)** sobre la lista en el Store. Esto evita mutar el estado original y previene solicitudes HTTP innecesarias al servidor cuando el usuario navega entre filtros.

### 4. Hoja de Ruta para Datasets Masivos (Futuras Mejoras de Performance)
Para escalar a la totalidad de la Pokédex (+1000 Pokémon y múltiples regiones):
- **Virtual Scrolling (`v-virtual-scroll` / `vue-virtual-scroller`):** Renderizar en el DOM únicamente los ítems visibles en el viewport (manteniendo el número de nodos DOM constante en $O(1)$).
- **Debounce en Búsqueda:** Aplicar un *debounce* de 300ms en el `SearchBar` para minimizar los re-cálculos de filtrado durante el tipeo rápido.
- **Caché en Memoria e IndexedDB:** Almacenar en caché local los Pokémon ya consultados para evitar peticiones repetidas a la API.

---

## 🎨 Arquitectura de Componentes (Atomic Design)

La interfaz se organiza bajo la metodología de **Atomic Design**:

```
src/
├── assets/          # Imágenes, íconos y assets globales
├── components/
│   ├── atoms/       # AppButton, AppCard, etc.
│   ├── molecules/   # PokemonGrid, PokemonFilter, SearchBar, PokemonModal, ViewToggle
│   └── organisms/   # PokemonCatalogContainer
├── locales/         # Diccionarios i18n (es.ts, en.ts)
├── services/        # Consumo de API (pokemon.api.ts) y Tipos (pokemon.d.ts)
├── stores/          # Store de Pinia (pokemon.store.ts)
├── styles/          # Variables SCSS, mixins y temas
├── tests/           # Pruebas unitarias con Vitest
└── views/           # Vistas principales (PokemonCatalogView.vue)
```

---

## ✨ Novedades y Mejoras Recientes

- **Tipado Robustecido:** Extensión de la interfaz `PokemonDetails` (`ability`, `category`, `description`, `genderRate`) corrigiendo errores de TypeScript por propiedades no conocidas.
- **Modal de Detalle (`PokemonModal`):**
  - Botón de retroceso/cierre con flecha (`fa-arrow-left`).
  - Botón de favorito interactivo con icono de corazón (`fa-solid fa-heart` / `fa-regular fa-heart`) y destacado en rojo brillante cuando está activo.
  - Sincronización directa del evento `@toggle-favorite` con el Store global de Pinia.
- **Cobertura de Pruebas Unitarias:** Pruebas unitarias de componentes y tiendas actualizadas y ejecutándose exitosamente con Vitest.

---

## 🚀 Comandos y Scripts Disponibles

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Ejecutar pruebas unitarias (Vitest)
npm test

# Compilar para producción (con verificación de tipos vue-tsc)
npm run build

# Vista previa de la compilación de producción
npm run preview
```
