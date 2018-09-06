<template lang="pug">
  v-container(fluid)
    v-layout(row)
      v-flex(xs12)
        v-form(ref='form', lazy-validation)
          // password field
          v-container
            v-layout(row)
              v-flex(xs8)
                v-text-field(v-model='password',
                :rules='passwordRules',
                :append-icon="passwordHidden ? 'visibility' : 'visibility_off'",
                @click:append='() => passwordHidden = !passwordHidden',
                :type="passwordHidden ? 'password' : 'text'",
                :label="$t('general.enterNewPassword')",
                :hint="$t('general.passwordHint')", min='8', required, counter)

              v-flex(xs3, text-xs-center)
                v-btn(color="success", dark, large, :disabled='!valid', @click="loginUser") {{ $t( 'general.login' ) }}

          // the links below the form: register and forgot pass
          v-layout(row)
            v-flex(xs12, text-xs-center)
              a.restore-account.pt-5.d-block(@click="restoreAccountFromOldSeedPhrase") {{ $t('general.restoreAccountFromOldSeedPhrase') }}
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {passwordRules} from '../utils/form-fields-validation-rules'

  export default {
    name: 'userReturning',
    data () {
      return {
        // form
        valid: true,
        // password
        password: '',
        passwordRules: [],
        passwordHidden: true
      }
    },
    computed: {
      ...mapGetters(['appViews'])
    },
    methods: {
      ...mapActions(['setActiveComponent']),
      loginUser () {
        // set the next component: appViews[2] => createNewWallet
        this.setActiveComponent('createNewWallet')
      },
      restoreAccountFromOldSeedPhrase () {
        console.log('Restore account from old seed phrase')
      }
    },
    watch: {
      password: {
        handler () {
          this.passwordRules = passwordRules(this.password, null)
        },
        deep: true
      }
    }
  }
</script>
