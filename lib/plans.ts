import Yoga from "../images/yoga.jpeg";
import DigitalNomads from "../images/digital-meetup.jpeg";
import MovieNight from "../images/movie-night.jpeg";
import CookingWorkshop from "../images/cooking.png";
import PhotographyWalk from "../images/photography.jpg";
import NightRun from "../images/running.jpg";
import BoardGames from "../images/board-games.jpg";
import KaraokeNight from "../images/karoke.jpg";
import WeekendBrunch from "../images/kitchen.jpg";
import CyclingAdventure from "../images/cycling.jpg";
import ChinatownTour from "../images/ChinatownTour.jpg";
import HawkerCenterTour from "../images/HawkerCenterTour.jpg";
import LocalCoffeeWorkshop from "../images/LocalCoffeeWorkshop.jpg";

export const data = {
  community: {
    name: "lyf Funan",
    location: "Singapore",
    description:
      "A vibrant hub of social activities, located in the heart of Singapore. Experience community-driven events, coworking, and creative engagements.",
    members: 245,
  },
  categories: [

    {
      title: "Plans for you",
      plans: [
        {
          plan_id: 1,
          name: "Morning Yoga at the Rooftop",
          description:
            "Start your day with an energizing yoga session on our scenic rooftop. Open to all skill levels.",
          time: "7:00 AM - 8:00 AM",
          date: "2024-10-21",
          location: "Rooftop",
          created_by: "lyf Funan",
          smiles: 0,
          status: "Open",
          participants: 12,
          max_participants: 20,
          is_free: true,
          category: "Health & Wellness",
          image: Yoga,
          groupChat: [
            { id: 1, userId: 1, message: "Anyone ready for some morning stretches?", timestamp: "6:30 AM" },
            { id: 2, userId: 2, message: "I can’t wait! This view will be amazing for yoga.", timestamp: "6:35 AM" },
            { id: 3, userId: 3, message: "Does anyone have an extra yoga mat?", timestamp: "6:45 AM" },
          ],
        },
        {
          plan_id: 2,
          name: "Digital Nomads Meetup",
          description:
            "Meet fellow remote workers and digital nomads over coffee at the Bond kitchen.",
          time: "3:00 PM - 5:00 PM",
          date: "2024-10-21",
          location: "Bond Kitchen",
          created_by: "AI",
          smiles: 5,
          status: "Open",
          participants: 8,
          max_participants: 15,
          is_free: true,
          category: "Networking",
          image: DigitalNomads,
          groupChat: [
            { id: 1, userId: 2, message: "Excited to meet some fellow nomads!", timestamp: "2:45 PM" },
            { id: 2, userId: 1, message: "Anyone bringing their laptop? I’ll be working after the meetup.", timestamp: "2:50 PM" },
            { id: 3, userId: 3, message: "I’m grabbing a coffee before the event. See you soon!", timestamp: "2:55 PM" },
          ],
        },
        {
          plan_id: 10,
          name: "Morning Run by the Bay",
          description:
            "Join fellow fitness enthusiasts for a refreshing night run around Marina Bay.",
          time: "9:00 PM - 10:00 PM",
          date: "2024-10-21",
          location: "Meet at lyf Lobby",
          created_by: "You",
          smiles: 0,
          status: "Joined",
          participants: 4,
          max_participants: 10,
          is_free: true,
          category: "Fitness",
          image: NightRun,
          groupChat: [
            { id: 1, userId: 1, message: "Ready to hit the pavement!", timestamp: "8:30 PM" },
            { id: 2, userId: 2, message: "I hope we get to see some cool city lights during the run.", timestamp: "8:35 PM" },
            { id: 3, userId: 3, message: "I’ll bring some water, who’s with me?", timestamp: "8:40 PM" },
          ],
        },
      ],
    },
    {
      title: "Tonight",
      plans: [
        {
          plan_id: 9,
          name: "Karaoke Night",
          description:
            "Sing your heart out with fellow residents at a fun-filled karaoke night!",
          time: "9:00 PM - 11:00 PM",
          date: "2024-10-21",
          location: "Meet/Huddle Space",
          created_by: "lyf Funan",
          smiles: 5,
          status: "Open",
          participants: 10,
          max_participants: 20,
          is_free: true,
          category: "Entertainment",
          image: KaraokeNight,
          groupChat: [
            { id: 1, userId: 1, message: "I’ve been practicing my favorite song all week!", timestamp: "8:45 PM" },
            { id: 2, userId: 2, message: "What’s everyone planning to sing tonight?", timestamp: "8:50 PM" },
            { id: 3, userId: 3, message: "I’m ready to show off my karaoke skills!", timestamp: "8:55 PM" },
          ],
        },
        
        {
          plan_id: 3,
          name: "Movie Night: Sci-Fi Classics",
          description:
            "Unwind with fellow residents and enjoy a selection of classic sci-fi movies.",
          time: "8:00 PM - 10:30 PM",
          date: "2024-10-21",
          location: "Meet/Huddle Space",
          created_by: "lyf Funan",
          smiles: 10,
          status: "Open",
          participants: 30,
          max_participants: 35,
          is_free: true,
          category: "Entertainment",
          image: MovieNight,
          groupChat: [
            { id: 1, userId: 1, message: "Can’t wait for some classic sci-fi!", timestamp: "7:30 PM" },
            { id: 2, userId: 2, message: "Is it okay if I bring snacks?", timestamp: "7:35 PM" },
            { id: 3, userId: 3, message: "Which movies are we watching?", timestamp: "7:40 PM" },
          ],
        },
        {
          plan_id: 11,
          name: "Board Games Night",
          description:
            "Challenge your neighbors to a night of strategy and fun with classic board games.",
          time: "7:00 PM - 9:00 PM",
          date: "2024-10-23",
          location: "Bond Kitchen",
          created_by: "You",
          smiles: 10,
          status: "Created",
          participants: 3,
          max_participants: 8,
          is_free: true,
          category: "Entertainment",
          image: BoardGames,
          groupChat: [
            { id: 1, userId: 1, message: "Who’s up for a game of Monopoly tonight?", timestamp: "6:30 PM" },
            { id: 2, userId: 2, message: "I’ll bring my favorite board games for everyone to enjoy.", timestamp: "6:35 PM" },
            { id: 3, userId: 3, message: "I’m in for a game of Scrabble!", timestamp: "6:40 PM" },
          ],
        },
      ],
    },
    {
      title: "Weekend",
      plans: [
        {
          plan_id: 12,
          name: "Weekend Brunch at the Bond Kitchen",
          description:
            "Enjoy a delicious brunch and meet new people in the lyf Funan community.",
          time: "10:00 AM - 12:00 PM",
          date: "2024-10-26",
          location: "Bond Kitchen",
          created_by: "lyf Funan",
          smiles: 10,
          status: "Open",
          participants: 15,
          max_participants: 25,
          is_free: false,
          price: "$25",
          category: "Food & Beverage",
          image: WeekendBrunch,
          groupChat: [
            { id: 1, userId: 1, message: "I can’t wait to try the brunch menu!", timestamp: "9:30 AM" },
            { id: 2, userId: 2, message: "I heard they have amazing pancakes!", timestamp: "9:35 AM" },
          ]
        },
        {
          plan_id: 13,
          name: "Cycling Adventure",
          description:
            "Explore the city on two wheels with a cycling adventure to the Marina Barrage.",
          time: "8:00 AM - 11:00 AM",
          date: "2024-10-27",
          location: "Meet at lyf Lobby",
          created_by: "User456",
          smiles: 15,
          status: "Open",
          participants: 6,
          max_participants: 10,
          is_free: true,
          price: "20",
          category: "Fitness",
          image: CyclingAdventure,
          groupChat: [
            { id: 1, userId: 1, message: "I’m bringing my bike for the ride!", timestamp: "7:30 AM" },
            { id: 2, userId: 2, message: "I hope we get to see the city skyline from the Barrage.", timestamp: "7:35 AM" },
            { id: 3, userId: 3, message: "Is there a place to rent bikes nearby?", timestamp: "7:40 AM" },
          ],
        },
      ],
    },
    {
      title: "Local Exploration",
      plans: [
        {
          plan_id: 4,
          name: "Chinatown Heritage Tour",
          description:
            "Explore the rich history and vibrant culture of Singapore's Chinatown district.",
          time: "10:00 AM - 12:00 PM",
          date: "2024-10-22",
          location: "Meet at lyf Lobby",
          created_by: "AI",
          smiles: 15,
          status: "Open",
          participants: 10,
          max_participants: 20,
          is_free: false,
          price: "$30",
          category: "Cultural Exploration",
          image: ChinatownTour,
          groupChat: [
            { id: 1, userId: 1, message: "Who else is excited to explore Chinatown?", timestamp: "9:00 AM" },
            { id: 2, userId: 2, message: "I’ve been looking forward to this tour all week!", timestamp: "9:10 AM" },
            { id: 3, userId: 3, message: "Is there anything specific we should bring?", timestamp: "9:20 AM" },
          ],
        },
        {
          plan_id: 5,
          name: "Hawker Center Food Tour",
          description:
            "Indulge in a guided food tour through some of Singapore’s famous hawker centers.",
          time: "6:00 PM - 8:00 PM",
          date: "2024-10-22",
          location: "Meet at lyf Lobby",
          created_by: "AI",
          smiles: 20,
          status: "Open",
          participants: 12,
          max_participants: 15,
          is_free: false,
          price: "$50",
          category: "Food & Beverage",
          image: HawkerCenterTour,
          groupChat: [
            { id: 1, userId: 1, message: "I hope we get to try some Hainanese chicken rice!", timestamp: "5:30 PM" },
            { id: 2, userId: 2, message: "Can’t wait to try all the local dishes!", timestamp: "5:35 PM" },
            { id: 3, userId: 3, message: "Is there a specific food stall we’re starting at?", timestamp: "5:40 PM" },
          ],
        },
        {
          plan_id: 6,
          name: "Photography Walk: Explore Singapore",
          description:
            "Capture the beauty of Singapore’s urban landscape with a guided photography walk.",
          time: "5:00 PM - 7:00 PM",
          date: "2024-10-22",
          location: "Meet at lyf Lobby",
          created_by: "User123",
          smiles: 10,
          status: "Open",
          participants: 7,
          max_participants: 10,
          is_free: true,
          category: "Arts & Culture",
          image: PhotographyWalk,
          groupChat: [
            { id: 1, userId: 1, message: "What type of camera are you bringing?", timestamp: "4:45 PM" },
            { id: 2, userId: 2, message: "I’m bringing my DSLR. Hope to get some great city shots!", timestamp: "4:50 PM" },
            { id: 3, userId: 3, message: "Looking forward to capturing the skyline at sunset!", timestamp: "4:55 PM" },
          ],
        },
      ],
    },
    {
      title: "Workshops & Experiences",
      plans: [
        {
          plan_id: 7,
          name: "Cooking Workshop: Local Delights",
          description:
            "Learn how to prepare traditional Singaporean dishes at our cooking workshop.",
          time: "4:00 PM - 6:00 PM",
          date: "2024-10-22",
          location: "Bond Kitchen",
          created_by: "AI",
          smiles: 15,
          status: "Open",
          participants: 5,
          max_participants: 10,
          is_free: false,
          price: "$40",
          category: "Food & Beverage",
          image: CookingWorkshop,
          groupChat: [
            { id: 1, userId: 1, message: "I’m so excited to learn how to cook local dishes!", timestamp: "3:30 PM" },
            { id: 2, userId: 2, message: "This is my first time in a cooking class, any tips?", timestamp: "3:40 PM" },
            { id: 3, userId: 3, message: "I hope we get the recipes to try at home!", timestamp: "3:50 PM" },
          ],
        },
        {
          plan_id: 8,
          name: "Local Coffee Brewing Workshop",
          description:
            "Discover the art of brewing local coffee and learn the traditional techniques.",
          time: "10:00 AM - 12:00 PM",
          date: "2024-10-23",
          location: "Bond Kitchen",
          created_by: "User789",
          smiles: 5,
          status: "Open",
          participants: 8,
          max_participants: 10,
          is_free: false,
          price: "$20",
          category: "Food & Beverage",
          image: LocalCoffeeWorkshop,
          groupChat: [
            { id: 1, userId: 1, message: "I’m so excited to learn how to cook local dishes!", timestamp: "3:30 PM" },
            { id: 2, userId: 2, message: "This is my first time in a cooking class, any tips?", timestamp: "3:40 PM" },
            { id: 3, userId: 3, message: "I hope we get the recipes to try at home!", timestamp: "3:50 PM" },
          ],
        },
      ],
    },
  ],
};
