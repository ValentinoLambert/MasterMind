<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const scores = ref([])

onMounted(() => {
  const data = localStorage.getItem('mastermind-scores')
  if (data) {
    scores.value = JSON.parse(data)
  }
})

const goToHome = () => {
  router.push('/home')
}

const goToGame = () => {
  router.push('/game')
}

const clearScores = () => {
  localStorage.removeItem('mastermind-scores')
  scores.value = []
}
</script>

<template>
  <div class="stats">
    <h1>Historique des parties</h1>

    <div class="actions">
      <button @click="goToHome">Accueil</button>
      <button @click="goToGame">Nouvelle partie</button>
      <button v-if="scores.length > 0" @click="clearScores">Effacer</button>
    </div>

    <div v-if="scores.length === 0" class="no-scores">
      <p>Aucune partie enregistrée</p>
    </div>

    <div v-else class="scores-list">
      <div v-for="(score, index) in scores" :key="index" class="score-item">
        <div class="score-header">
          <span class="pseudo">{{ score.pseudo }}</span>
          <span :class="['resultat', score.resultat]">{{ score.resultat }}</span>
        </div>
        <div class="score-details">
          <p>Code à trouver : <strong>{{ score.code.join(' ') }}</strong></p>
          <p v-if="score.resultat === 'échec'">
            Dernière combinaison : <strong>{{ score.derniereCombinaison.join(' ') }}</strong>
          </p>
          <p v-if="score.resultat === 'échec'">
            {{ score.bienPlaces }} bien placé(s) | {{ score.malPlaces }} mal placé(s)
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
}

h1 {
  color: #333;
  text-align: center;
}

.actions {
  text-align: center;
  margin: 20px 0;
}

button {
  padding: 10px 20px;
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
  margin: 5px;
}

.no-scores {
  text-align: center;
  background: #f9f9f9;
  padding: 40px;
  margin: 20px 0;
}

.scores-list {
  margin: 20px 0;
}

.score-item {
  background: #f9f9f9;
  padding: 15px;
  margin: 10px 0;
  border-left: 4px solid #ccc;
}

.score-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.pseudo {
  font-weight: bold;
  font-size: 1.2em;
}

.resultat {
  padding: 5px 10px;
  border-radius: 3px;
  font-weight: bold;
}

.resultat.succès {
  background: #d4edda;
  color: #155724;
}

.resultat.échec {
  background: #f8d7da;
  color: #721c24;
}

.score-details {
  color: #666;
}

.score-details p {
  margin: 5px 0;
}

.score-details strong {
  color: #333;
  letter-spacing: 3px;
}
</style>

