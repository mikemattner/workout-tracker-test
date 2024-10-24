<script setup lang="ts">
import { ref } from 'vue';
import type { Set } from '../types';

const props = defineProps<{
  sets: Set[];
}>();

const emit = defineEmits<{
  (e: 'add-set', set: Omit<Set, 'id'>): void;
  (e: 'remove-set', setId: string): void;
}>();

const weight = ref(0);
const reps = ref(0);

const addSet = () => {
  if (weight.value > 0 && reps.value > 0) {
    emit('add-set', { weight: weight.value, reps: reps.value });
    weight.value = 0;
    reps.value = 0;
  }
};
</script>

<template>
  <div class="mt-2">
    <div class="flex gap-2 mb-2">
      <input
        v-model="weight"
        type="number"
        placeholder="Weight"
        class="px-4 py-2 border rounded-lg w-24"
      />
      <input
        v-model="reps"
        type="number"
        placeholder="Reps"
        class="px-4 py-2 border rounded-lg w-24"
      />
      <button
        @click="addSet"
        class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
      >
        Add Set
      </button>
    </div>
    <div class="space-y-2">
      <div
        v-for="set in sets"
        :key="set.id"
        class="flex items-center gap-2 bg-gray-100 p-2 rounded"
      >
        <span>{{ set.weight }}kg × {{ set.reps }} reps</span>
        <button
          @click="emit('remove-set', set.id)"
          class="text-red-500 hover:text-red-700"
        >
          ×
        </button>
      </div>
    </div>
  </div>
</template>