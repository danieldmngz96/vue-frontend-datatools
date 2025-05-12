<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const pokemon = ref(null)

onMounted(async () => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`)
  pokemon.value = {
    name: res.data.name,
    image: res.data.sprites.front_default,
    types: res.data.types.map(t => t.type.name),
    height: res.data.height,
    weight: res.data.weight
  }
})
</script>

<template>
  <div v-if="pokemon" class="detail">
    <img :src="pokemon.image" :alt="pokemon.name" />
    <h1>{{ pokemon.name }}</h1>
    <p>Types: {{ pokemon.types.join(', ') }}</p>
    <p>Height: {{ pokemon.height }}</p>
    <p>Weight: {{ pokemon.weight }}</p>
  </div>
</template>

<style scoped>
.detail {
  max-width: 400px;
  margin: 2rem auto;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 16px;
  padding: 2rem;
}
.detail img {
  width: 120px;
  height: 120px;
}
</style>
