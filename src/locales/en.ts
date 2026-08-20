export default {
  app: {
    title: "All Pokémon in one place",
    description: "Access a wide list of Pokémon from all generations created by Nintendo.",
  },
  pokemon: {
    name: "Name",
    height: "Height",
    weight: "Weight",
    types: "Types",
    share: "Share with my friends",
    copied: "Copied to clipboard!"
  },
  buttons: {
    search: "Search",
    getStarted: "Get Started",
    searchPlaceholder: "Search Pokémon",
    goBackHome: "Go back home"
  },
  viewToggle: {
    all: "All",
    favorites: "Favorites"
  },
  favorites: {
    emptyTitle: "You don't have any favorite Pokémon yet",
    emptyMessage: "Mark some Pokémon as favorites to see them here!"
  },
  noResults: {
    title: "Uh-oh!",
    message: "You look lost on your journey!"
  },
} as const;