<template>
  <ion-page :class="['main-page', currentMode]">
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>Mis documentos</ion-title>
        <div slot="end" class="mode-selector-container">
          <button 
            v-for="mode in modes" 
            :key="mode.id"
            :class="['mode-chip', { 'active': currentMode === mode.id }]"
            @click="currentMode = mode.id"
          >
            <ion-icon :icon="mode.icon"></ion-icon>
            <span>{{ mode.label }}</span>
          </button>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen>
      <div class="hero-card">
        <div class="hero-content">
          <h2>Organiza y accede</h2>
          <p>Tus archivos siempre listos y seguros con ReadVix.</p>
        </div>
      </div>

      <div class="search-area">
        <ion-searchbar placeholder="Buscar documento" class="custom-search"></ion-searchbar>
      </div>

      <div class="list-controls">
        <span class="list-title">Documentos recientes</span>
        <ion-button fill="clear" class="view-toggle" @click="isGridView = !isGridView">
          <ion-icon slot="start" :icon="isGridView ? listOutline : gridOutline"></ion-icon>
          {{ isGridView ? 'Ver lista' : 'Agrandar vista' }}
        </ion-button>
      </div>

      <div :class="['doc-container', isGridView ? 'grid-layout' : 'list-layout']">
        <div v-for="doc in documents" :key="doc.id" class="doc-item" @click="openDocument(doc)">
          <div class="doc-icon-box">
             <ion-icon :icon="documentTextOutline" class="file-icon"></ion-icon>
          </div>
          <div class="doc-info">
            <h2>{{ doc.title }}</h2>
            <p>{{ doc.subtitle }}</p>
          </div>
          <ion-icon v-if="!isGridView" :icon="chevronForwardOutline" class="arrow-icon"></ion-icon>
        </div>
      </div>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button class="main-fab" @click="addDocument">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, 
  IonSearchbar, IonButton, IonFab, IonFabButton 
} from '@ionic/vue'
import { 
  add, sunnyOutline, bookOutline, moonOutline, 
  gridOutline, listOutline, documentTextOutline, chevronForwardOutline 
} from 'ionicons/icons'
import { useRouter } from 'vue-router'

const router = useRouter()

// Estados de Interfaz
const currentMode = ref('mode-normal')
const isGridView = ref(false)

// Configuración de Modos
const modes = [
  { id: 'mode-normal', label: 'Día', icon: sunnyOutline },
  { id: 'mode-reading', label: 'Lectura', icon: bookOutline },
  { id: 'mode-dark', label: 'Noche', icon: moonOutline }
]

// Datos Mock
const documents = ref([
  { id: 1, title: 'Contrato de servicio.docx', subtitle: 'Actualizado hace 2 horas' },
  { id: 2, title: 'Resumen financiero.pdf', subtitle: 'Revisado recientemente' },
  { id: 3, title: 'Presentación_Proyecto.pptx', subtitle: 'Ayer' },
])

const addDocument = () => {
  documents.value.push({ 
    id: Date.now(), 
    title: `Nuevo Archivo ${documents.value.length + 1}`, 
    subtitle: 'Creado ahora' 
  })
}

const openDocument = (doc: any) => {
  console.log('Abriendo:', doc.title)
  router.push('/document')
}
</script>

<style scoped>
/* --- VARIABLES DE TEMAS --- */
.mode-normal { --bg-app: #f8fafc; --text-main: #1e293b; --card-bg: #ffffff; --accent: #3182ce; }
.mode-reading { --bg-app: #f4ecd8; --text-main: #5b4636; --card-bg: #fdfaf3; --accent: #8b4513; }
.mode-dark { --bg-app: #0f172a; --text-main: #f8fafc; --card-bg: #1e293b; --accent: #63b3ed; }

.main-page {
  --background: var(--bg-app);
  transition: background 0.3s ease;
}

/* --- SELECTOR DE MODOS (CHIPS) --- */
.mode-selector-container {
  display: flex;
  gap: 8px;
  padding-right: 12px;
}

.mode-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--text-main);
  font-size: 0.75rem;
  font-weight: 700;
}

.mode-chip.active {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* --- HERO CARD --- */
.hero-card {
  margin: 16px;
  padding: 24px;
  border-radius: 28px;
  background: linear-gradient(135deg, #3182ce 0%, #63b3ed 100%);
  color: white;
  box-shadow: 0 15px 30px rgba(49, 130, 206, 0.2);
}

.hero-card h2 { margin: 0; font-size: 1.6rem; font-weight: 800; }
.hero-card p { margin: 8px 0 0; opacity: 0.9; font-size: 1rem; }

/* --- CONTROLES DE LISTA --- */
.list-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
}

.list-title { font-weight: 800; color: var(--text-main); font-size: 1.1rem; }
.view-toggle { --color: var(--accent); font-weight: 700; font-size: 0.9rem; }

/* --- CONTENEDOR DE DOCUMENTOS --- */
.doc-container { padding: 8px 16px 80px; }

/* VISTA LISTA (Normal) */
.list-layout .doc-item {
  display: flex;
  align-items: center;
  background: var(--card-bg);
  margin-bottom: 12px;
  padding: 14px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
}

/* VISTA GRID (Accesibilidad / Grande) */
.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}
.grid-layout .doc-item {
  display: flex;
  flex-direction: column;
  background: var(--card-bg);
  padding: 24px;
  border-radius: 24px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

/* ICONOS */
.doc-icon-box {
  background: rgba(49, 130, 206, 0.1);
  padding: 10px;
  border-radius: 14px;
  margin-right: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.grid-layout .doc-icon-box { margin: 0 0 16px 0; padding: 25px; border-radius: 20px; }
.file-icon { font-size: 24px; color: var(--accent); }
.grid-layout .file-icon { font-size: 44px; }

.doc-info h2 { margin: 0; font-size: 1rem; font-weight: 700; color: var(--text-main); }
.doc-info p { margin: 4px 0 0; font-size: 0.85rem; opacity: 0.6; color: var(--text-main); }
.arrow-icon { color: #a0aec0; margin-left: auto; }

/* FAB */
.main-fab { --background: #3182ce; --color: white; }

/* RESPONSIVE */
@media (max-width: 450px) {
  .mode-chip span { display: none; }
  .mode-chip { padding: 8px; }
}
</style>