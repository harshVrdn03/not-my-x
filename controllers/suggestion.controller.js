import prisma from "../prisma/prisma.js";

const suggestion = async (req, res) => {
  const { userId } = req;
  try {
    const { following } = await prisma.user.findFirst({
      where: { id: userId },
      select: { following: true },
    });
    const data = await prisma.user.findMany({
      where: {
        NOT: { id: { in: following } },
      },
      select: {
        id: true,
        email: true,
        image: true,
        username: true,
      },
    });
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
export default suggestion;
