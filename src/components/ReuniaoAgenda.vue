<template>
  <div class="agenda-container">
    <h1 class="agenda-title">Reunião Agenda {{ codigo }}</h1>
    <div class="card" v-for="item in reunioes" :key="item.codigo">
      <div class="title-card">
        {{ item.titulo }} - <span class="status">{{ item.status }}</span>
      </div>
      <div class="info">Local: {{ item.local }}</div>
      <div class="info">Presidente: {{ item.presidente.nome }}</div>
      <a :href="item.urlSumarioDosPareceres" class="link">Sumário</a>
      <a :href="item.videos.url" class="link">Gravação.</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ReuniaoAgenda',
  data() {
    return {
      reunioes: []
    }
  },
  computed: {
    codigo() {
      return this.$route.params.codigo
    }
  },
  created() {
    this.fetchComissoes(), console.log('Codigo:', this.sigla)
  },
  methods: {
    async fetchComissoes() {
      try {
        const response = await axios.get(
          'https://legis.senado.leg.br/dadosabertos/agendareuniao/20240710'
        )
        console.log(response.data)

        this.reunioes = response.data.AgendaReuniao.reunioes.reuniao.filter(
          (item) => item.colegiadoCriador.codigo === this.codigo
        )
        console.log(this.reunioes)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }
}
</script>

<style scoped>
.agenda-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.agenda-title {
  text-align: center;
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
}

.card {
  background-color: #ffffff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title-card {
  font-size: 1.2em;
  color: #222;
  margin-bottom: 10px;
}

.status {
  font-weight: bold;
  color: #e74c3c;
}

.info {
  font-size: 1em;
  color: #555;
  margin-bottom: 5px;
}

.link {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #3498db;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.link:hover {
  background-color: #2980b9;
}
</style>
