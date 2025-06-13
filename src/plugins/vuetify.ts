// Vuetify
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Configuración de Vuetify
export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#C00E20',
          secondary: '#ECA539',
          tertiary: '#F22539',
          background: '#F9F9F9',
          surface: '#FFFFFF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
        },
      },
    },
  },
  defaults: {
    VBtn: {
      variant: 'flat',
      rounded: 'pill',
      minWidth: '131px',
      height: '44px',
      class: 'text-white',
    },
  },
});