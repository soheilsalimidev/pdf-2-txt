import colors from 'vuetify/es5/util/colors'

module.exports = {
  head: {
    titleTemplate: '%s - تبدیل pdf به ورد',
    title: 'pdf2txt',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'تدبیل pdf به word'
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },
  css: [
    '~/assets/css/fontiran.scss',
    '~/assets/css/style.scss',
    '~/node_modules/magic.css/dist/magic.css'
  ],
  plugins: [],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify'
  ],

  modules: [
    '@nuxtjs/axios'
  ],

  serverMiddleware: [
    {
      path: '/api',
      handler: '~/server/index.ts'
    }
  ],

  axios: {
    baseURL: '/api'
  },

  server: {
    port: 3000
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  build: {}
}
