<template>
  <ion-page>
    <ion-header>
      <ion-toolbar 
        ><ion-title>
          <ion-grid>
            <ion-row class="ion-justify-content-between ion-align-items-center">
              <ion-col size="auto">CXBToken presale</ion-col>
              <ion-col size="auto" style="text-align: right">
                <span v-if="account.connected"
                  >{{ chain.name }}: {{ account.shortAddress }}</span
                >
                <span v-else>Wallet is not connected </span></ion-col
              ><ion-col size="auto" v-if="account.connected"
                ><ion-button @click="disconnect">Disconnect</ion-button>
              </ion-col>
            </ion-row>
          </ion-grid></ion-title
        >
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col size="6">
            <ion-card v-if="account.connected" style="min-height: 300px">
              <ion-card-header>
                <ion-card-title>Buy CXBT tokens</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                <ion-grid>
                  <ion-row>
                    <ion-col size="12"
                      >You can buy CXBT tokens using stablecoins. We support
                      Ethereum, Polygon POS, Avalanche networks. You can view
                      the specific list by selecting the appropriate network and
                      switching your wallet to it.</ion-col
                    >
                  </ion-row>
                  <ion-row>
                    <ion-col size="12"
                      ><h1 style="text-align: center">
                        Your current balance is
                      </h1>
                      <p style="font-size: 48pt; text-align: center">
                        {{ coinAmount }} CXBT
                      </p>
                    </ion-col>
                  </ion-row>
                  <ion-row>
                    <ion-col size="6">
                      <ion-select
                        aria-label="Network"
                        interface="action-sheet"
                        placeholder="Select network"
                        :value="chain.id"
                        @ionChange="(ev:any) => changeNetwork(ev.detail.value)"
                      >
                        <ion-select-option
                          v-for="item in chains"
                          :key="item.id"
                          :value="item.id"
                          >{{ item.name }}</ion-select-option
                        >
                      </ion-select>
                    </ion-col>
                    <ion-col size="6"
                      ><ion-select
                        aria-label="Token"
                        interface="action-sheet"
                        placeholder="Select token"
                        :value="token"
                        @ionChange="(ev:any) => changeToken(ev.detail.value)"
                      >
                        <ion-select-option
                          v-for="item in tokens"
                          :key="item.name"
                          :value="item"
                          >{{ item.name }}</ion-select-option
                        >
                      </ion-select></ion-col
                    >
                  </ion-row>
                  <ion-row  class="ion-align-items-center"
                    ><ion-col size="6">
                      <ion-input
                        label-placement="stacked"
                        v-model="buyTokens"
                        style="border: 1px solid gray;border-radius: 4px; padding:0 8px !important"
                      >
                      </ion-input>
                    </ion-col>
                    <ion-col size="6">
                      <a @click="setMaxAmount">Max</a>:
                      {{ tokenAmount }}
                    </ion-col>
                  </ion-row>
                  <ion-row>
                    <ion-col size="12"
                      ><ion-button @click="purchcase" expand="block"
                        >Purchcase</ion-button
                      >
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </ion-card-content>
            </ion-card>
            <ion-card v-else style="min-height: 300px">
              <ion-card-header>
                <ion-card-title>Buy CXBT tokens</ion-card-title>
              </ion-card-header>
              <ion-card-content style="min-height: 200px; padding-top: 90px">
                To purchase CXBT tokens you need to connect your wallet.
              </ion-card-content>
              <ion-button expand="block" @click="connect">Connect</ion-button>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonContent,
  IonButton,
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonChip,
  IonText,
  IonIcon,
  IonCol,
  IonGrid,
  IonRow,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonSelect,
  IonSelectOption,
  IonInput,
} from '@ionic/vue'
import { useMainStore } from '../stores/main.store'
import {
  $off,
  $on,
  Events,
  account,
  accountDetails,
  chain,
  getAvailableChains,
  connect,
  disconnect,
  switchChain,
  selectChain,
  fetchBalance,
  Chain,
  useFetchBalance,
} from '@kolirt/vue-web3-auth'
import { removeOutline, addOutline } from 'ionicons/icons'
import { onMounted, ref, watch } from 'vue'
import { tokens as tokensByNetworks, EthAddressType } from '../utils/blockchain'
const chains = getAvailableChains()
const mainStore = useMainStore()
const switchingTo = {} as any
const buyTokens = ref('0')
let coinToken: EthAddressType // = '0x701b22e638Ec0dF950601609B977637b15Ab01ac' // '0x26522BDb9a943D06D38574679bAe99ad30B6B1E0'

type TokenRec = {
  name: string
  address: string
}

const token = ref({} as TokenRec)

const coinAmount = ref('')
const tokenAmount = ref('')

const initialize = async (): Promise<any> => {
  if (!account || !account.connected) {
    return setTimeout(initialize, 100)
  }
  coinToken = getCoin(chain.value.id)
  tokens.value = getTokens(chain.value.id)
  refreshTokens()
}

onMounted(() => {
  initialize()
})

const getMyBalance = async (token: EthAddressType) => {
  const out = await fetchBalance({
    address: account.address!,
    token,
  })
  return out
}

const populateBalances = async () => {
  coinToken = getCoin(chain.value.id)
  coinAmount.value = (await getMyBalance(coinToken)).formatted
  if (!!token.value.address) {
    tokenAmount.value = (
      await getMyBalance(token.value.address as any)
    ).formatted
  } else {
    tokenAmount.value = '0'
  }
}

const refreshTokens = async () => {
  await populateBalances()
  setTimeout(refreshTokens, 1000)
}

// Polygon 137
// Sepolia 11155111
// Eth 1
// Avalanche 43114
// BSC  56

const tokens = ref([] as TokenRec[])

const getTokens = (chainId: number) => {
  const found = tokensByNetworks.find((item) => item.chainId == chainId)
  if (!found) return []
  return found.tokens
}

const getCoin = (chainId: number): EthAddressType => {
  const found = tokensByNetworks.find((item) => item.chainId == chainId)
  if (!found) return '0x0'
  return found.coin! as EthAddressType
}

const setMaxAmount = (ev: any) => {
  buyTokens.value = tokenAmount.value
}

watch(chain, async (newChain) => {
  tokens.value = getTokens(newChain.id)
  coinToken = getCoin(newChain.id)
  token.value = {} as TokenRec
})

const changeToken = async (newToken: TokenRec) => {
  token.value = newToken
}

const changeNetwork = async (chainId: number) => {
  if (!switchingTo[chainId]) {
    switchingTo[chainId] = true
    const newChain = chains.find((item) => item.id == chainId)
    if (!newChain) throw new Error(`Cannot switch to unknown chain ${chainId}`)
    await switchChain(newChain).finally(async () => {
      switchingTo[chainId] = false
    })
  }
}

const purchcase = async () => {}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
ion-input.custom {
  --padding-bottom: 10px;
  --padding-end: 10px;
  --padding-start: 10px;
  --padding-top: 10px;
  --border-radius: 2px;
  --border-style: solid;
  --border-color: grey;
  --border-width: 1px;
  --color: red;
}
</style>
