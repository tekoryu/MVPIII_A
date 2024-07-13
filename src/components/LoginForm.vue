<template>
  <div class="login-form">
    <div v-if="isRegistering">
      <h2>Cadastro</h2>
      <form @submit.prevent="handleRegister">
        <div>
          <label for="registerName">Nome:</label>
          <input type="name" v-model="registerName" required />
        </div>
        <div>
          <label for="registerEmail">Email:</label>
          <input type="email" v-model="registerEmail" required />
        </div>
        <div>
          <label for="registerPassword">Password:</label>
          <input type="password" v-model="registerPassword" required />
        </div>
        <button type="submit">Registrar</button>
        <div v-if="registerErrorMessage" class="error-message">
          {{ registerErrorMessage }}
        </div>
      </form>
      <button @click="toggleForm">Já tem uma conta? Login</button>
    </div>
    <div v-else>
      <h2>Login</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="email">Email:</label>
          <input id="email" type="email" v-model="email" required autocomplete="email" />
        </div>
        <div>
          <label for="password">Password:</label>
          <input id="password" type="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </form>
      <button @click="toggleForm">Não tem uma conta? Registre-se</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['isAuthenticated'])
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      registerName: '',
      registerEmail: '',
      registerPassword: '',
      registerErrorMessage: '',
      isRegistering: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/user/token/', {
          email: this.email,
          password: this.password
        })
        console.log('Autenticado com sucesso:', response.data)
        this.errorMessage = ''
        localStorage.setItem('authToken', response.data.token)
        this.$store.dispatch('login', response.data.token)
        this.$router.push('DashBoard')
        console.log(this.$route.fullPath)
      } catch (error) {
        console.error('Login Failed:', error)
        this.errorMessage = 'Falha na autenticacao. Tente novamente.'
      }
    },
    async handleRegister() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/user/create/', {
          name: this.registerName,
          email: this.registerEmail,
          password: this.registerPassword
        })
        console.log('Registrado com sucesso', response.data)
        this.registerErrorMessage = ''
        this.isRegistering = 'False'
        // Login automatico
        this.email = this.registerEmail
        this.password = this.registerPassword
        await this.handleSubmit()
      } catch (error) {
        console.error('Registro falhou.', error)
        this.registerErrorMessage = 'Registro falhou. Tente novamente.'
      }
    },
    toggleForm() {
      this.isRegistering = !this.isRegistering
      this.errorMessage = ''
      this.registerErrorMessage = ''
    }
  }
}
</script>
<style scoped>
.login-form {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.login-form div {
  margin-bottom: 10px;
}
.login-form label {
  display: block;
  margin-bottom: 5px;
}
.login-form input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.login-form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}
.login-form button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
