<template lang="pug">
  v-app(:class="[{'is-login-view' : isLoginView}, camelToKebab(activeComponent)]")
    v-content
      app-header
      element-proxy(:type="activeComponent", :props="props")
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import elementProxy from '../components/dynamic/element-proxy.vue'
  import appHeader from '../components/layout/app-header.vue'
  import api from '../ext/Api'

  export default {
    name: 'App',
    components: {appHeader, elementProxy},
    created () {
      const registeredUser = localStorage.getItem('walletUserRegistered', true)
      // if we're on newUser view and the user is registered, goto login
      if (this.activeComponent === 'newUser' && registeredUser) {
        // set the next component: appViews[2] => returningUser
        this.setActiveComponent('returningUser')
      }
      api.initialise()
      console.log(this.api)
    },
    updated () {
      // determine whether login view is active based on activeComponent state
      this.mutateIsLoginView(this.activeComponent === 'newUser' || this.activeComponent === 'returningUser')
    },
    data () {
      return {
        // can be programmatically filled with data
        props: {}
      }
    },
    computed: {
      ...mapGetters(['isLoginView', 'activeComponent', 'api'])
    },
    methods: {
      ...mapMutations(['mutateIsLoginView']),
      ...mapActions(['setActiveComponent']),
      camelToKebab (str) {
        return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
      }
    }
  }
</script>
