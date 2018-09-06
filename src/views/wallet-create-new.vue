<template lang="pug">
  v-container(fluid)
    v-layout.pb-4(row, wrap)
      v-flex(xs12)
        h2 {{ $t('general.createNewWallet') }}

    v-layout(row, wrap, justify-center, fill-height)
      v-flex(xs10)
        v-text-field.readony-value(outline, full-width, readonly, v-model='generatedFromSeed')
      v-flex.pt-3(xs2, text-xs-right)
        v-tooltip(left)
          v-btn(slot='activator', fab, depressed, dark, small, color='accent')
            v-icon(v-clipboard:copy="generatedFromSeed", v-clipboard:success="clipboardOnCopy", v-clipboard:error="clipboardOnError") file_copy
          span {{copyText}}

    v-layout(row, wrap)
      v-flex(xs12)
        v-text-field(box, full-width, v-model='seedValue', :rules="[rules.required, rules.counter, rules.hex]", :label="$t('general.createFromFollowingSeed')")

    v-layout(row, wrap)
      v-flex(xs12)
        v-text-field(box, full-width, v-model='nameOfTheAccountValue', :label="$t('general.walletName')")

    v-layout(row, wrap)
      v-flex(xs12)
        v-btn(block, color="success", dark, large, @click="saveNewKeyPair") {{ $t( 'general.saveNewKeyPair' ) }}
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import Keygen from '../ext/Keygen'
  import Accounts from '../ext/Accounts'

  export default {
    name: 'walletCreateNew',
    data () {
      const seed = Keygen.randomSeed()
      const shortPubKey = Keygen.shortenStr(Keygen.addressFromSeed(seed), 16)

      return {
        generatedFromSeed: shortPubKey,
        seedValue: seed,
        rules: {
          required: value => !!value || this.$t('validation.required'),
          counter: value => value.length === 66 || this.$t('validation.length66'),
          hex: value => Keygen.isSeedValid(value) || this.$t('validation.hexa')
        },
        nameOfTheAccountValue: '',
        copyText: this.$t('general.copy')
      }
    },
    computed: {
      ...mapGetters(['appViews', 'walletsList'])
    },
    watch: {
      seedValue () {
        this.generatedFromSeed = Keygen.shortenStr(Keygen.addressFromSeed(this.seedValue), 16)
      }
    },
    methods: {
      ...mapActions(['setActiveComponent']),
      clipboardOnCopy () {
        this.copyText = this.$t('general.copied')
        setTimeout(() => { this.copyText = this.$t('general.copy') }, 2e3)
      },
      clipboardOnError () {
        this.copyText = this.$t('general.failedCopying')
      },
      saveNewKeyPair () {
        const acctName = this.nameOfTheAccountValue
        // save account
        Accounts.saveAccount(this.seedValue, 'secret123', acctName)
        // set the next component: appViews[3] => walletList
        this.setActiveComponent('walletList')
      }
    }
  }
</script>
