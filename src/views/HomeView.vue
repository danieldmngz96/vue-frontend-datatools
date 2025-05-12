<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const pokemons = ref([])
const router = useRouter()

const fetchPokemons = async () => {
  const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
  const results = res.data.results

  // Obtener detalles para cada Pokémon
  const detailedPromises = results.map(p => axios.get(p.url))
  const detailedResponses = await Promise.all(detailedPromises)

  pokemons.value = detailedResponses.map(r => ({
    id: r.data.id,
    name: r.data.name,
    image: r.data.sprites.front_default,
    types: r.data.types.map(t => t.type.name)
  }))
}

onMounted(fetchPokemons)

const goToDetail = (id) => {
  router.push(`/pokemon/${id}`)
}
</script>

<template>
  <div class="grid">
    <div class="card" v-for="pokemon in pokemons" :key="pokemon.id" @click="goToDetail(pokemon.id)">
      <img :src="pokemon.image" :alt="pokemon.name" />
      <h3>{{ pokemon.name }}</h3>
      <p>{{ pokemon.types.join(', ') }}</p>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
  padding: 2rem;
}
.card {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.card:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
.card img {
  width: 96px;
  height: 96px;
}
</style>
