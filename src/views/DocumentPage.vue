<template>
  <ion-page :class="['reader-page', currentFontMode, currentMode]">
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="goBack">
            <ion-icon slot="icon-only" :icon="chevronBack"></ion-icon>
          </ion-button>
        </ion-buttons>
        
        <ion-title>Lectura</ion-title>

        <div slot="end" class="mode-selector-container">
          <button 
            v-for="mode in modes" 
            :key="mode.id"
            :class="['mode-chip', { 'active': currentMode === mode.id }]"
            @click="currentMode = mode.id"
          >
            <ion-icon :icon="mode.icon"></ion-icon>
          </button>
        </div>
      </ion-toolbar>
    </ion-header>

    <div 
      v-if="showSelectionMenu" 
      class="selection-audio-btn" 
      :style="{ top: menuY + 'px', left: menuX + 'px' }"
      @mousedown.prevent="readSelection"
    >
      <ion-icon :icon="volumeHighOutline"></ion-icon>
    </div>

    <div class="click-zones">
      <div class="zone left" @click="prevPage"></div>
      <div class="zone right" @click="nextPage"></div>
    </div>

    <ion-content class="ion-padding reader-content" @mouseup="handleSelection">
      <div class="book-container">
        <div :class="['page-content', currentFontMode]" :style="{ fontSize: fontSize + 'px' }">
          <h1 class="doc-title">{{ currentPageContent.title }}</h1>
          <div class="text-body" v-html="currentPageContent.text"></div>
        </div>
      </div>

      <div class="page-footer">
        <p>Página {{ currentPage + 1 }} de {{ pages.length }} — {{ pages.length - (currentPage + 1) }} restantes</p>
      </div>
    </ion-content>

    <ion-footer class="ion-no-border reader-footer">
      <ion-toolbar>
        <div class="reader-controls">
          <button class="control-btn" @click="toggleFont">
            <ion-icon :icon="textOutline"></ion-icon>
            <span>{{ currentFontName }}</span>
          </button>

          <div class="size-controls">
            <button @click="changeFontSize(-2)"><ion-icon :icon="removeOutline"></ion-icon></button>
            <span class="size-label">A<sup>A</sup></span>
            <button @click="changeFontSize(2)"><ion-icon :icon="addOutline"></ion-icon></button>
          </div>

          <button class="control-btn" @click="playFullAudio">
            <ion-icon :icon="volumeMediumOutline"></ion-icon>
            <span>AUDIO</span>
          </button>
        </div>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButtons, IonButton, IonFooter, IonIcon 
} from '@ionic/vue'
import { 
  chevronBack, textOutline, addOutline, removeOutline, 
  volumeMediumOutline, volumeHighOutline, sunnyOutline, bookOutline, moonOutline
} from 'ionicons/icons'

const router = useRouter()
const currentPage = ref(0)
const fontSize = ref(20)
const currentMode = ref('mode-normal')

// --- MODOS DE LECTURA ---
const modes = [
  { id: 'mode-normal', icon: sunnyOutline },
  { id: 'mode-reading', icon: bookOutline },
  { id: 'mode-dark', icon: moonOutline }
]

// --- LÓGICA DE SUBRAYADO Y AUDIO FLOTANTE ---
const showSelectionMenu = ref(false)
const menuX = ref(0)
const menuY = ref(0)
const selectedText = ref('')

const handleSelection = () => {
  const selection = window.getSelection()
  const text = selection?.toString().trim()

  if (text && text.length > 0) {
    const range = selection?.getRangeAt(0)
    const rect = range?.getBoundingClientRect()

    if (rect) {
      selectedText.value = text
      menuX.value = rect.left + (rect.width / 2) - 22
      menuY.value = rect.top + window.scrollY - 55 
      showSelectionMenu.value = true
    }
  } else {
    showSelectionMenu.value = false
  }
}

const readSelection = () => {
  console.log('Reproduciendo audio del subrayado:', selectedText.value)
  showSelectionMenu.value = false
  window.getSelection()?.removeAllRanges()
}

// --- NAVEGACIÓN Y CONTENIDO ---
const goBack = () => router.push('/main')

const pages = ref([
  {
    title: 'Cláusula Primera: Objeto del Servicio',
    text: `<p>El presente contrato de prestación de servicios tecnológicos tiene como objeto principal la implementación, mantenimiento y soporte de la infraestructura de gestión documental denominada "ReadVix". Esta plataforma permite la centralización de archivos en la nube, garantizando que el usuario pueda acceder a su información desde cualquier dispositivo con conexión a internet.</p>
           <p>ReadVix se compromete a entregar una disponibilidad del servicio del 99.9%, asegurando que las interrupciones por mantenimiento sean debidamente notificadas con al menos 48 horas de antelación. El software incluye herramientas de indexación inteligente que facilitan la búsqueda de términos específicos dentro de documentos PDF y Word, utilizando algoritmos de procesamiento de lenguaje natural de última generación.</p>
           <p>Además, el sistema permite la colaboración en tiempo real, donde múltiples usuarios autorizados pueden revisar y anotar documentos simultáneamente, manteniendo un control de versiones estricto para evitar la pérdida de datos críticos durante el proceso de edición.</p>`
  },
  {
    title: 'Cláusula Segunda: Privacidad y Datos',
    text: `<p>La seguridad de la información es el pilar fundamental de ReadVix. Todos los archivos cargados en la plataforma son cifrados mediante el estándar AES-256 en reposo y TLS 1.3 durante la transmisión. ReadVix no tiene acceso al contenido de los archivos de los usuarios, ya que las llaves de cifrado son gestionadas de forma privada por el cliente.</p>
           <p>En cumplimiento con las normativas internacionales de protección de datos, como el RGPD, el usuario tiene el derecho inalienable de exportar toda su información en cualquier momento y solicitar la eliminación definitiva de sus registros de nuestros servidores. No compartimos información con terceros con fines publicitarios ni realizamos minería de datos sobre el contenido documental.</p>
           <p>El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso y de habilitar la autenticación de dos factores (2FA) proporcionada por la plataforma para maximizar la protección de su cuenta contra accesos no autorizados.</p>`
  }
])

