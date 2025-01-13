import { StaticImageData } from "next/image";
export interface Plan {
  plan_id: number;
  name: string;
  description: string;
  time: string;
  date: string;
  location: string;
  created_by: string;
  smiles: number;
  status: string;
  participants: number;
  max_participants: number;
  is_free: boolean;
  category: string;
  image: StaticImageData;
  price?: string;
}
