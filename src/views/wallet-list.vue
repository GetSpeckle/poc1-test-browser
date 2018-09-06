<template lang="pug">
  v-container(fluid)
    v-layout(row, wrap)
      v-flex(xs6)
        v-btn.ma-0.grey.lighten-3(depressed)
          | {{ $t('general.options') }}

      v-flex(xs6, text-xs-right)
        v-menu(offset-y)
          v-btn(slot='activator', fab, depressed, dark, small, color='amber')
            v-icon(large, color="white") perm_identity
          v-list
            v-list-tile(v-model="walletName", v-for="(item, index) in walletsList", :key="index", @click="selectWallet(item)")
              v-list-tile-title {{item}}
            v-list-tile(@click="createNewWallet")
              v-list-tile-title
                | $t('general.createNewWallet')

    v-layout(row, wrap, align-center, justify-center, fill-height)
      v-flex(xs10)
        v-text-field.readony-value(outline, full-width, readonly, v-model='string')
      v-flex(xs2, text-xs-right)
        v-tooltip(left)
          v-btn(slot='activator', fab, depressed, dark, small, color='accent')
            v-icon(v-clipboard:copy="string", v-clipboard:success="clipboardOnCopy", v-clipboard:error="clipboardOnError") file_copy
          span {{copyText}}

    v-layout(row, wrap)
      v-flex(xs6)
        h2.pt-2
          span.balance-value {{ balanceValue }}
          span.dots-unit &nbsp;{{ $t('general.dots') }}
      v-flex(xs6 text-xs-right)
        v-menu(offset-y)
          v-btn(slot='activator', icon)
            v-icon more_vert
          v-list
            v-list-tile(@click="send")
              v-list-tile-title {{ $t('general.send') }}
            v-list-tile(@click="stake")
              v-list-tile-title {{ $t('general.stake') }}

    v-divider

    v-layout(row, wrap)
      v-flex(xs12)
        h2.py-3 {{ $t('general.transactionHistory') }} {{ nonce }}} transactions

    v-layout(row, wrap)
      v-flex(xs12)
        v-tabs(slot='extension', v-model='tab', slider-color='yellow')
          v-tab(href='#tab-transactions', @click="filterTransactionHistoryArray('')")
            | {{$t('general.transactions')}}
          v-tab(href='#tab-sent', @click="filterTransactionHistoryArray('Send')")
            | {{$t('general.sent')}}
          v-tab(href='#tab-recieved', @click="filterTransactionHistoryArray('Receive')")
            | {{$t('general.recieved')}}
          v-tab(href='#tab-staked', @click="filterTransactionHistoryArray('Stake')")
            | {{$t('general.staked')}}
        v-tabs-items(v-model='tab')
          v-tab-item(v-for="tab in tabsNames", :key="tab", :id='tab', transition="fade", reverse-transition="fade", lazy)
            v-layout(row, wrap)
              v-flex(xs11, offset-xs1, v-for="(i, idx) in filteredTransactionHistoryArray", :key="idx", :class="i.action.toLowerCase() + '-dot'")
                v-layout.py-2(row, wrap)
                  v-flex.text-elipsis(xs11)
                    | {{i.name}}
                    | {{i.action}}:
                    | {{ $t('general.publicKey') }}
                    | {{i.pubKey}}
                  v-flex(xs1, text-xs-right)
                    | {{i.balance}}
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import Accounts from '../ext/Accounts'

  const allTransactions = [
    {name: '[Date]', action: 'Send', pubKey: 'a9535e7775fc53100a0d11377b909d101f7ba9601ba41abf491f1beaabc647c338b12ee67d7193a2', balance: 10},
    {name: '[Date]', action: 'Stake', pubKey: 'a9535e7775fc53100a0d11377b909d101f7ba9601ba41abf491f1beaabc647c338b12ee67d7193a2', balance: 5},
    {name: '[Date]', action: 'Receive', pubKey: 'a9535e7775fc53100a0d11377b909d101f7ba9601ba41abf491f1beaabc647c338b12ee67d7193a2', balance: 1}
  ]

  export default {
    name: 'walletList',
    data () {
      return {
        tab: 'sent',
        tabsNames: ['tab-transactions', 'tab-sent', 'tab-recieved', 'tab-staked'],
        // defaults to alll transactions tab
        tabFilterCriteria: '',
        walletName: '',
        nameOfTheAccountValue: '',
        items: ['old account', 'older'],
        string: 'a9535e7775fc53100a0d11377b909d101f7ba9601ba41abf491f1beaabc647c338b12ee67d7193a2',
        copyText: 'Copy',
        balanceValue: Accounts.accountBalance('5G3b7oFWV7v8zNWh4hfkPecC5NZxv8cFCYGpfruSS3uzp2hZ'),
        transactionHistoryArray: allTransactions,
        filteredTransactionHistoryArray: allTransactions,
        nonce: Accounts.accountTxCount('5G3b7oFWV7v8zNWh4hfkPecC5NZxv8cFCYGpfruSS3uzp2hZ')
      }
    },
    mounted () {
      const accounts = Accounts.listAccounts()
      console.log(accounts[0])
      console.log(accounts[0].address())
      console.log(`Meta data is`)
      console.log(`${JSON.stringify(accounts[0].getMeta())}`)
      // store.commit('mutateAccounts', Accounts.listAccounts())
    },
    computed: {
      ...mapGetters(['appViews', 'walletsList'])
    },
    methods: {
      ...mapActions(['setActiveComponent']),
      ...mapMutations(['mutateSelectedWalletName']),
      clipboardOnCopy () {
        this.copyText = 'Copied'
        setTimeout(() => { this.copyText = 'Copy' }, 2e3)
      },
      clipboardOnError () {
        this.copyText = `Couldn't copy`
      },
      selectWallet (wallet) {
        this.mutateSelectedWalletName(wallet)
        this.setActiveComponent('walletDetails')
      },
      createNewWallet () {
        if (this.walletName === 'Create New Wallet') {
          this.setActiveComponent('createNewWallet')
        }
      },
      filterTransactionHistoryArray (criteria) {
        this.tabFilterCriteria = criteria
        this.filteredTransactionHistoryArray = []
        setTimeout(() => {
          this.filteredTransactionHistoryArray = this.tabFilterCriteria !== '' ? this.transactionHistoryArray.filter(item => item.action === this.tabFilterCriteria) : this.transactionHistoryArray
        }, 500)
      },
      send () {
        // set the next component: appViews[4] => walletDetails
        this.setActiveComponent('walletDetails')
      },
      stake () {
        // set the next component: appViews[6] => stakingPage
        this.setActiveComponent('stakingPage')
      }
    }
  }
</script>