const currentPageContent = computed(() => pages.value[currentPage.value])

const nextPage = () => { if (currentPage.value < pages.value.length - 1) currentPage.value++ }
const prevPage = () => { if (currentPage.value > 0) currentPage.value-- }

// --- CONFIGURACIÓN DE FUENTES ---
const fontOptions = [
  { id: 'font-serif', name: 'SERIF' },
  { id: 'font-sans', name: 'SANS' },
  { id: 'font-mono', name: 'MONO' },
  { id: 'font-dyslexic', name: 'OPEN D' },
  { id: 'font-playfair', name: 'ELEGANT' }
]
const fontIndex = ref(0)
const currentFontMode = computed(() => fontOptions[fontIndex.value].id)
const currentFontName = computed(() => fontOptions[fontIndex.value].name)

const toggleFont = () => { fontIndex.value = (fontIndex.value + 1) % fontOptions.length }
const changeFontSize = (delta: number) => {
  const newSize = fontSize.value + delta
  if (newSize >= 14 && newSize <= 36) fontSize.value = newSize
}
const playFullAudio = () => console.log('Iniciando lectura completa...')
</script>

<style scoped>
/* --- TEMAS DE COLOR (ELIMINAMOS BLANCOS FIJOS) --- */
.mode-normal { 
  --bg-reader: #ffffff; 
  --text-reader: #1a202c; 
  --accent-reader: #3182ce;
}
.mode-reading { 
  --bg-reader: #f4ecd8; 
  --text-reader: #5b4636; 
  --accent-reader: #8b4513;
}
.mode-dark { 
  --bg-reader: #1a202c; 
  --text-reader: #e2e8f0; 
  --accent-reader: #63b3ed;
}

/* --- APLICACIÓN GLOBAL DEL TEMA --- */
.reader-page {
  --background: var(--bg-reader);
  background: var(--bg-reader);
  color: var(--text-reader);
  transition: all 0.3s ease;
}

/* Forzamos a Ionic a que no pinte fondos blancos */
ion-content, ion-toolbar, ion-footer, .reader-footer {
  --background: var(--bg-reader);
  --color: var(--text-reader);
  background: var(--bg-reader);
}

/* El contenedor del texto DEBE ser transparente para ver el fondo del modo */
.book-container, .page-content {
  background: transparent !important;
}

.doc-title, .text-body {
  color: var(--text-reader) !important;
}

/* --- TIPOGRAFÍAS --- */
.font-serif { font-family: 'Lora', Georgia, serif; }
.font-sans { font-family: 'Inter', sans-serif; }
.font-mono { font-family: 'JetBrains Mono', monospace; }
.font-dyslexic { font-family: 'OpenDyslexic', sans-serif; }
.font-playfair { font-family: 'Playfair Display', serif; }

/* --- ICONO SELECCIÓN --- */
.selection-audio-btn {
  position: fixed;
  z-index: 2000;
  background: var(--accent-reader);
  color: white;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  cursor: pointer;
}

/* --- SELECTOR DE MODOS (CHIPS) --- */
.mode-selector-container { display: flex; gap: 8px; padding-right: 12px; }
.mode-chip {
  width: 34px; height: 34px; border-radius: 50%; 
  border: 1px solid rgba(0,0,0,0.1);
  background: rgba(0,0,0,0.05); 
  color: var(--text-reader); 
  display: flex; align-items: center; justify-content: center;
}
.mode-chip.active { 
  background: var(--accent-reader); 
  color: white; 
  border-color: var(--accent-reader); 
}

/* --- ZONAS DE NAVEGACIÓN --- */
.click-zones {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  z-index: 5; display: flex; pointer-events: none;
}
.zone { width: 20%; height: 100%; pointer-events: auto; cursor: pointer; }

.book-container { max-width: 700px; margin: 0 auto; padding-top: 20px; }
.text-body { 
  line-height: 1.8; 
  text-align: justify; 
  user-select: text !important; 
  -webkit-user-select: text !important;
}

.page-footer { 
  text-align: center; 
  margin-top: 40px; 
  border-top: 1px solid rgba(0,0,0,0.1); 
  padding: 16px; 
  color: var(--text-reader);
  opacity: 0.6;
}

.reader-footer { border-top: 1px solid rgba(0,0,0,0.1); }
.reader-controls { display: flex; justify-content: space-between; align-items: center; padding: 12px 24px; }

.control-btn { background: transparent; border: none; display: flex; flex-direction: column; align-items: center; color: var(--text-reader); }
.control-btn span { font-size: 0.7rem; font-weight: 800; margin-top: 4px; }

.size-controls { 
  display: flex; 
  align-items: center; 
  background: rgba(0,0,0,0.08); 
  padding: 8px 18px; 
  border-radius: 30px; 
  gap: 20px; 
}
.size-controls button { background: transparent; border: none; font-size: 22px; color: var(--accent-reader); }
</style>