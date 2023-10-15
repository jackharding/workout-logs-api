export type Exercise = {
  id: string;
  name: string;
  icon?: string;
  video?: string;
  notes?: string;
  custom: boolean;
  bodyPartId?: BodyPart['id'];
  categoryId: ExerciseCategory['id'];
};

export type BodyPart = {
  id: string;
  name: 'Core' | 'Arms' | 'Back' | 'Chest' | 'Legs' | 'Neck' | 'Full Body';
};

export type ExerciseCategory = {
  id: string;
  name:
    | 'Barbell'
    | 'Dumbbell'
    | 'Machine'
    | 'Weighted bodyweight'
    | 'Reps only'
    | 'Cardio'
    | 'Duration';
};

export type Rep = {
  id: string;
  weight?: number;
  weightUnit: 'kg' | 'lbs';
  reps?: number;
  notes?: string;
  complete: boolean;
  type: 'Normal' | 'Drop set' | 'Failure' | 'Super set';
};

export type Log = {
  id: string;
  name?: string;
  dateStart: string;
  dateEnd?: string;
  notes?: string;
  restDurationMs?: number;
  exercises: Array<{
    exerciseId: Exercise['id'];
    reps: Array<Rep>;
  }>;
};
