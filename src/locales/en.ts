export default {
  app: {
    title: "Welcome to Pokédex",
    description: "The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.",
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