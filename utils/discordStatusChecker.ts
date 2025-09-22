
// Discord Status Checker Utility
// Note: This is a simulated implementation for demonstration purposes
// In a real app, you would need to use Discord's API with proper authentication

export interface DiscordUser {
  id: string;
  username: string;
  discriminator?: string;
  avatar?: string;
}

export interface StatusCheckResult {
  userId: string;
  username: string;
  displayedStatus: 'online' | 'offline' | 'idle' | 'invisible';
  actualStatus: 'online' | 'offline' | 'idle' | 'invisible';
  isHiding: boolean;
  lastSeen?: string;
  activity?: string;
  error?: string;
}

// Simulated user database for demo purposes
const mockUsers: Record<string, DiscordUser & { 
  displayedStatus: string; 
  actualStatus: string; 
  activity?: string;
  lastSeen?: string;
}> = {
  '123456789012345678': {
    id: '123456789012345678',
    username: 'GamerPro2024',
    displayedStatus: 'offline',
    actualStatus: 'online',
    activity: 'Playing Valorant',
    lastSeen: '2 minutes ago'
  },
  '987654321098765432': {
    id: '987654321098765432',
    username: 'StealthyNinja',
    displayedStatus: 'invisible',
    actualStatus: 'online',
    activity: 'In a voice channel',
    lastSeen: 'Just now'
  },
  '456789123456789123': {
    id: '456789123456789123',
    username: 'CasualUser',
    displayedStatus: 'online',
    actualStatus: 'online',
    activity: 'Listening to Spotify',
  },
  '789123456789123456': {
    id: '789123456789123456',
    username: 'IdlePlayer',
    displayedStatus: 'idle',
    actualStatus: 'idle',
    lastSeen: '15 minutes ago'
  },
};

export async function checkDiscordStatus(userIdOrUsername: string): Promise<StatusCheckResult> {
  console.log('Checking Discord status for:', userIdOrUsername);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Try to find user by ID first, then by username
  let userData = mockUsers[userIdOrUsername];
  
  if (!userData) {
    // Search by username
    userData = Object.values(mockUsers).find(
      user => user.username.toLowerCase() === userIdOrUsername.toLowerCase()
    );
  }

  if (!userData) {
    // Generate a random result for unknown users to demonstrate functionality
    const randomStatuses = ['online', 'offline', 'idle', 'invisible'] as const;
    const displayedStatus = randomStatuses[Math.floor(Math.random() * randomStatuses.length)];
    const actualStatus = randomStatuses[Math.floor(Math.random() * randomStatuses.length)];
    
    console.log('User not found, generating random result');
    
    return {
      userId: userIdOrUsername,
      username: userIdOrUsername.length > 10 ? `User${userIdOrUsername.slice(-4)}` : userIdOrUsername,
      displayedStatus,
      actualStatus,
      isHiding: displayedStatus !== actualStatus,
      lastSeen: Math.random() > 0.5 ? `${Math.floor(Math.random() * 60)} minutes ago` : undefined,
      activity: Math.random() > 0.6 ? 'Unknown activity' : undefined,
    };
  }

  const result: StatusCheckResult = {
    userId: userData.id,
    username: userData.username,
    displayedStatus: userData.displayedStatus as any,
    actualStatus: userData.actualStatus as any,
    isHiding: userData.displayedStatus !== userData.actualStatus,
    lastSeen: userData.lastSeen,
    activity: userData.activity,
  };

  console.log('Status check result:', result);
  return result;
}

export function isValidDiscordId(id: string): boolean {
  // Discord IDs are 17-19 digit numbers
  return /^\d{17,19}$/.test(id);
}

export function formatDiscordUsername(username: string, discriminator?: string): string {
  if (discriminator && discriminator !== '0') {
    return `${username}#${discriminator}`;
  }
  return username;
}
