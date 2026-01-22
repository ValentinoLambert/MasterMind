import { ref } from 'vue'

export function useGame() {
  const code = ref([])

  const generateCode = () => {
    const digits = []
    while (digits.length < 4) {
      const digit = Math.floor(Math.random() * 10)
      if (!digits.includes(digit)) {
        digits.push(digit)
      }
    }
    code.value = digits
  }

  return {
    code,
    generateCode
  }
}
