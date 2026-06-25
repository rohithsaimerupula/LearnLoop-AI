import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class GamificationService {
  /**
   * Awards XP to a user and handles leveling up.
   */
  async awardXP(userId: string, amount: number, reason: string) {
    console.log(`[Gamification] Awarding ${amount} XP to user ${userId} for ${reason}`);
    
    // In MVP, we just update the user directly
    const user = await prisma.user.update({
      where: { id: userId },
      data: { xp: { increment: amount } }
    });

    // Check level up logic (e.g., Level = floor(sqrt(xp) / 10))
    const expectedLevel = Math.floor(Math.sqrt(user.xp) / 10) + 1;
    if (expectedLevel > user.level) {
      await prisma.user.update({
        where: { id: userId },
        data: { level: expectedLevel }
      });
      console.log(`[Gamification] User ${userId} leveled up to ${expectedLevel}!`);
      // Here we could emit a socket event for "LEVEL_UP"
    }

    return user;
  }

  /**
   * Updates the user's login/learning streak.
   */
  async updateStreak(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return;

    const now = new Date();
    const lastActive = user.lastActiveDate || new Date(0);
    
    // Calculate difference in days (ignoring time)
    const diffTime = Math.abs(now.getTime() - lastActive.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    let newStreak = user.currentStreak;
    if (diffDays === 1) {
      newStreak += 1; // Consecutive day
    } else if (diffDays > 1) {
      newStreak = 1; // Streak broken
    }

    const longestStreak = Math.max(newStreak, user.longestStreak);

    await prisma.user.update({
      where: { id: userId },
      data: {
        currentStreak: newStreak,
        longestStreak,
        lastActiveDate: now
      }
    });
  }
}

export const gamificationService = new GamificationService();
