import { ref, inject } from 'vue'

export function useGame() {
  const code = ref([])
  const attempts = ref([])
  const state = ref('playing') 

  const gameConfig = inject('gameConfig', { length: 4, maxAttempts: 10 })

  const generateCode = () => {
    const digits = []
    const targetLength = Math.min(gameConfig.length, 10)
    while (digits.length < targetLength) {
      const digit = Math.floor(Math.random() * 10)
      if (!digits.includes(digit)) {
        digits.push(digit)
      }
    }
    code.value = digits
    attempts.value = []
    state.value = 'playing'
  }

  const validateAttempt = (attempt) => {
    let bienPlaces = 0
    let malPlaces = 0

    attempt.forEach((digit, index) => {
      if (digit === code.value[index]) {
        bienPlaces++
      } else if (code.value.includes(digit)) {
        malPlaces++
      }
    })

    attempts.value.push({
      essai: [...attempt],
      bienPlaces,
      malPlaces
    })

    if (bienPlaces === code.value.length) {
      state.value = 'won'
    } else if (attempts.value.length >= gameConfig.maxAttempts) {
      state.value = 'lost'
    }

    return { bienPlaces, malPlaces }
  }

  return {
    code,
    attempts,
    state,
    generateCode,
    validateAttempt
  }
}
