<script setup>
import { computed } from 'vue'

const props = defineProps({
  length: {
    type: Number,
    required: true
  }
})

const modelValue = defineModel()

const emit = defineEmits(['validate'])

const fields = computed(() => {
  return Array.from({ length: props.length }, (_, i) => i + 1)
})

const handleInput = (index, event) => {
  const value = event.target.value
  if (!modelValue.value) {
    modelValue.value = Array(props.length).fill('')
  }
  if (value.length > 1) {
    modelValue.value[index] = value.slice(-1)
  }
  if (value && index < props.length - 1) {
    const nextInput = event.target.nextElementSibling
    if (nextInput) nextInput.focus()
  }
}

const handleValidate = () => {
  emit('validate')
}
</script>

<template>
  <div class="code-field">
    <div class="inputs">
      <input 
        v-for="(_, index) in fields" 
        :key="index"
        v-model="modelValue[index]"
        @input="handleInput(index, $event)"
        type="number"
        min="0"
        max="9"
        maxlength="1"
        class="digit-input" 
      />
    </div>
    <button @click="handleValidate">Valider</button>
  </div>
</template>

<style scoped>
.code-field {
  text-align: center;
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

button {
  padding: 10px 20px;
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
