<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="handleClick">Click Me</button>
  </div>
</template>

<script>
export default {
  name: 'SimpleComponent',
  data() {
    return {
      title: 'Hello Vue 3!'
    }
  },
  methods: {
    handleClick() {
      console.log('Button clicked!')
    }
  }
}
</script>

<style scoped>
h1 {
  color: #42b983;
}
button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
button:hover {
  background-color: #339672;
}
</style>
