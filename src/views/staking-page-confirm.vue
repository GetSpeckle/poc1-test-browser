<template lang="pug">
  div
    v-container(fluid, v-if='!processing')
      v-layout(row, wrap)
        v-flex(xs12)
          h1.my-4 {{walletName}}

      v-layout(row, wrap)
        v-flex.text-elipsis(xs12)
          div.px-1.py-2
            div {{ $t( 'general.stakeTo' ) }}:
            h3 {{ recipientsPublicKeyValue }}

        v-flex(xs12)
          div.px-1.py-2
            div {{ $t( 'general.amount' ) }}
              span.dots-unit &nbsp;({{ $t('general.dots') }}):
            h3
              span.balance-value {{ amountOfDotsToSendValue }}

        v-flex(xs12)
          div.px-1.py-2
            div {{ $t( 'general.additionalData' ) }}:
            h3 {{ additionalDataOptionalValue }}

      v-layout.mt-5(row, wrap)
        v-flex.px-1(xs6)
          v-btn(block, color="success", dark, large, @click="confirmStake") {{ $t( 'general.confirmStake' ) }}
        v-flex.px-1(xs6)
          v-btn(block, color="secondary", dark, large, @click="backToStakePage") {{ $t( 'general.cancel' ) }}

    v-container(fluid, v-else)
      v-layout(row, wrap, full-height)
        v-flex(xs12, text-xs-center, align-center)
          h3.my-5 {{ $t( 'general.processing' ) }}
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'stakingPageConfirm',
    data () {
      return {
        walletName: 'John Default wallet 1',
        recipientsPublicKeyValue: `recipient's public key - a9535e7775fc53100a0d`,
        amountOfDotsToSendValue: 200,
        additionalDataOptionalValue: 'None',
        processing: false
      }
    },
    computed: {
      ...mapGetters(['appViews'])
    },
    methods: {
      ...mapActions(['setActiveComponent']),
      confirmStake () {
        // show processing view
        this.processing = true

        setTimeout(() => {
          // hide processing view
          this.processing = false
          // set the next component: appViews[3] => walletList
          this.setActiveComponent('walletList')
        }, 2e3)
      },
      backToStakePage () {
        // set the next component: appViews[6] => stakingPage
        this.setActiveComponent('stakingPage')
      }
    }
  }
</script>
