<template>
  <div class="dashboard">
    <h1>Comissões</h1>
    <div class="boasvindas">
      Boa tarde, {{ user }}. Gostaria de acessar a agenda de qual comissao?
    </div>
    <div class="comissoes-container" v-if="comissoes.length">
      <div class="card" v-for="item in comissoes" :key="item.Codigo">
        <RouterLink :to="{ name: 'ReuniaoAgenda', params: { codigo: item.Codigo } }">
          <div class="title-card">{{ item.Sigla }} - {{ item.Nome }}</div>
          <p class="finalidade">{{ item.Finalidade }}</p>
        </RouterLink>
      </div>
    </div>
    <div v-else class="loading">Carregando...</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DashBoard',
  data() {
    return {
      comissoes: [],
      user: []
    }
  },
  created() {
    this.fetchComissoes(), this.fetchUser()
  },
  methods: {
    async fetchComissoes() {
      try {
        const response = await axios.get(
          'https://legis.senado.leg.br/dadosabertos/comissao/lista/colegiados'
        )
        this.comissoes = response.data.ListaColegiados.Colegiados.Colegiado.filter(
          (item) => item.SiglaTipoColegiado === 'PERMANENTE'
        )
        console.log(this.comissoes)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async fetchUser() {
      try {
        const token = localStorage.getItem('authToken') // Or wherever you store your token
        console.log('Token:', token)
        const response = await axios.get('http://127.0.0.1:8000/api/user/me/', {
          headers: {
            Authorization: `token ${token}`
          }
        })
        this.user = response.data.name
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }
}
</script>

<style scoped>
.dashboard {
  min-width: 1080px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
}

.boasvindas {
  text-align: center;
  margin: 20px 0;
  font-size: 1.2em;
  color: #555;
}

.comissoes-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.title-card {
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.finalidade {
  color: #666;
}

.loading {
  text-align: center;
  font-size: 1.2em;
  color: #999;
}
</style>
