<template>
  <ion-page class="document-page">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/main"></ion-back-button>
        </ion-buttons>
        <ion-title>Documento</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen>
      <div class="document-hero">
        <div>
          <h1>Lectura clara y cómoda</h1>
          <p>Controla el tamaño de texto y el estilo para una experiencia más agradable.</p>
        </div>
      </div>

      <ion-card class="document-card">
        <ion-card-content :style="contentStyle">
          <p>Este es un ejemplo de contenido de documento. Aquí puedes leer el texto con un estilo más cómodo y moderno.</p>
          <p>Destaca las partes importantes para escucharlas o continuar la lectura más tarde.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </ion-card-content>
      </ion-card>
    </ion-content>

    <ion-footer>
      <ion-toolbar class="footer-toolbar">
        <ion-buttons slot="start">
          <ion-button fill="clear" @click="toggleFont">
            <ion-icon :icon="text"></ion-icon>
            Font
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="primary">
          <ion-button fill="clear" @click="changeSize">
            <ion-icon :icon="resize"></ion-icon>
            Tamaño
          </ion-button>
          <ion-button fill="clear" @click="playSound">
            <ion-icon :icon="volumeHigh"></ion-icon>
            Audio
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonBackButton, IonFooter, IonCard, IonCardContent } from '@ionic/vue'
import { text, resize, volumeHigh } from 'ionicons/icons'

const fontType = ref('Inter, sans-serif')
const fontSize = ref('medium')

const contentStyle = computed(() => ({
  fontFamily: fontType.value,
  fontSize: fontSize.value === 'small' ? '15px' : fontSize.value === 'large' ? '20px' : '17px',
  color: '#1f2937',
  lineHeight: '1.8'
}))

const toggleFont = () => {
  fontType.value = fontType.value.includes('sans-serif') ? 'Georgia, serif' : 'Inter, sans-serif'
}

const changeSize = () => {
  if (fontSize.value === 'small') fontSize.value = 'medium'
  else if (fontSize.value === 'medium') fontSize.value = 'large'
  else fontSize.value = 'small'
}

const playSound = () => {
  alert('Reproduciendo audio para el texto resaltado (demo)')
}
</script>

<style scoped>
.document-page {
  --background: #eef4ff;
}

.document-hero {
  margin: 16px;
  padding: 20px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(79, 70, 229, 0.95));
  color: #ffffff;
  box-shadow: 0 24px 36px rgba(59, 130, 246, 0.2);
}

.document-hero h1 {
  margin: 0 0 8px;
  font-size: 1.75rem;
  font-weight: 700;
}

.document-hero p {
  margin: 0;
  opacity: 0.92;
}

.document-card {
  margin: 0 16px 20px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.1);
}

ion-card-content {
  background: #ffffff;
  padding: 24px;
}

.footer-toolbar {
  --background: #ffffff;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
}

ion-button {
  --color: #334dff;
  font-weight: 600;
}

ion-icon {
  margin-right: 6px;
}
</style>