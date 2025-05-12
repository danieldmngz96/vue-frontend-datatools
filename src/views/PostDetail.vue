<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const pokemon = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`)
    pokemon.value = {
      name: res.data.name,
      image: res.data.sprites.other['official-artwork'].front_default,
      types: res.data.types.map(t => t.type.name),
      height: res.data.height / 10, // metros
      weight: res.data.weight / 10  // kg
    }
    document.title = `PokéApp | ${pokemon.value.name}`
  } catch (err) {
    error.value = 'No se pudo cargar el Pokémon.'
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="detail">
    <div v-if="loading" class="loader">Cargando...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="card">
      <img :src="pokemon.image" :alt="pokemon.name" />
      <h1 class="name">{{ pokemon.name }}</h1>
      <p><strong>Tipos:</strong> {{ pokemon.types.join(', ') }}</p>
      <p><strong>Altura:</strong> {{ pokemon.height }} m</p>
      <p><strong>Peso:</strong> {{ pokemon.weight }} kg</p>
    </div>
  </div>
</template>

<style scoped>
.detail {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  text-align: center;
}

.card {
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 2rem;
  background-color: #f8fafc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

.card img {
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin-bottom: 1rem;
}

.name {
  text-transform: capitalize;
  font-size: 2rem;
  color: #1e293b;
  margin-bottom: 1rem;
}

.loader,
.error {
  font-size: 1.2rem;
  color: #64748b;
}
</style>
