export default {
  app: {
    continue: {
      title: "Todos los Pokémon en un solo lugar",
      description: "Accede a una amplia lista de Pokémon de todas las generaciones creadas por Nintendo",
      button: "Continuar"
    },
    start: {
      title: "Mantén tu Pokédex actualizada",
      description: "Registrate y guarda tu perfil, Pokémon favoritos, configuraciones y mucho más en la aplicación",
      button: "Empecemos"
    }
  },
  pokemon: {
    name: "Nombre",
    height: "Altura",
    weight: "Peso",
    types: "Tipos",
    share: "Compartir con mis amigos",
    copied: "¡Copiado al portapapeles!",
    category: "Categoría",
    weaknesses: "Debilidades",
    ability: "Habilidad",
  },
  buttons: {
    search: "Buscar",
    getStarted: "Empezar",
    searchPlaceholder: "Buscar Pokémon",
    goBackHome: "Volver al inicio"
  },
  viewToggle: {
    all: "Todos",
    favorites: "Favoritos"
  },
  favorites: {
    emptyTitle: "No has marcado ningún Pokémon como favorito",
    emptyMessage: "Haz click en el ícono de corazón de tus Pokémon favoritos y aparecerán aquí"
  },
  noResults: {
    title: "¡Ups!",
    message: "¡Parece que te has perdido en tu viaje!"
  },
  nav: {
    pokedex: "Pokédex",
    regions: "Regiones",
    favorites: "Favoritos",
    profile: "Perfil"
  },
  error: {
    title: "Algo salió mal...",
    description: "No pudimos cargar la información en este momento. Verifica tu conexión o intenta nuevamente más tarde.",
    button: "Reintentar"
  },
  regions: {
    emptyTitle: "¡Muy pronto disponible!",
    emptyMessage: "Estamos trabajando para traerte esta sección. Vuelve más adelanta para descubrir todas las novedades."
  }
} as const;