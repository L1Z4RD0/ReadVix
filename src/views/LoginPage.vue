<template>
  <ion-page class="login-page">
    <ion-content class="ion-no-padding">
      <div class="login-hero">
        <div>
          <h1>Bienvenido</h1>
          <p>Accede rápido y seguro a tus documentos.</p>
        </div>
      </div>

      <div class="login-card-wrapper">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Iniciar sesión</ion-card-title>
            <ion-card-subtitle>Ingresa tus credenciales para continuar</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <ion-item>
              <ion-label position="floating">Usuario</ion-label>
              <ion-input v-model="username" type="text"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="floating">Contraseña</ion-label>
              <ion-input v-model="password" type="password"></ion-input>
            </ion-item>

            <ion-button expand="block" class="login-button" @click="login">Entrar</ion-button>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonInput, IonItem, IonLabel, IonPage } from '@ionic/vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')

const login = () => {
  if (username.value && password.value) {
    router.push('/main')
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #334dff 0%, #5a8dff 55%, #f4f8ff 100%);
}

.login-hero {
  padding: 40px 24px 16px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: #ffffff;
}

.login-hero h1 {
  margin: 0 0 12px;
  font-size: 2.4rem;
  font-weight: 700;
}

.login-hero p {
  margin: 0;
  font-size: 1rem;
  opacity: 0.9;
}

.login-card-wrapper {
  padding: 0 20px 28px;
}

ion-card {
  border-radius: 24px;
  box-shadow: 0 24px 40px rgba(15, 23, 42, 0.12);
  overflow: hidden;
}

ion-card-title {
  font-size: 1.4rem;
  font-weight: 700;
}

ion-card-subtitle {
  color: #64748b;
  font-size: 0.95rem;
}

ion-item {
  margin-top: 14px;
  --background: #f8fafc;
  border-radius: 14px;
  padding-left: 14px;
}

.login-button {
  margin-top: 24px;
  --background: #334dff;
  --color: #ffffff;
  border-radius: 14px;
}
</style>