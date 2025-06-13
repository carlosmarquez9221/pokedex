# Pokémon Vue App

Una aplicación moderna de Pokémon construida con Vue 3, TypeScript y Vuetify, siguiendo principios de diseño atómico y arquitectura limpia.

## Tecnologías Principales

- **Vue 3** - Framework progresivo de JavaScript para construir interfaces de usuario
- **TypeScript** - Tipado estático para mejorar la calidad del código y la experiencia de desarrollo
- **Vuetify 3** - Biblioteca de componentes Material Design para Vue
- **Pinia** - Gestor de estado oficial para Vue
- **Vue Router** - Enrutamiento oficial para aplicaciones Vue
- **Vue i18n** - Internacionalización
- **Axios** - Cliente HTTP para consumir APIs
- **Sass/SCSS** - Preprocesador CSS con metodología BEM
- **Vitest** - Framework de pruebas unitarias
- **ESLint** - Linter para mantener la calidad del código
- **Animate.css** - Para animaciones fluidas

## Arquitectura y Estructura

### Patrones de Diseño
- **Atomic Design**: Componentes organizados en átomos, moléculas, organismos, plantillas y páginas
- **Composition API**: Para una mejor organización y reutilización de la lógica
- **Patrón Store (Pinia)**: Para la gestión del estado global
- **Inyección de Dependencias**: Para un mejor acoplamiento entre componentes

### Estructura de Carpetas
```
src/
├── assets/          # Recursos estáticos (imágenes, fuentes, etc.)
├── components/      # Componentes reutilizables
│   ├── atoms/      # Componentes atómicos (botones, inputs, etc.)
│   ├── molecules/  # Componentes moleculares (combinación de átomos)
│   └── organisms/  # Componentes complejos (combinación de moléculas)
├── composables/    # Lógica reutilizable (hooks personalizados)
├── locales/        # Archivos de internacionalización
├── router/         # Configuración de rutas
├── services/       # Servicios API y lógica de negocio
├── stores/         # Stores de Pinia
├── styles/         # Estilos globales y tokens de diseño
├── types/          # Tipos de TypeScript
└── views/          # Vistas/páginas de la aplicación
```

## Guía de Estilos

### Metodología BEM
```scss
.block {
  &__element {}
  &--modifier {}
}
```

### Breakpoints
- `xs`: 0px - 599px
- `sm`: 600px - 959px
- `md`: 960px - 1263px
- `lg`: 1264px - 1903px
- `xl`: 1904px en adelante

### Tokens de Diseño
- Colores primarios, secundarios y de estado
- Espaciado y tipografía consistente
- Sombras y bordes estandarizados

## Gestión de Estado con Pinia

### Estructura del Store
```typescript
// stores/pokemon.ts
export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemonList: [],
    isLoading: false,
    isModalOpen: false,
    selectedPokemon: null
  }),

  actions: {
    async fetchPokemons() { /* ... */ },
    openModal(pokemon) { /* ... */ },
    closeModal() { /* ... */ }
  }
});
```

### ¿Por qué usar el store para el estado del modal y loading?
1. **Estado Global**: El estado del modal y el loading puede ser necesario en múltiples componentes.
2. **Sincronización**: Garantiza que todos los componentes vean el mismo estado.
3. **Mantenibilidad**: Centraliza la lógica relacionada con estos estados.
4. **Prevención de Props Drilling**: Evita pasar props a través de múltiples niveles de componentes.

## Optimizaciones de Rendimiento

### Lazy Loading
- Carga perezosa de rutas
- Componentes dinámicos con `defineAsyncComponent`
- Imágenes optimizadas con WebP y atributos `srcset`

### Optimización de Imágenes
```vue
<picture>
  <source
    :srcset="`/images/pokemon/${id}.webp`"
    type="image/webp"
  >
  <img
    :src="`/images/pokemon/${id}.png`"
    :alt="`${name} sprite`"
    loading="lazy"
  >
</picture>
```

## Testing

### Estrategia de Pruebas
- **Unit Tests**: Pruebas de componentes con Vitest y Vue Test Utils
- **Mocks**: Simulación de llamadas API
- **Test Coverage**: Cobertura de código superior al 80%

## Responsive Design
- Enfoque Mobile-First
- Grid System de Vuetify
- Imágenes y tipografía responsivas
- Menú de navegación adaptable

## Internacionalización
- Soporte para múltiples idiomas
- Archivos de traducción organizados por módulo
- Cambio dinámico de idioma

## Scripts Disponibles

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar pruebas unitarias
npm run test:unit

# Linter
npm run lint
```

## Despliegue

La aplicación está configurada para desplegarse en cualquier servicio de hosting estático como:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## Oportunidades de Mejora

### Componentes
- **PokemonList**: Implementar virtual scrolling para listas largas
- **PokemonCard**: Mejorar accesibilidad con ARIA labels
- **PokemonModal**: Añadir transiciones más suaves
- **SearchBar**: Añadir debounce para búsquedas

### Estado Global
- Implementar persistencia del estado
- Mejorar manejo de errores
- Añadir caché para peticiones API

### Rendimiento
- Implementar Service Workers para modo offline
- Añadir skeleton loaders
- Optimizar bundle size con code splitting

### Testing
- Añadir pruebas de integración
- Implementar pruebas E2E con Cypress
- Aumentar cobertura de pruebas

## ¿Por qué no usar componibles?

Los **componibles** son funciones reutilizables que utilizan la Composition API de Vue para encapsular y reutilizar lógica con estado. Aunque son poderosos, en este proyecto opté por:

1. **Simplicidad**: Para mantener el código más directo y fácil de seguir
2. **Alcance del Proyecto**: La aplicación es lo suficientemente pequeña como para no necesitar extraer lógica compleja
3. **Familiaridad**: Para desarrolladores que puedan estar más familiarizados con la Options API

Sin embargo, en proyectos más grandes o con lógica más compleja, los componibles serían una excelente opción para extraer y reutilizar lógica entre componentes.
