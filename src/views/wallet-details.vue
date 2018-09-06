<template lang="pug">
  v-container(fluid)
    v-layout(row, wrap)
      v-flex(xs12)
        h1 {{selectedWalletName || walletName}}

    v-layout(row, wrap)
      v-flex(xs12)
        v-text-field(box, full-width, :value='recipientsPublicKeyValue', :label="$t('general.recipientsPublicKey')")

    v-layout(row, wrap)
      v-flex(xs12)
        v-text-field(box, full-width, :value='amountOfDotsToSendValue', :label="$t('general.amountOfDotsToSend')")

    v-layout(row, wrap)
      v-flex(xs12)
        v-text-field(box, full-width, :value='additionalDataOptionalValue', :label="$t('general.additionalDataOptional')")

    v-layout(row, wrap)
      v-flex.px-1(xs6)
        v-btn(block, color="success", dark, large, @click="sendWalletDetails") {{ $t( 'general.send' ) }}
      v-flex.px-1(xs6)
        v-btn(block, color="secondary", dark, large, @click="backToWalletList") {{ $t( 'general.cancel' ) }}
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'walletDetails',
    data () {
      return {
        walletName: 'Wallet name',
        recipientsPublicKeyValue: '',
        amountOfDotsToSendValue: '',
        additionalDataOptionalValue: ''
      }
    },
    computed: {
      ...mapGetters(['appViews', 'selectedWalletName'])
    },
    methods: {
      ...mapActions(['setActiveComponent']),
      sendWalletDetails () {
        // set the next component: appViews[4] => walletDetailsConfirm
        this.setActiveComponent('walletDetailsConfirm')
      },
      backToWalletList () {
        // set the next component: appViews[3] => walletList
        this.setActiveComponent('walletList')
      }
    }
  }
</script>
