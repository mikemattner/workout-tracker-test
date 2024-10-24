<script setup lang="ts">
import { ref } from 'vue';
import { format } from 'date-fns';
import type { Exercise, Set, Workout } from '../types';
import { generateId } from '../utils/uuid';
import ExerciseForm from './ExerciseForm.vue';
import SetList from './SetList.vue';

const workouts = ref<Workout[]>([]);
const currentWorkout = ref<Workout>({
  id: generateId(),
  date: new Date(),
  exercises: []
});

const addExercise = (exerciseData: Omit<Exercise, 'id' | 'sets'>) => {
  currentWorkout.value.exercises.push({
    id: generateId(),
    name: exerciseData.name,
    sets: []
  });
};

const addSet = (exerciseId: string, setData: Omit<Set, 'id'>) => {
  const exercise = currentWorkout.value.exercises.find(e => e.id === exerciseId);
  if (exercise) {
    exercise.sets.push({
      id: generateId(),
      ...setData
    });
  }
};

const removeSet = (exerciseId: string, setId: string) => {
  const exercise = currentWorkout.value.exercises.find(e => e.id === exerciseId);
  if (exercise) {
    exercise.sets = exercise.sets.filter(s => s.id !== setId);
  }
};

const finishWorkout = () => {
  if (currentWorkout.value.exercises.length > 0) {
    workouts.value.push({ ...currentWorkout.value });
    currentWorkout.value = {
      id: generateId(),
      date: new Date(),
      exercises: []
    };
  }
};
</script>

<template>
  <div class="max-w-2xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Workout Tracker</h1>
    
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-4">Current Workout</h2>
      <ExerciseForm @add-exercise="addExercise" />
      
      <div v-for="exercise in currentWorkout.exercises" :key="exercise.id" class="mb-4 p-4 border rounded-lg">
        <h3 class="text-lg font-medium mb-2">{{ exercise.name }}</h3>
        <SetList
          :sets="exercise.sets"
          @add-set="set => addSet(exercise.id, set)"
          @remove-set="setId => removeSet(exercise.id, setId)"
        />
      </div>
      
      <button
        v-if="currentWorkout.exercises.length > 0"
        @click="finishWorkout"
        class="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600"
      >
        Finish Workout
      </button>
    </div>
    
    <div v-if="workouts.length > 0">
      <h2 class="text-xl font-semibold mb-4">Workout History</h2>
      <div v-for="workout in workouts" :key="workout.id" class="mb-4 p-4 border rounded-lg">
        <h3 class="text-lg font-medium mb-2">
          {{ format(workout.date, 'PPP') }}
        </h3>
        <div v-for="exercise in workout.exercises" :key="exercise.id" class="mb-2">
          <h4 class="font-medium">{{ exercise.name }}</h4>
          <div class="text-sm text-gray-600">
            <span v-for="(set, index) in exercise.sets" :key="set.id">
              {{ set.weight }}kg × {{ set.reps }}
              <span v-if="index < exercise.sets.length - 1">, </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>