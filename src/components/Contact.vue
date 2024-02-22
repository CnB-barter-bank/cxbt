<template>
    <ion-card style="min-height: 300px">
              <ion-card-header>
                <ion-card-title>Contact us</ion-card-title>
              </ion-card-header>
              <ion-card-content style="min-height: 200px; padding-top: 90px">
                <p>
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
</template>

<script lang="ts" setup>
import { 
  IonButton, 
  IonCard,
  IonCardContent,
  IonCardHeader, 
  IonCardTitle, 
  IonInput,
  IonLabel,
  IonList,
  IonItem, 
  IonSegmentButton,
  IonSegment,
  toastController,
} from '@ionic/vue'   
import {  ref  } from 'vue' 
const name = ref('')
const phone = ref('')
const service = ref('call')
 
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
  
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
