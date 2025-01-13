import { StaticImageData } from "next/image";

export interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  profilePic: StaticImageData;
  smiles: number;
  bio: string;
  friends: number;
  plansJoined: number[];
  plansCreated: number[];
  recentActivities: {
    activity: string;
    time: string;
  }[];
}
