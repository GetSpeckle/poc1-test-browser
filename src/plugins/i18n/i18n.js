import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en'

Vue.use(VueI18n)

// Usage
// in template: {{ $t(' general.ok ') }} OR :label="$t(' general.ok ')"
// in script: this.$t(' general.ok ')

const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en
  }
})

export default i18n
