<script setup>
import { inject, ref, computed, onMounted, watch } from 'vue'
import { useGame } from '../services/game'
import { useRouter } from 'vue-router'
import CodeField from '../components/CodeField.vue'

const pseudo = inject('pseudo')
const router = useRouter()
const { code, attempts, state, generateCode, validateAttempt } = useGame()
const gameConfig = inject('gameConfig', { length: 4, maxAttempts: 10 })
const codeLength = computed(() => Math.min(gameConfig.length, 10))
const saisie = ref(Array(codeLength.value).fill(''))

onMounted(() => {
  generateCode()
})

watch(state, (newState) => {
  if (newState === 'won' || newState === 'lost') {
    saveToLocalStorage()
  } 
})

const saveToLocalStorage = () => {
  const scores = JSON.parse(localStorage.getItem('mastermind-scores') || '[]')
  const lastAttempt = attempts.value[attempts.value.length - 1]
  
  scores.push({
    pseudo: pseudo.value,
    code: [...code.value],
    resultat: state.value === 'won' ? 'succès' : 'échec',
    derniereCombinaison: lastAttempt ? lastAttempt.essai : null,
    bienPlaces: lastAttempt ? lastAttempt.bienPlaces : null,
    malPlaces: lastAttempt ? lastAttempt.malPlaces : null,
    date: new Date().toISOString()
  })
  
  localStorage.setItem('mastermind-scores', JSON.stringify(scores))
}

const remainingAttempts = computed(() => {
  return gameConfig.maxAttempts - attempts.value.length
})

const handleValidate = () => {
  if (saisie.value.every(v => v !== '') && state.value === 'playing') {
    const guess = saisie.value.map(Number)
    validateAttempt(guess)
    saisie.value = Array(codeLength.value).fill('')
  }
}

const restart = () => {
  generateCode()
  saisie.value = Array(codeLength.value).fill('')
}

const goToHome = () => {
  router.push('/home')
}

const goToStats = () => {
  router.push('/stats')
}
</script>

<template>
  <div class="game">
    <h1>Bienvenue {{ pseudo }} !</h1>
    
    <div class="info">
      <p>Tentatives restantes : {{ remainingAttempts }}</p>
    </div>

    <div v-if="state === 'playing'" class="play-section">
      <h2>Entrez votre code</h2>
      <CodeField v-model="saisie" :length="gameConfig.length" @validate="handleValidate" />
    </div>

    <div v-if="state === 'won'" class="result">
      <h2>Bravo {{ pseudo }}, tu as gagné !</h2>
      <button @click="restart">Rejouer</button>
      <button @click="goToStats">Voir les scores</button>
    </div>

    <div v-if="state === 'lost'" class="result">
      <h2>T'as perdu {{ pseudo }}, encore une fois...</h2>
      <p>Le code était : {{ code.join(' ') }}</p>
      <button @click="restart">Rejouer</button>
      <button @click="goToStats">Voir les scores</button>
    </div>

    <div class="attempts-list" v-if="attempts.length > 0">
      <h3>Historique</h3>
      <div v-for="(attempt, index) in attempts" :key="index" class="attempt" :class="{ 'new-attempt': index === attempts.length - 1 }">
        <span class="number">{{ index + 1 }}.</span>
        <span class="guess">{{ attempt.essai.join(' ') }}</span>
        <span class="result-text">
          {{ attempt.bienPlaces }} bien placé(s) | 
          {{ attempt.malPlaces }} mal placé(s)
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
}

h1 {
  color: #333;
  text-align: center;
}

.info {
  text-align: center;
  margin: 20px 0;
  font-weight: bold;
}

.play-section {
  text-align: center;
  background: #f9f9f9;
  padding: 20px;
  margin: 20px 0;
}

.inputs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
}

.digit-input {
  width: 50px;
  height: 50px;
  font-size: 1.5em;
  text-align: center;
  border: 1px solid #ccc;
}

.result {
  text-align: center;
  background: #f9f9f9;
  padding: 20px;
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

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.attempts-list {
  margin: 30px 0;
}

.attempts-list h3 {
  color: #333;
}

.attempt {
  background: #f9f9f9;
  padding: 10px;
  margin: 5px 0;
  display: flex;
  gap: 15px;
  align-items: center;
}

.number {
  font-weight: bold;
}

.guess {
  font-size: 1.2em;
  font-weight: bold;
  letter-spacing: 5px;
}

.result-text {
  color: #666;
}

.new-attempt {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
