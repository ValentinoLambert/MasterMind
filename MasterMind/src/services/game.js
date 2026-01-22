import { ref } from 'vue'

export function useGame() {
  const code = ref([])
  const attempts = ref([])
  const state = ref('playing') 

  const generateCode = () => {
    const digits = []
    while (digits.length < 4) {
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

    if (bienPlaces === 4) {
      state.value = 'won'
    } else if (attempts.value.length >= 10) {
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
