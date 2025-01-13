import { StaticImageData } from "next/image";

export interface Reward {
  rewardId: string;
  name: string;
  description: string;
  validity: string;
  smilesCost: number;
  provider: string;
  location: string;
  type:
    | "food"
    | "service"
    | "fitness"
    | "wellness"
    | "entertainment"
    | "experience"
    | "merchandise";
  emoji: string;
  imageUrl: StaticImageData;
}

export interface RewardSection {
  title: string;
  items: Reward[];
}

export interface RewardsData {
  rewards: {
    [key: string]: RewardSection;
  };
}
