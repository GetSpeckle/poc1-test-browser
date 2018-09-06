<script>
  import newUser from '../../views/user-new.vue'
  import returningUser from '../../views/user-returning.vue'
  import createNewWallet from '../../views/wallet-create-new.vue'
  import walletList from '../../views/wallet-list.vue'
  import walletDetails from '../../views/wallet-details.vue'
  import walletDetailsConfirm from '../../views/wallet-details-confirm.vue'
  import stakingPage from '../../views/staking-page.vue'
  import stakingPageConfirm from '../../views/staking-page-confirm.vue'

  export default {
    components: {
      newUser,
      returningUser,
      createNewWallet,
      walletList,
      walletDetails,
      walletDetailsConfirm,
      stakingPage,
      stakingPageConfirm
    },
    props: {
      type: {
        type: String,
        required: true
      },
      props: {
        type: Object,
        default: () => ({})
      }
    },
    render (createElement) {
      const {props: attrs} = this
      return createElement(this.type, {attrs})
    }
  }
</script>
