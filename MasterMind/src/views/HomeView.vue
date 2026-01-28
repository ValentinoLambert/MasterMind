<script setup>
import { inject, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGame } from '../services/game'

const pseudo = inject('pseudo')
const router = useRouter()
const { code, generateCode } = useGame()
const gameConfig = inject('gameConfig', { length: 4, maxAttempts: 10 })

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

const goToStats = () => {
  router.push('/stats')
}

const logout = () => {
  if (pseudo) pseudo.value = ''
  router.push('/home')
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

    <div class="config">
      <label>Longueur du code :</label>
      <input type="number" v-model.number="gameConfig.length" min="1" max="10" />
      <label>Max tentatives :</label>
      <input type="number" v-model.number="gameConfig.maxAttempts" min="1" max="50" />
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

    <div class="buttons">
      <button @click="goToGame">Jouer</button>
      <button @click="goToStats">Stats</button>
      <button v-if="pseudo && pseudo.trim()" @click="logout">Déconnexion</button>
    </div>
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

.buttons {
  display: flex;
  gap: 10px;
}

.config {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin: 10px 0 20px 0;
}

.config input {
  width: 80px;
  padding: 6px;
}

  margin: 20px 0;
}

button {
  padding: 10px 20px;
  margin: 1%;
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
