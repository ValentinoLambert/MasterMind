<script setup>
import { inject, ref, computed, onMounted } from 'vue'
import { useGame } from '../services/game'
import { useRouter } from 'vue-router'

const pseudo = inject('pseudo')
const router = useRouter()
const { code, attempts, state, generateCode, validateAttempt } = useGame()
const currentGuess = ref(['', '', '', ''])

onMounted(() => {
  generateCode()
})

const remainingAttempts = computed(() => {
  return 10 - attempts.value.length
})

const canSubmit = computed(() => {
  return currentGuess.value.every(v => v !== '') && state.value === 'playing'
})

const submitGuess = () => {
  if (!canSubmit.value) return
  
  const guess = currentGuess.value.map(Number)
  validateAttempt(guess)
  currentGuess.value = ['', '', '', '']
}

const handleInput = (index, event) => {
  const value = event.target.value
  if (value.length > 1) {
    currentGuess.value[index] = value.slice(-1)
  }
  if (value && index < 3) {
    const nextInput = event.target.nextElementSibling
    if (nextInput) nextInput.focus()
  }
}

const restart = () => {
  generateCode()
  currentGuess.value = ['', '', '', '']
}

const goToHome = () => {
  router.push('/home')
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
      <div class="inputs">
        <input 
          v-for="(_, index) in 4" 
          :key="index"
          v-model="currentGuess[index]"
          @input="handleInput(index, $event)"
          type="number"
          min="0"
          max="9"
          maxlength="1"
          class="digit-input"
        />
      </div>
      <button @click="submitGuess" :disabled="!canSubmit">Valider</button>
    </div>

    <div v-if="state === 'won'" class="result">
      <h2>Bravo {{ pseudo }}, tu as gagné !</h2>
      <button @click="restart">Rejouer</button>
      <button @click="goToHome">Accueil</button>
    </div>

    <div v-if="state === 'lost'" class="result">
      <h2>T'as perdu {{ pseudo }}, encore une fois...</h2>
      <p>Le code était : {{ code.join(' ') }}</p>
      <button @click="restart">Rejouer</button>
      <button @click="goToHome">Accueil</button>
    </div>

    <div class="attempts-list" v-if="attempts.length > 0">
      <h3>Historique</h3>
      <div v-for="(attempt, index) in attempts" :key="index" class="attempt">
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
</style>
