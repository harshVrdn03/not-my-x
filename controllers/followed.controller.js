import prisma from "../prisma/prisma.js";

const followed = async (req, res) => {
  const { userId } = req;
  const { followingId } = req.params;
  console.log(followingId);
  try {
    // Check if already followed (single database call)
    const { following } = await prisma.user.findUnique({
      where: { id: userId },
      select: { following: true },
    });
    if (following.includes(followingId)) {
      res.status(404).json("already_followed");
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        following: {
          push: followingId,
        },
      },
    });

    res.json("Following successful");
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: error.message });
  }
};

const FollowingPosts = async (req, res) => {
  const { userId } = req;
  console.log(userId, "following");
  try {
    const { following } = await prisma.user.findUnique({
      where: { id: userId },
      select: { following: true },
    });
    const posts = await prisma.post.findMany({
      where: { userId: { in: following } },
      include: { User: true }, // Include user information for efficiency
    });

    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};

const getFollowing = async (req, res) => {
  const { userId } = req;
  console.log(userId);
  try {
    const { following } = await prisma.user.findUnique({
      where: { id: userId },
      select: { following: true },
    });
    if (following.length === 0) {
      return res.json({ message: "User not found" });
    }
    const friends = await prisma.user.findMany({
      where: { id: { in: following } },
    });
    console.log(friends);
    res.json({ message: "true", friends });
  } catch (error) {
    console.log(error);
  }
};

const unfollowed = async (req, res) => {
  const { followingId } = req.params;
  const { userId } = req;

  try {
    // Update user, removing followingId

    const { following } = await prisma.user.findUnique({
      where: { id: userId },
      select: { following: true },
    });
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        following: {
          set: following.filter((id) => id !== followingId),
        },
      },
    });
    res.status(201).json({ message: "Unfollowed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error unfollowing user" });
  }
};
export { FollowingPosts, getFollowing, unfollowed };
export default followed;
