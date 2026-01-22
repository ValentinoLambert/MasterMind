import { ref } from 'vue'
import { setPseudoRef } from '../router'

export default {
  install(app) {
    const pseudo = ref('')
    app.provide('pseudo', pseudo)
    setPseudoRef(pseudo)
  }
}
