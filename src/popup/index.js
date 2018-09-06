import '../assets/sass/speckle.styl'

import Vue from 'vue'
import App from './root.vue'

import store from '../store'

import i18n from '../plugins/i18n/i18n'

import VAnimateCss from 'v-animate-css'
import VueClipboard from 'vue-clipboard2'

import {
  Vuetify,
  VApp,
  VForm,
  VBtn,
  VCombobox,
  VMenu,
  VList,
  VSelect,
  VIcon,
  VGrid,
  VDivider,
  VTextField,
  VTooltip,
  VTabs,
  transitions
} from 'vuetify'

Vue.use(Vuetify, {
  components: {
    VApp,
    VForm,
    VBtn,
    VCombobox,
    VMenu,
    VList,
    VSelect,
    VIcon,
    VGrid,
    VDivider,
    VTextField,
    VTooltip,
    VTabs,
    transitions
  },
  theme: {
    primary: '#3b2082',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.use(VAnimateCss)
Vue.use(VueClipboard)

Vue.config.productionTip = false

/* eslint-disable no-new */
const root = new Vue(Vue.util.extend({store, i18n}, App))

document.addEventListener('DOMContentLoaded', () => root.$mount('#app'))
