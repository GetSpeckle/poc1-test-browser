<template lang="pug">
  v-container(fluid)
    v-layout(row, wrap)
      v-flex(xs12)
        h1 {{walletName}}

    v-layout(row, wrap)
      v-flex(xs12)
        h3 {{$t('general.enterTheKeyOfTheValidatorOrSelectFromListBelow')}}
      v-flex(xs12)
        v-text-field(box, full-width, :value='recipientsPublicKeyValue', :label="$t('general.recipientsPublicKey')")

      v-flex(xs12)
        v-text-field(box, full-width, :value='amountOfDotsToStakeValue', :label="$t('general.amountOfDotsToStake')")

    v-layout(row, wrap)
      v-flex.px-1(xs6)
        v-btn(block, color="success", dark, large, @click="stake") {{ $t( 'general.stake' ) }}
      v-flex.px-1(xs6)
        v-btn(block, color="secondary", dark, large, @click="cancelStake") {{ $t( 'general.cancel' ) }}

    hr.my-3
    v-layout(row, wrap)
      v-flex(xs12)
        h3.py-2 {{$t('general.stakes')}}
    v-layout(row, wrap)
      v-flex(xs12, v-for="(i, idx) in stakeList", :key="idx")
        v-layout.py-2(row, wrap)
          v-flex(xs3)
            | {{i.name}} {{i.action}}:
          v-flex(xs2)
            | {{ $t('general.publicKey') }}
          v-flex.text-elipsis(xs6)
            | {{i.pubKey}}
          v-flex(xs1, text-xs-right)
            | {{i.balance}}

    hr.my-3
    v-layout(row, wrap)
      v-flex(xs9)
        h3.py-3 {{$t('general.validators')}}
      v-flex(xs3)
        v-btn(block, @click="stake") {{ $t( 'general.stake' ) }}

    v-layout(row, wrap)
      v-flex(xs12, v-for="(i, idx) in stakeList", :key="idx")
        v-layout.py-2(row, wrap)
          v-flex(xs2)
            | {{i.name}}
          v-flex.text-elipsis(xs9)
            | {{i.pubKey}}
          v-flex(xs1, text-xs-right)
            | {{i.balance}}
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'stakingPage',
    data () {
      return {
        walletName: 'John Default wallet 1',
        recipientsPublicKeyValue: '',
        amountOfDotsToStakeValue: '',
        stakeList: [
          {name: 'Name', pubKey: '[Key: a9535e7775fc53100a0d11377b909d101f7ba9601ba41abf491f1beaabc647c338b12ee67d7193a2]', balance: 10},
          {name: 'Name', pubKey: '[Key: a9535e7775fc53100a0d11377b909d101f7ba9601ba41abf491f1beaabc647c338b12ee67d7193a2]', balance: 8},
          {name: 'Name', pubKey: '[Key: a9535e7775fc53100a0d11377b909d101f7ba9601ba41abf491f1beaabc647c338b12ee67d7193a2]', balance: 33}
        ]
      }
    },
    computed: {
      ...mapGetters(['appViews'])
    },
    methods: {
      ...mapActions(['setActiveComponent']),
      stake () {
        // set the next component: appViews[7] => stakingPageConfirm
        this.setActiveComponent('stakingPageConfirm')
      },
      cancelStake () {
        // set the next component: appViews[3] => walletList
        this.setActiveComponent('walletList')
      }
    }
  }
</script>
