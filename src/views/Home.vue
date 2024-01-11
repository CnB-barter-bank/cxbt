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
          <ion-col size="auto">
            <ion-card
              v-if="account.connected && !disabled"
              style="min-height: 300px"
              class="sizeMd"
            >
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
                        {{ formatValue(coinAmount) }} CXBT
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
                  <ion-row class="ion-align-items-center"
                    ><ion-col size="12">
                      <ion-input
                        :disabled="!token.rate"
                        :value="offeredTokens"
                        @ionInput="buyTokens"
                        style="
                          border: 1px solid gray;
                          border-radius: 4px;
                          padding: 0 8px !important;
                          flex-direction: row-reverse;
                        "
                      >
                        <ion-icon
                          v-if="token.currency == 'usd'"
                          slot="start"
                          :icon="logoUsd"
                          aria-hidden="true"
                        ></ion-icon>
                        <ion-icon
                          v-if="token.currency == 'euro'"
                          slot="start"
                          :icon="logoEuro"
                          aria-hidden="true"
                        ></ion-icon>
                        <ion-icon
                          v-if="token.currency == 'main'"
                          slot="start"
                          :icon="logoBitcoin"
                          aria-hidden="true"
                        ></ion-icon>
                        <ion-button
                          @click="setMaxAmount"
                          fill="clear"
                          slot="end"
                          aria-label="Max"
                          >Max: {{ tokenAmount }}</ion-button
                        >
                      </ion-input>
                    </ion-col>
                  </ion-row>
                  <ion-row class="ion-justify-content-center">
                    <ion-col size="1">
                      <ion-icon
                        :icon="arrowDownCircleOutline"
                        style="width: 64px; height: 64px"
                      ></ion-icon> </ion-col
                  ></ion-row>
                  <ion-row>
                    <ion-col size="12">
                      <ion-label>Tokens to buy</ion-label>
                      <ion-input
                        :disabled="!token.rate"
                        :value="gainedTokens"
                        @ionInput="takeTokens"
                        style="
                          border: 1px solid gray;
                          border-radius: 4px;
                          padding: 0 8px !important;
                        "
                      >
                      </ion-input
                    ></ion-col>
                  </ion-row>
                  <ion-row>
                    <ion-col size="12">
                      <ion-label>Bonus tokens</ion-label>
                      <ion-input
                        :disabled="true"
                        :value="bonusTokens"
                        style="
                          border: 1px solid gray;
                          border-radius: 4px;
                          padding: 0 8px !important;
                        "
                      >
                      </ion-input
                    ></ion-col>
                  </ion-row>
                  <ion-row>
                    <ion-col size="12"
                      ><ion-button
                        @click="purchcase"
                        expand="block"
                        :disabled="purchcaseDisabled"
                        >Purchcase</ion-button
                      >
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </ion-card-content>
            </ion-card>
            <ion-card
              v-if="!account.connected && !disabled"
              style="min-height: 300px"
            >
              <ion-card-header>
                <ion-card-title>Buy CXBT tokens</ion-card-title>
              </ion-card-header>
              <ion-card-content style="min-height: 200px; padding-top: 90px">
                To purchase CXBT tokens you need to connect your wallet.
              </ion-card-content>
              <ion-button expand="block" @click="connect">Connect</ion-button>
            </ion-card>
            <ion-card v-if="disabled" style="min-height: 300px">
              <ion-card-header>
                <ion-card-title>Buy CXBT tokens</ion-card-title>
              </ion-card-header>
              <ion-card-content style="min-height: 200px; padding-top: 90px">
                <p>
                  Due to holidays, we are technically unable to do our token
                  sale automatically. But you can contact with us 24 hours to
                  write to us or to order a return call; Naturally, as always
                  for all last years, with great attention and personal
                  bonuses.<br />
                  You can contact us using the following details:<br />
                  Email:
                  <a href="mailto:support@clearingandbarterhouse.eu"
                    >support@clearingandbarterhouse.eu</a
                  ><br />
                  Telegram:
                  <a href="https://t.me/ClearingAndBarterHouse" target="_blank"
                    >@ClearingAndBarterHouse</a
                  ><br />
                  Or fill this form to receive a free call
                </p>

                <ion-list :inset="true">
                  <ion-item>
                    <ion-input
                      v-model="name"
                      label="Your name"
                      placeholder="Enter your name"
                    ></ion-input>
                  </ion-item>

                  <ion-item>
                    <ion-input
                      v-model="phone"
                      label="Phone or nickname"
                      placeholder="Enter your phone or nickname"
                    ></ion-input>
                  </ion-item>
                  <ion-item lines="none">
                    <ion-segment v-model="service">
                      <ion-segment-button value="call">
                        <ion-label>Direct call</ion-label>
                      </ion-segment-button>
                      <ion-segment-button value="whatsapp">
                        <ion-label>Whatsapp</ion-label>
                      </ion-segment-button>
                      <ion-segment-button value="viber">
                        <ion-label>Viber</ion-label>
                      </ion-segment-button>
                      <ion-segment-button value="telegram">
                        <ion-label>Telegram</ion-label>
                      </ion-segment-button>
                    </ion-segment></ion-item
                  >
                  <ion-item lines="none">
                    <ion-button @click="contactMe" expand="block" size="default"
                      >Request a free call</ion-button
                    >
                  </ion-item>
                </ion-list>
              </ion-card-content>
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
  IonLabel,
  IonList,
  IonItem,
  IonRadioGroup,
  IonRadio,
  IonSegmentButton,
  IonSegment,
  toastController,
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
  multicall,
  Chain,
  useFetchBalance,
  erc20ABI,
  writeContract,
  readContract,
} from '@kolirt/vue-web3-auth'
import {
  arrowDownCircleOutline,
  logoUsd,
  logoEuro,
  logoBitcoin,
  mic,
  mailUnread,
} from 'ionicons/icons'
import { onMounted, ref, watch } from 'vue'
import {
  tokens as tokensByNetworks,
  EthAddressType,
  TokenDataType,
  chainLinkABI,
  div10bn,
  mul10bn
} from '../utils/blockchain'
import { abi as purchaseABI } from '../../artifacts/contracts/management/CXBTokenPurchase.sol/CXBTokenPurchase.json'
import { abi as tokenABI } from '../../artifacts/contracts/tokens/CXBToken.sol/CXBToken.json'
import { ZeroAddress, ethers } from 'ethers'

