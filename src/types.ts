export interface Exercise {
  id: string;
  name: string;
  sets: Set[];
}

export interface Set {
  id: string;
  weight: number;
  reps: number;
}

export interface Workout {
  id: string;
  date: Date;
  exercises: Exercise[];
}