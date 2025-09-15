export interface ScheduleGame {
  id: number;
  date: string;
  time: string;
  endTime: string;
  division: string;
  visitingTeam: string;
  homeTeam: string;
  location: string;
}

export const scheduleData: ScheduleGame[] = [
  {
    id: 1,
    date: "9/6/2025",
    time: "2:00 pm",
    endTime: "3:30pm",
    division: "7U Hybrid",
    visitingTeam: "Brooklyn Cougars",
    homeTeam: "King Academy",
    location: "Riverside Park - Field 9"
  },
  {
    id: 2,
    date: "9/6/2025",
    time: "3:45 pm",
    endTime: "5:15pm",
    division: "7U Hybrid",
    visitingTeam: "King Academy",
    homeTeam: "Brooklyn Cougars",
    location: "Riverside Park - Field 9"
  },
  {
    id: 3,
    date: "9/13/2025",
    time: "2:00 pm",
    endTime: "3:45pm",
    division: "7U Hybrid",
    visitingTeam: "King Academy",
    homeTeam: "Brooklyn Bombers",
    location: "Annunciation Field"
  },
  {
    id: 4,
    date: "9/13/2025",
    time: "4:00 pm",
    endTime: "5:45pm",
    division: "7U Hybrid",
    visitingTeam: "Brooklyn Bombers",
    homeTeam: "King Academy",
    location: "Annunciation Field"
  },
  {
    id: 5,
    date: "9/21/2025",
    time: "1:30 pm",
    endTime: "3:15pm",
    division: "7U Hybrid",
    visitingTeam: "King Academy",
    homeTeam: "Bluebird",
    location: "Randall Island"
  },
  {
    id: 6,
    date: "9/21/2025",
    time: "3:30 pm",
    endTime: "5:15pm",
    division: "7U Hybrid",
    visitingTeam: "Bluebird",
    homeTeam: "King Academy",
    location: "Randall Island"
  },
  {
    id: 7,
    date: "9/27/2025",
    time: "2:00 pm",
    endTime: "3:45pm",
    division: "7U Hybrid",
    visitingTeam: "King Academy",
    homeTeam: "EEP Bandits",
    location: "Annunciation Field"
  },
  {
    id: 8,
    date: "9/27/2025",
    time: "4:00 pm",
    endTime: "5:45pm",
    division: "7U Hybrid",
    visitingTeam: "EEP Bandits",
    homeTeam: "King Academy",
    location: "Annunciation Field"
  },
  {
    id: 9,
    date: "10/4/2025",
    time: "2:00 pm",
    endTime: "3:45pm",
    division: "7U Hybrid",
    visitingTeam: "King Academy",
    homeTeam: "Bonnie - Tigers",
    location: "Annunciation Field"
  },
  {
    id: 10,
    date: "10/4/2025",
    time: "4:00 pm",
    endTime: "5:45pm",
    division: "7U Hybrid",
    visitingTeam: "Bonnie - Tigers",
    homeTeam: "King Academy",
    location: "Annunciation Field"
  }
];