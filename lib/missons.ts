export const missions = {
    missions: {
      dailyMissions: {
        title: "Daily Missions",
        items: [
          {
            missionId: "001",
            icon: "📝", // Plan-related task
            name: "Join Your First Plan",
            description: "Find a plan that interests you and join it to connect with others!",
            reward: 20,
            progress: "Not Started",
            deadline: "Today at 11:59 PM",
            status: "active"
          },
          {
            missionId: "002",
            icon: "🤝", // Social task
            name: "Add 3 New Friends",
            description: "Meet new people in the LYF community and add them as friends.",
            reward: 15,
            steps: 3, // Total steps needed to complete the mission
            currentStep: 1, // Current progress of the mission
            progress: "In Progress", // Update progress based on current step
            deadline: "Today at 11:59 PM",
            status: "active"
          },
          {
            missionId: "003",
            icon: "🏆", // Rewards-related task
            name: "Explore the Rewards Hub",
            description: "Visit the Rewards Hub to check out available discounts and vouchers.",
            reward: 10,
            progress: "In Progress",
            deadline: "Today at 11:59 PM",
            status: "active"
          },
          {
            missionId: "004",
            icon: "🎉", // Community engagement
            name: "Post an Activity in Your Community",
            description: "Create a new plan or activity for others to join.",
            reward: 25,
            progress: "Not Started",
            deadline: "Today at 11:59 PM",
            status: "active"
          },
          {
            missionId: "005",
            icon: "💬", // Interaction with AI
            name: "Chat with the AI Assistant",
            description: "Ask a question or get help from the AI assistant in SmileUp.",
            reward: 5,
            progress: "Completed",
            deadline: "Today at 11:59 PM",
            status: "completed"
          }
        ]
      },
      weeklyMissions: {
        title: "Weekly Missions",
        items: [
          {
            missionId: "006",
            icon: "🎉", // Community event participation
            name: "Attend 3 Community Events",
            description: "Participate in at least 3 plans or activities this week.",
            reward: 50,
            steps: 3, // Total number of events to attend
            currentStep: 2, // User has already attended 2 events
            progress: "In Progress",
            deadline: "This Week",
            status: "active"
          },
          {
            missionId: "007",
            icon: "📝", // Plan creation task
            name: "Create 2 Plans",
            description: "Host 2 plans for others to join in your LYF community.",
            reward: 40,
            steps: 2, // Total number of plans to create
            currentStep: 0, // No plans created yet
            progress: "Not Started",
            deadline: "This Week",
            status: "active"
          },
          {
            missionId: "008",
            icon: "😄", // Smiles-related task
            name: "Earn 100 Smiles",
            description: "Complete missions or join plans to earn at least 100 Smiles this week.",
            reward: 75,
            progress: "In Progress",
            deadline: "This Week",
            status: "active"
          },
          {
            missionId: "009",
            icon: "🏆", // Rewards-related task
            name: "Redeem a Voucher in the Rewards Hub",
            description: "Use your Smiles to redeem a discount or offer from the Rewards Hub.",
            reward: 30,
            progress: "Not Started",
            deadline: "This Week",
            status: "active"
          },
          {
            missionId: "010",
            icon: "🤝", // Social task
            name: "Make 5 New Friends",
            description: "Connect with at least 5 new residents or users this week.",
            reward: 50,
            steps: 5, // Total number of friends to add
            currentStep: 3, // User has already added 3 new friends
            progress: "In Progress", // Update based on currentStep
            deadline: "This Week",
            status: "active"
          }
        ]
      }
    }
  };
  