const disabled = ref(false)
const name = ref('')
const phone = ref('')
const service = ref('call')
const chains = getAvailableChains()
const mainStore = useMainStore()
const switchingTo = {} as any
const purchcaseDisabled = ref(true)
const offeredTokens = ref('0')
const gainedTokens = ref('0')
const bonusTokens = ref('0')
let coinToken: EthAddressType

const token = ref({} as TokenDataType)

const coinAmount = ref('')
const tokenAmount = ref('')

const contactMe = async () => {
  if (phone.value == '' || name.value == '') {
    const toast = await toastController.create({
      message: 'Empty fields!',
      duration: 1500,
      position: 'top',
      color: 'danger',
    })

    await toast.present()
    return
  }
  const response = await fetch(
    'https://cxbt-services.miniapp.workers.dev/api/email',
    {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service: service.value,
        phone: service.value == 'telegram' ? '@' + phone.value : phone.value,
        name: name.value,
      }),
    }
  )
  const toast = await toastController.create({
    message: "Thank you, we'll certainly get in contact with you",
    duration: 1500,
    position: 'top',
    color: 'success',
  })

  await toast.present()
}

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
  return await fetchBalance({
    address: account.address!,
    token,
  })
}

const getNativeRate = async (): Promise<Number> => {
  const decimals = Number(
    await readContract({
      address: token.value.address as EthAddressType,
      abi: chainLinkABI,
      functionName: 'decimals',
      args: [],
    })
  )
  const amount = (await readContract({
    address: token.value.address as EthAddressType,
    abi: chainLinkABI,
    functionName: 'latestAnswer',
    args: [],
  })) as any as bigint
  const shifted = div10bn(amount, decimals)
  return shifted
}

const getNativeBalance = async () => {
  return await fetchBalance({
    address: account.address!,
  })
}

const computeGained = async () => {
  if (token.value.rate == undefined) {
    gainedTokens.value = '0'
    bonusTokens.value = '0'
    return
  }
  const rate =
    token.value.currency == 'main' ? await getNativeRate() : token.value.rate
  const val = Number(offeredTokens.value) * Number(rate)
  gainedTokens.value = formatValue(val.toString())
  bonusTokens.value = formatValue((val * 0.2).toString())
}

const buyTokens = async (ev: any) => {
  offeredTokens.value = formatValue(
    ev.target!.value.replace(/[^0-9\.]+/g, ''),
    false
  )
  purchcaseDisabled.value = !Number(offeredTokens.value)
  await computeGained()
}

const takeTokens = async (ev: any) => {
  gainedTokens.value = formatValue(
    ev.target!.value.replace(/[^0-9\.]+/g, ''),
    false
  )
  if (token.value.rate == undefined) {
    gainedTokens.value = '0'
    bonusTokens.value = '0'
    return
  }
  const rate =
    token.value.currency == 'main' ? await getNativeRate() : token.value.rate

  bonusTokens.value = formatValue((Number(gainedTokens.value) * 0.2).toString())
  offeredTokens.value = formatValue(
    (Number(gainedTokens.value) / Number(rate)).toString()
  )
  purchcaseDisabled.value = !Number(offeredTokens.value)
}

