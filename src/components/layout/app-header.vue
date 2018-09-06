<template lang='pug'>
  v-layout.logo-wrapper.grey.lighten-3(row, wrap, text-xs-center)
    v-flex(xs10, offset-xs1)
      h1.logo-title.error--text(:class="{'py-5': isLoginView, 'py-2': !isLoginView}") {{ $t( 'general.speckleOS' ) }}

    div#cog
      v-menu(offset-y, dark)
        v-btn.grey.lighten-1(slot='activator', fab, depressed, dark, small)
          v-icon(color="white") settings
        v-list
          v-list-tile(@click="")
            v-list-tile-title
              | setting
          v-list-tile(@click="")
            v-list-tile-title
              | another setting
          v-list-tile(@click="")
            v-list-tile-title
              | and a setting
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'app-header',
    computed: {
      ...mapGetters(['appViews', 'newUser', 'isLoginView'])
    }
  }
</script>
