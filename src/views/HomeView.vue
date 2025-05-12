<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const pokemons = ref([])
const router = useRouter()

const fetchPokemons = async () => {
  const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1301')//exiten 101 pokemones
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
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  background: linear-gradient(to bottom, #f2f2f2, #e8f0ff);
  min-height: 100vh;
}

.card {
  background: white;
  border: 2px solid #d0d0d0;
  border-radius: 16px;
  padding: 1.5rem 1rem;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border-color: #ffcb05; /* amarillo tipo pokebola */
}

.card img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 0.75rem;
}

.card h3 {
  text-transform: capitalize;
  font-size: 1.1rem;
  margin: 0.5rem 0;
  color: #2b2b2b;
}

.card p {
  font-size: 0.9rem;
  color: #666;
}
</style>

