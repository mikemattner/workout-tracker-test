<script setup lang="ts">
import { ref } from 'vue';
import type { Exercise } from '../types';

const emit = defineEmits<{
  (e: 'add-exercise', exercise: Omit<Exercise, 'id' | 'sets'>): void
}>();

const exerciseName = ref('');

const addExercise = () => {
  if (exerciseName.value.trim()) {
    emit('add-exercise', { name: exerciseName.value.trim() });
    exerciseName.value = '';
  }
};
</script>

<template>
  <div class="mb-4">
    <input
      v-model="exerciseName"
      type="text"
      placeholder="Exercise name"
      class="px-4 py-2 border rounded-lg mr-2"
      @keyup.enter="addExercise"
    />
    <button
      @click="addExercise"
      class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
    >
      Add Exercise
    </button>
  </div>
</template>