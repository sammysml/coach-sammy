// Typed interfaces for every Supabase table referenced in the web app.
// Optional fields are kept loose (string | null) to match Postgres NULL defaults.

export type ClientType = 'coaching' | 'programme';
export type ClientStatus = 'active' | 'pending_approval' | 'expired' | 'paused';

export interface Client {
  id: string;
  name: string;
  whatsapp?: string | null;
  email?: string | null;
  status: ClientStatus;
  client_type?: ClientType | null;
  membership_tag?: string | null;
  membership_active?: boolean | null;
  membership_expiry?: string | null;
  phase?: string | null;
  goal?: string | null;
  language?: 'fr' | 'en' | 'ar' | null;
  weight?: number | null;
  current_weight?: number | null;
  start_weight?: number | null;
  target_weight?: number | null;
  goal_weight?: number | null;
  kcal_training?: number | null;
  kcal_rest?: number | null;
  protein_g?: number | null;
  carbs_g?: number | null;
  fat_g?: number | null;
  step_goal?: number | null;
  weekly_training_target?: number | null;
  photo_url?: string | null;
  last_seen_at?: string | null;
  push_token?: string | null;
  created_at: string;
}

export interface ClientGoals {
  id: string;
  client_id: string;
  calorie_target?: number | null;
  protein_target?: number | null;
  carbs_target?: number | null;
  fats_target?: number | null;
  step_goal?: number | null;
  weekly_training_target?: number | null;
  start_weight?: number | null;
  goal_weight?: number | null;
  main_objective?: string | null;
  calories?: number | null;
  protein?: number | null;
  carbs?: number | null;
  fat?: number | null;
}

export interface DailyLog {
  id: string;
  client_id: string;
  log_date: string;
  day_type?: 'training' | 'rest' | null;
  body_weight?: number | null;
  calories_eaten?: number | null;
  protein_eaten?: number | null;
  carbs_eaten?: number | null;
  fat_eaten?: number | null;
  water_ml?: number | null;
  steps?: number | null;
  training_done?: boolean | null;
  menu_respected?: boolean | null;
  sleep_hours?: number | null;
  hunger_score?: number | null;
  energy_score?: number | null;
  mood_score?: number | null;
  client_notes?: string | null;
  coach_notes?: string | null;
  weekly_checkin_done?: boolean | null;
  weekly_feel?: string | null;
  weekly_energy?: string | null;
  weekly_note?: string | null;
  week_number?: number | null;
  day_name?: string | null;
}

export interface WeightLog {
  id: string;
  client_id: string;
  weight: number;
  logged_at: string;
}

export interface ExerciseLog {
  id: string;
  client_id: string;
  exercise_name: string;
  session_name?: string | null;
  weight_kg?: number | null;
  reps?: number | null;
  sets?: number | null;
  volume?: number | null;
  is_pb?: boolean | null;
  logged_at: string;
}

export interface FoodLog {
  id: string;
  client_id: string;
  food_name: string;
  calories?: number | null;
  protein?: number | null;
  carbs?: number | null;
  fat?: number | null;
  log_date: string;
  created_at: string;
}

export interface MealPlan {
  id: string;
  client_id: string;
  plan_data: any;
  created_at: string;
}

export interface TrainingSession {
  id: string;
  client_id: string;
  name: string;
  type?: string | null;
  exercises?: any[] | null;
  cardio?: any[] | null;
  rest_time?: number | null;
  created_at: string;
}

export interface Notification {
  id: string;
  client_id?: string | null;
  type: string; // 'broadcast' | 'coach_checkin' | 'message' | 'program_published' | ...
  title?: string | null;
  body?: string | null;
  is_read: boolean;
  created_at: string;
}

export interface Post {
  id: string;
  client_id?: string | null;
  author_id?: string | null;
  content: string;
  sender?: 'coach' | 'client' | null;
  is_read?: boolean | null;
  created_at: string;
}

export interface Supplement {
  id: string;
  name: string;
  price?: number | null;
  stock?: number | null;
  category?: string | null;
  active?: boolean | null;
}

export interface ClientRequest {
  id: string;
  client_id: string;
  type_id?: string | null;
  text?: string | null;
  status?: string | null;
  created_at: string;
}

export interface Measurement {
  id: string;
  client_id: string;
  measured_at: string;
  chest?: number | null;
  waist?: number | null;
  hips?: number | null;
  arm?: number | null;
  thigh?: number | null;
  calf?: number | null;
}

export interface PersonalBest {
  id: string;
  client_id: string;
  exercise_name: string;
  weight_kg?: number | null;
  reps?: number | null;
  achieved_at: string;
}

export interface CoachCheckin {
  id: string;
  client_id: string;
  coach_id?: string | null;
  week_start: string;
  checked_at: string;
  note?: string | null;
}

export interface CoachClientNote {
  id: string;
  client_id: string;
  coach_id?: string | null;
  note: string;
  created_at: string;
  updated_at?: string | null;
}

export interface ClientPhoto {
  id: string;
  client_id: string;
  url: string;
  note?: string | null;
  created_at: string;
}

export interface Profile {
  id: string;
  role: 'coach' | 'client' | 'admin' | null;
  email?: string | null;
  name?: string | null;
  created_at?: string | null;
}

export interface Diagnostic {
  id: string;
  client_id: string;
  content: string;
  updated_at: string;
}

// Coach-side business data
export interface CoachTask {
  id: string;
  title: string;
  due_date?: string | null;
  category?: string | null;
  priority?: number | null;
  done?: boolean | null;
  created_at?: string;
}

export interface CoachProject {
  id: string;
  title: string;
  description?: string | null;
  progress?: number | null;
  next_milestone?: string | null;
  deadline?: string | null;
  status?: string | null;
}

export interface CoachObjective {
  id: string;
  title: string;
  target_value?: number | null;
  current_value?: number | null;
  unit?: string | null;
  category?: string | null;
  timeframe?: string | null;
  deadline?: string | null;
}

export interface CoachFinance {
  id: string;
  type: 'revenue' | 'expense' | string;
  amount: number;
  category?: string | null;
  description?: string | null;
  date: string;
}

export interface CoachContent {
  id: string;
  title: string;
  platform?: string | null;
  status?: string | null;
  notes?: string | null;
  scheduled_for?: string | null;
}

export type Role = 'coach' | 'client' | null;
