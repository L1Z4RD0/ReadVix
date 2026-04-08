<template>
  <ion-page class="login-page">
    <ion-content class="ion-no-padding">
      <div class="main-wrapper">
        <div class="login-container">
          <div class="brand-section">
            <div class="logo-box">
              <img src="../img/ReadVixPNG.png" alt="ReadVix Logo" class="brand-logo" />
            </div>
            <h1>ReadVix</h1>
            <p>Accede a tus documentos en segundos</p>
          </div>

          <div class="form-section">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Iniciar sesión</ion-card-title>
                <ion-card-subtitle>Ingresa tus credenciales</ion-card-subtitle>
              </ion-card-header>

              <ion-card-content>
                <ion-item lines="none" class="custom-input-item">
                  <ion-label position="stacked">Usuario</ion-label>
                  <ion-input v-model="username" type="text" placeholder="nombre@ejemplo.com"></ion-input>
                </ion-item>

                <ion-item lines="none" class="custom-input-item">
                  <ion-label position="stacked">Contraseña</ion-label>
                  <ion-input v-model="password" type="password" placeholder="Tu contraseña"></ion-input>
                </ion-item>

                <div class="forgot-password">
                  <a>¿Olvidaste tu contraseña?</a>
                </div>

                <ion-button expand="block" class="login-button" @click="login">
                  Entrar a ReadVix
                </ion-button>
                <div class="divider">
                  <span>o continuar con</span>
                </div>

                <ion-button expand="block" fill="outline" class="google-button" @click="loginWithGoogle">
                  <img src="https://authjs.dev/img/providers/google.svg" alt="Google" class="google-icon" />
                  Acceder con Google
                </ion-button>


                
                <div class="signup-prompt">
                  <p>¿No tienes cuenta? <a href="#">Solicita acceso</a></p>
                </div>
              </ion-card-content>
            </ion-card>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  IonPage, IonContent, IonCard, IonCardHeader, 
  IonCardTitle, IonCardSubtitle, IonCardContent, 
  IonItem, IonLabel, IonInput, IonButton 
} from '@ionic/vue'

const router = useRouter()
const username = ref('')
const password = ref('')

const login = () => {
  if (username.value && password.value) {
    console.log('Login exitoso con:', username.value)
    router.push('/main')
  } else {
    // Aquí puedes usar un toast o alerta de Ionic para un mejor UX
    alert('Por favor, completa ambos campos.')
  }
}

const loginWithGoogle = () => {
  console.log('Iniciando sesión con Google...')
  // Por ahora lo mandamos al main para probar
  router.push('/main')
}
</script>

<style scoped>
/* 1. Reset de Ionic: Sin esto, ion-content tapa el fondo con un color sólido */
ion-content {
  --background: transparent;
}

/* 2. Fondo de la página con identidad ReadVix */
.login-page {
  /* Fondo base y mezcla de gradientes con patrón de puntos */
  background-color: #f8fafc;
  background-image: 
    radial-gradient(circle at 2% 2%, rgba(43, 108, 176, 0.15) 0%, transparent 40%),
    radial-gradient(circle at 98% 98%, rgba(66, 153, 225, 0.12) 0%, transparent 40%),
    radial-gradient(#cbd5e1 1.2px, transparent 1.2px);
  background-size: 100% 100%, 100% 100%, 30px 30px;
  min-height: 100vh;
}

/* 3. Contenedor principal centrado */
.main-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 24px;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
  max-width: 900px;
}

/* 4. Sección de Marca y Logo */
.brand-section {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-box {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 24px;
  border-radius: 32px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.9);
}

.brand-logo {
  max-width: 100%;
  height: auto;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.05));
}

.brand-section h1 {
  margin: 0;
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -1.5px;
  color: #1a202c;
}

.brand-section p {
  margin: 8px 0 0;
  font-size: 1.1rem;
  color: #4a5568;
}

/* 5. Tarjeta de Formulario */
.form-section {
  width: 100%;
  max-width: 400px;
}

ion-card {
  border-radius: 30px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  margin: 0;
  padding: 20px;
}

ion-card-title {
  font-size: 1.7rem;
  font-weight: 700;
  color: #1a202c;
}

/* 6. Inputs personalizados */
.custom-input-item {
  margin-top: 24px;
  --background: #f8fafc;
  --border-radius: 16px;
  --highlight-color-focused: #3182ce;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.custom-input-item.item-has-focus {
  border-color: #3182ce;
  box-shadow: 0 0 0 4px rgba(49, 130, 206, 0.1);
}

ion-label {
  font-weight: 600;
  color: #4a5568 !important;
  margin-bottom: 8px !important;
}

/* 7. Botón e interacciones */
.login-button {
  margin-top: 32px;
  --background: #3182ce;
  --background-activated: #2c5282;
  --border-radius: 16px;
  font-weight: 700;
  height: 56px;
  font-size: 1.1rem;
  text-transform: none;
}

.forgot-password {
  text-align: right;
  margin-top: 12px;
}

.forgot-password a, .signup-prompt a {
  color: #3182ce;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
}

.signup-prompt {
  text-align: center;
  margin-top: 24px;
  color: #718096;
}

/* 8. Media Queries para Responsive */
@media (min-width: 768px) {
  .login-container {
    flex-direction: row;
    justify-content: space-between;
    padding: 0 40px;
  }
  
  .brand-section {
    text-align: left;
    align-items: flex-start;
  }
  
  .logo-box {
    align-self: flex-start;
  }
}

@media (max-width: 480px) {
  .brand-section h1 {
    font-size: 2.5rem;
  }
  
  .logo-box {
    width: 120px;
    height: 120px;
  }
}
/* --- Estilos para Google Login --- */

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
  color: #a0aec0;
  font-size: 0.85rem;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e2e8f0;
}

.divider:not(:empty)::before {
  margin-right: .75em;
}

.divider:not(:empty)::after {
  margin-left: .75em;
}

.google-button {
  --border-color: #e2e8f0;
  --color: #2d3748;
  --border-radius: 16px;
  --border-width: 1px;
  font-weight: 600;
  height: 52px;
  margin-top: 0;
  text-transform: none;
  --background-hover: #f7fafc;
}

.google-icon {
  width: 20px;
  height: 20px;
  margin-right: 12px;
}

/* Asegúrate de que el login-button original tenga un margen inferior 
   si sientes que están muy pegados 
*/
</style>