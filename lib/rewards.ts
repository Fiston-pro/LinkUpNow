import { RewardsData } from "@/models/Rewards"; // Ensure this import is correct
import FreeCoffee from "../images/FreeCoffee.jpg";
import CoworkingDiscount from "../images/CoworkingDiscount.jpg";
import FreeGymPass from "../images/FreeGymPass.jpg";
import DinnerDiscount from "../images/DinnerDiscount.jpg";
import FreeYogaClass from "../images/FreeYogaClass.jpg";
import MovieTickets from "../images/MovieTickets.jpg";
import GalleryEntry from "../images/GalleryEntry.jpg";
import KoreanRestaurantDiscount from "../images/KoreanRestaurantDiscount.jpg";
import CookingSession from "../images/CookingSession.jpg";
import LyfTshirt from "../images/LyfTshirt.jpg";
import SunsetCruise from "../images/SunsetCruise.jpg";

export const rewards: RewardsData = {
  rewards: {
    lyfDiscounts: {
      title: "Discounts at lyf Funan",
      items: [
        {
          rewardId: "001",
          name: "☕️ Free Coffee at Bond Café",
          description: "Enjoy a free coffee at the Bond Café inside lyf Funan.",
          validity: "Valid until October 30, 2024",
          smilesCost: 50,
          provider: "lyf Funan",
          location: "Bond Café, 1st Floor",
          type: "food",
          emoji: "☕️",
          imageUrl: FreeCoffee,
        },
        {
          rewardId: "002",
          name: "💻 10% Off Co-working Space Booking",
          description:
            "Get 10% off your next booking at Connect, lyf Funan's co-working space.",
          validity: "Valid until November 15, 2024",
          smilesCost: 100,
          provider: "lyf Funan",
          location: "Connect, 2nd Floor",
          type: "service",
          emoji: "💻",
          imageUrl: CoworkingDiscount,
        },
        {
          rewardId: "003",
          name: "🏋️‍♂️ Free Gym Pass",
          description:
            "Access the Burn gym for free for one day. Stay active while at lyf!",
          validity: "Valid until December 1, 2024",
          smilesCost: 150,
          provider: "lyf Funan",
          location: "Burn Gym, 3rd Floor",
          type: "fitness",
          emoji: "🏋️‍♂️",
          imageUrl: FreeGymPass,
        },
      ],
    },
    nearbyBusinessDiscounts: {
      title: "Deals from Nearby Businesses",
      items: [
        {
          rewardId: "004",
          name: "🍽️ 20% Off Dinner at Bento by Eight Café & Studio",
          description:
            "Enjoy 20% off your dinner at Bento by Eight, located just minutes away from lyf Funan.",
          validity: "Valid until October 31, 2024",
          smilesCost: 200,
          provider: "Bento by Eight Café & Studio",
          location: "8 Raffles Ave, Singapore",
          type: "food",
          emoji: "🍽️",
          imageUrl: DinnerDiscount,
        },
        {
          rewardId: "005",
          name: "🧘 Free Yoga Class at Yoga Movement",
          description:
            "Attend a free yoga class at Yoga Movement, just around the corner from lyf Funan.",
          validity: "Valid until November 20, 2024",
          smilesCost: 250,
          provider: "Yoga Movement",
          location: "22 Keong Saik Rd, Singapore",
          type: "wellness",
          emoji: "🧘",
          imageUrl: FreeYogaClass,
        },
        {
          rewardId: "006",
          name: "🎬 2-for-1 Movie Tickets at The Projector",
          description:
            "Buy one movie ticket and get another free at The Projector, a nearby boutique cinema.",
          validity: "Valid until October 28, 2024",
          smilesCost: 180,
          provider: "The Projector",
          location: "6001 Beach Rd, Singapore",
          type: "entertainment",
          emoji: "🎬",
          imageUrl: MovieTickets,
        },
        {
          rewardId: "007",
          name: "🖼️ Free Entry to National Gallery Singapore",
          description:
            "Explore Southeast Asian art with free entry to the National Gallery Singapore, a short walk from lyf Funan.",
          validity: "Valid until December 15, 2024",
          smilesCost: 220,
          provider: "National Gallery Singapore",
          location: "1 St. Andrew's Rd, Singapore",
          type: "entertainment",
          emoji: "🖼️",
          imageUrl: GalleryEntry,
        },
        {
          rewardId: "008",
          name: "🍜 15% Off at Ajumma’s Korean Restaurant",
          description:
            "Enjoy 15% off your meal at Ajumma’s Korean Restaurant, a popular spot just near lyf Funan.",
          validity: "Valid until November 30, 2024",
          smilesCost: 170,
          provider: "Ajumma’s Korean Restaurant",
          location: "109 North Bridge Rd, Singapore",
          type: "food",
          emoji: "🍜",
          imageUrl: KoreanRestaurantDiscount,
        },
      ],
    },
    specialOffers: {
      title: "Special Offers and Experiences",
      items: [
        {
          rewardId: "009",
          name: "👨‍🍳 Private Cooking Session at Bond Kitchen",
          description:
            "Join a private cooking session with a professional chef at Bond Kitchen. Learn to cook local dishes!",
          validity: "Valid until December 5, 2024",
          smilesCost: 300,
          provider: "lyf Funan",
          location: "Bond Kitchen, 1st Floor",
          type: "experience",
          emoji: "👨‍🍳",
          imageUrl: CookingSession,
        },
        {
          rewardId: "010",
          name: "👕 Exclusive lyf T-shirt",
          description:
            "Get an exclusive lyf-branded T-shirt, only available for community members.",
          validity: "Until stocks last",
          smilesCost: 120,
          provider: "lyf Funan",
          location: "Reception Desk",
          type: "merchandise",
          emoji: "👕",
          imageUrl: LyfTshirt,
        },
        {
          rewardId: "011",
          name: "🚤 Sunset River Cruise",
          description:
            "Enjoy a scenic sunset cruise on the river. A relaxing way to end your day at lyf.",
          validity: "Valid until November 30, 2024",
          smilesCost: 350,
          provider: "Riverboat Tours",
          location: "Pier 3, River Road",
          type: "experience",
          emoji: "🚤",
          imageUrl: SunsetCruise,
        },
      ],
    },
  },
};
