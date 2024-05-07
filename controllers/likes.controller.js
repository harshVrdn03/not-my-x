import prisma from "../prisma/prisma.js";

const getLikes = async (req, res) => {
  const { postId } = req.params;

  try {
    const data = await prisma.like.findMany({
      where: { postId },
      include: {
        user: {
          select: { id: true, username: true, image: true }, // Include desired user details
        },
      },
    });

    res.json(data);
  } catch (error) {
    console.error("Error fetching likes:", error);
    res.status(500).json({ message: "Error fetching likes" }); // Specific error message
  }
};
const setLike = async (req, res) => {
  const { userId } = req;
  const { postId } = req.params;
  try {
    const existingLike = await prisma.like.findFirst({
      where: { userId, postId },
    });
    console.log(postId, userId, existingLike);

    if (existingLike) {
      await prisma.like.delete({ where: { id: existingLike.id } });
      res.json({ message: "Like removed successfully" });
    } else {
      const newLike = await prisma.like.create({
        data: { userId, postId },
      });
      res.json({ message: "Like added successfully", like: newLike });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating/removing like" });
  }
};
export { setLike };
export default getLikes;
