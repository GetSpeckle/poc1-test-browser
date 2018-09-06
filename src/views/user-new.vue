<template lang="pug">
  v-container(fluid)
    v-layout(row)
      v-flex(xs12)
        v-form(ref='form', lazy-validation)
          // password field
          v-container
            v-layout(row)
              v-flex(xs12)
                v-text-field(v-model='password',
                  :rules='passwordRules',
                  :append-icon="passwordHidden ? 'visibility' : 'visibility_off'",
                  @click:append='() => passwordHidden = !passwordHidden',
                  :type="passwordHidden ? 'password' : 'text'",
                  :label="$t('general.enterNewPassword')",
                  :hint="$t('general.passwordHint')", min='8', required, counter)

          // password confirmation field
          v-container
            v-layout(row)
              v-flex(xs12)
                v-text-field(v-model='password2',
                  :rules='password2Rules',
                  :append-icon="passwordHidden ? 'visibility' : 'visibility_off'",
                  @click:append='() => password2Hidden = !password2Hidden',
                  :type="password2Hidden ? 'password' : 'text'",
                  :label="$t('general.repeatNewPassword')",
                  :hint="$t('general.passwordHint')", min='8', required, counter)

          // submit
          v-container
            v-layout(row)
              v-flex(xs12, text-xs-center)
                v-btn(color="success", dark, large, @click="createNewUser") {{ $t( 'general.create' ) }}

          // the links below the form: register and forgot pass
          v-layout(row)
            v-flex(xs12, text-xs-center)
              a.restore-account.pt-3.d-block(@click="restoreAccountFromOldSeedPhrase") {{ $t('general.restoreAccountFromOldSeedPhrase') }}
</template>

<script>
  import {mapActions, mapMutations} from 'vuex'
  import passwordFieldMatchingValidation from '../mixins/password-field-matching-validation.mixin'

  export default {
    name: 'userNew',
    mixins: [passwordFieldMatchingValidation],
    data () {
      return {
        password: '',
        password2: '',
        passwordRules: [],
        password2Rules: [],
        passwordHidden: true,
        password2Hidden: true
      }
    },
    methods: {
      ...mapActions(['setActiveComponent']),
      ...mapMutations(['mutateNewUser']),
      createNewUser () {
        // set the next component: appViews[2] => createNewWallet
        this.setActiveComponent('createNewWallet')
        // this is now longer a new user
        this.mutateNewUser(false)
        // better persistence with localstorage
        localStorage.setItem('walletUserRegistered', true)
      },
      restoreAccountFromOldSeedPhrase () {
        console.log(this.$t('general.restoreAccountFromOldSeedPhrase'))
      }
    }
  }
</script>
