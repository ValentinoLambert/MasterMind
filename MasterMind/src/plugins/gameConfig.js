import { reactive } from 'vue'

export default {
  install(app) {
    const gameConfig = reactive({
      length: 4,
      maxAttempts: 10
    })
    app.provide('gameConfig', gameConfig)
  }
}
