<template>
  <ion-page class="main-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Mis documentos</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen>
      <div class="hero-card">
        <div>
          <h2>Organiza y accede a tus archivos</h2>
          <p>Encuentra rápidamente tus documentos recientes y crea nuevos con un solo toque.</p>
        </div>
      </div>

      <div class="search-area">
        <ion-searchbar placeholder="Buscar documento" show-clear-button="focus"></ion-searchbar>
      </div>

      <div class="list-title">
        <span>Documentos recientes</span>
      </div>

      <ion-list>
        <ion-item button v-for="doc in documents" :key="doc.id" @click="openDocument(doc)">
          <ion-label>
            <h2>{{ doc.title }}</h2>
            <p>{{ doc.subtitle }}</p>
          </ion-label>
          <ion-icon slot="end" :icon="add"></ion-icon>
        </ion-item>
      </ion-list>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="addDocument">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonSearchbar } from '@ionic/vue'
import { add } from 'ionicons/icons'
import { useRouter } from 'vue-router'

const router = useRouter()

const documents = ref([
  { id: 1, title: 'Contrato de servicio.docx', subtitle: 'Actualizado hace 2 horas' },
  { id: 2, title: 'Resumen financiero.pdf', subtitle: 'Revisado recientemente' },
])

const addDocument = () => {
  documents.value.push({ id: documents.value.length + 1, title: `Nuevo documento ${documents.value.length + 1}`, subtitle: 'Documento agregado recientemente' })
}

const openDocument = (_doc: any) => {
  router.push('/document')
}
</script>

<style scoped>
.main-page {
  --background: #f5f7ff;
}

.hero-card {
  margin: 16px;
  padding: 22px;
  border-radius: 24px;
  background: linear-gradient(135deg, #4f7dff 0%, #7bafff 100%);
  color: #ffffff;
  box-shadow: 0 24px 50px rgba(79, 125, 255, 0.18);
}

.hero-card h2 {
  margin: 0 0 10px;
  font-size: 1.65rem;
  font-weight: 700;
}

.hero-card p {
  margin: 0;
  opacity: 0.92;
  line-height: 1.5;
}

.search-area {
  margin: 0 16px 8px;
}

ion-searchbar {
  --border-radius: 18px;
  --background: #ffffff;
  --box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08);
}

.list-title {
  margin: 16px 16px 8px;
  font-weight: 600;
  color: #334155;
}

ion-item {
  margin: 8px 16px;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.06);
}

ion-item h2 {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
}

ion-item p {
  margin: 4px 0 0;
  color: #64748b;
  font-size: 0.92rem;
}

ion-icon {
  color: #334dff;
}
</style>