import ahmadPic from "../images/Users/Ahmadzia.png";
import tamimPic from "../images/Users/tamim.jpeg";
import pushkarPic from "../images/Users/pushkar.jpg";
import fistonPic from "../images/Users/fiston.jpeg";
import juliaPic from "../images/Users/pretty.jpg";


export const users = [
  {
    id: 1,
    name: "Ahmed Zia",
    age: 26,
    email: "ahmed.zia@gmail.com",
    profilePic: ahmadPic,
    interests: ["Yoga", "Photography", "Cooking"],
    residency: "lyf Funan Singapore",
    smiles: 50,
    bio: "A yoga enthusiast and amateur photographer. Loves cooking and exploring new places.",
    joinedPlans: [1, 2]
  },
  {
    id: 2,
    name: "Pushkar sareen",
    age: 30,
    email: "sareenpushkar@gmail.com",
    profilePic: pushkarPic,
    interests: ["Chess", "Football", "coding"],
    residency: "lyf Funan Singapore",
    smiles: 38,
    bio: "Tech geek who loves chess and binge-watching movies on weekends."
  },
  {
    id: 3,
    name: "Fiston",
    age: 33,
    email: "Fiston@gmail.com",
    profilePic: fistonPic,
    interests: ["Cycling", "Programming", "Movies"],
    residency: "lyf Funan Singapore",
    smiles: 38,
    bio: "Tech geek who loves cycling and binge-watching movies on weekends."
  },  {
    id: 4,
    name: "Julia",
    age: 28,
    email: "jualia@gmail.com",
    profilePic: juliaPic,
    interests: ["Makeover", "Dancing", "Writing"],
    residency: "lyf Funan Singapore",
    smiles: 38,
    bio: "A Beautiful Girl who loves doing makeover and writing stories and poems",
    joinedPlans: [3, 4]
  },
  {
    id: 3,
    name: "Tamim",
    age: 28,
    email: "tamim@gmail.com",
    profilePic: tamimPic,
    interests: ["Boxing", "dancing", "cricket"],
    residency: "lyf Funan Singapore",
    smiles: 38,
    bio: "A Guy who likes to do box and dance belle and play cricket",
    joinedPlans: [2, 4]
  }
];

//loged in user(we will alwys this static user as loged in user)

export const userData = {
  id: 4,
  name: "Pushkar",
  age: 30,
  email: "sareenpushkar@gmail.com",
  profilePic: pushkarPic,
  smiles: 100,
  bio: 'Digital Nomad | Travel Enthusiast',
  friends: 12,
  recentActivities: [
    {
      activity: 'Joined "Beach Volleyball"',
      time: '2 hours ago'
    },
    {
      activity: 'Earned 20 Smiles from "AI Chat"',
      time: 'Yesterday'
    },
    {
      activity: 'Added a new friends',
      time: '2 days ago'
    }
  ],
  plansJoined: [2,5],
  plansCreated: [10, 11]
};
