<script setup>
import { inject, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGame } from '../services/game'

const pseudo = inject('pseudo')
const router = useRouter()
const { code, generateCode } = useGame()

let intervalId = null

onMounted(() => {
  generateCode()
  intervalId = setInterval(() => {
    generateCode()
  }, 2000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

const goToGame = () => {
  if (pseudo.value.trim()) {
    router.push('/game')
  }
}
</script>

<template>
  <div class="home">
    <header>
      <h1>MasterMind</h1>
      <div class="code-animation">
        {{ code.join(' ') }}
      </div>
    </header>
    
    <div class="pseudo-section">
      <label for="pseudo">Votre pseudo :</label>
      <input    
        id="pseudo" 
        v-model="pseudo" 
        type="text" 
        placeholder="Entrez votre pseudo"
      />
    </div>

    <div class="rules">
      <h2>Règles du jeu</h2>
      <p>Un code à 4 chiffres uniques est généré.</p>
      <p>Vous avez 10 tentatives pour le deviner.</p>
      <p>Après chaque tentative, vous saurez :</p>
      <ul>
        <li>Combien de chiffres sont justes et bien placés</li>
        <li>Combien de chiffres sont justes mais mal placés</li>
      </ul>
    </div>

    <button @click="goToGame">Jouer</button>
  </div>
</template>

<style scoped>
.home {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 30px;
}

h1 {
  color: #333;
  margin-bottom: 10px;
}

.code-animation {
  font-size: 2em;
  font-weight: bold;
  color: #666;
  letter-spacing: 10px;
  min-height: 40px;
}

.pseudo-section {
  margin: 20px 0;
}

.pseudo-section input {
  padding: 8px;
  width: 250px;
  border: 1px solid #ccc;
}

.rules {
  background: #f9f9f9;
  padding: 15px;
  margin: 20px 0;
}

button {
  padding: 10px 20px;
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