const formatValue = (raw: string, trim = true) => {
  let [m, l] = raw.split('.', 2)
  while (m.length > 1 && m[0] == '0') m = m.substring(1)
  if (!l) return m
  if (trim) l = l.substring(0, 4)
  while (l.length > 0 && l.substring(l.length - 1) == '0')
    l = l.substring(0, l.length - 1)
  return `${m}.${l}`
}

const populateBalances = async () => {
  coinToken = getCoin(chain.value.id)
  coinAmount.value = (await getMyBalance(coinToken)).formatted
  if (!!token.value.address) {
    tokenAmount.value =
      token.value.currency == 'main'
        ? formatValue((await getNativeBalance()).formatted)
        : formatValue(
            (await getMyBalance(token.value.address as any)).formatted
          )
    computeGained()
  } else {
    tokenAmount.value = '0'
  }
}

const refreshTokens = async () => {
  await populateBalances()
  setTimeout(refreshTokens, 15000)
}

const tokens = ref([] as TokenDataType[])

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
/* 
const getManager = (chainId: number): EthAddressType => {
  const found = tokensByNetworks.find((item) => item.chainId == chainId)
  if (!found) return '0x0'
  return found.manager! as EthAddressType
}
 */

const getPurchase = (chainId: number): EthAddressType => {
  const found = tokensByNetworks.find((item) => item.chainId == chainId)
  if (!found) return '0x0'
  return found.purchase! as EthAddressType
}

const setMaxAmount = (ev: any) => {
  offeredTokens.value = tokenAmount.value
  computeGained()
}

watch(chain, async (newChain) => {
  tokens.value = getTokens(newChain.id)
  coinToken = getCoin(newChain.id)
  token.value = {} as TokenDataType
})

const changeToken = async (newToken: TokenDataType) => {
  token.value = newToken
  purchcaseDisabled.value = !Number(offeredTokens.value)
  await populateBalances()
}

const changeNetwork = async (chainId: number) => {
  if (!switchingTo[chainId]) {
    purchcaseDisabled.value = true
    switchingTo[chainId] = true
    const newChain = chains.find((item) => item.id == chainId)
    if (!newChain) throw new Error(`Cannot switch to unknown chain ${chainId}`)
    await switchChain(newChain).finally(async () => {
      switchingTo[chainId] = false
      await populateBalances()
    })
  }
}


const purchcase = async () => {
  try {
    purchcaseDisabled.value = true
    const decimals = await readContract({
      address: token.value.address as EthAddressType,
      abi: erc20ABI,
      functionName: 'decimals',
      args: [],
    })
    if (token.value.currency == 'main') {
      const value = ethers.parseEther(offeredTokens.value)
    /*   console.log(
        decimals,
        decimals,
        'amount',
        await readContract({
          address: getPurchase(chain.value.id) as EthAddressType,
          abi: purchaseABI,
          functionName: 'calculateAmount',
          args: [ZeroAddress, value],
        })
      )
      console.log(
        'address',
        getPurchase(chain.value.id),
        await readContract({
          address: token.value.address as EthAddressType,
          abi: erc20ABI,
          functionName: 'balanceOf',
          args: [getPurchase(chain.value.id) as EthAddressType],
        })
      ) */
      await writeContract({
        abi: purchaseABI,
        address: getPurchase(chain.value.id) as EthAddressType,
        functionName: 'deposit',
        value,
      }).then(async (tx) => await tx.wait())
      return
    }
    const fractions = mul10bn(offeredTokens.value, Number(decimals))

    console.log(
        'fractions',
        fractions,
        'amount',
        await readContract({
          address: getPurchase(chain.value.id) as EthAddressType,
          abi: purchaseABI,
          functionName: 'calculateAmount',
          args: [token.value.address, fractions],
        })
      )
    await writeContract({
      abi: erc20ABI,
      address: token.value.address as EthAddressType,
      functionName: 'approve',
      args: [getPurchase(chain.value.id), fractions],
    }).then(async (tx) => await tx.wait())
    await writeContract({
      abi: purchaseABI,
      address: getPurchase(chain.value.id) as EthAddressType,
      functionName: 'buy',
      args: [account.address!, token.value.address, fractions, ZeroAddress],
    }).then(async (tx) => await tx.wait())
  } finally {
    purchcaseDisabled.value = false
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
