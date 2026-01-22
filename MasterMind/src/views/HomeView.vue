<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const pseudo = inject('pseudo')
const router = useRouter()

const goToGame = () => {
  if (pseudo.value.trim()) {
    router.push('/game')
  }
}
</script>

<template>
  <div class="home">
    <h1>MasterMind - Accueil</h1>
    
    <div class="pseudo-section">
      <label for="pseudo">Votre pseudo :</label>
      <input 
        id="pseudo" 
        v-model="pseudo.value" 
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

h1 {
  color: #333;
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
