export interface ScheduleEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: "training" | "match" | "camp" | "special";
  duration: string;
  ageGroup?: string;
  coach?: string;
}

export interface ScheduleDay {
  date: string;
  events: ScheduleEvent[];
}