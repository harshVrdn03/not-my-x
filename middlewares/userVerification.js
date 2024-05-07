import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma.js";

const userVerification = async (req, res, next) => {
  const { token } = req.body;
  console.log(token);
  try {
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY); // Use environment variable for JWT secret
    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        image: true,
        following: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error verifying token:", error);
    if (error.message === "jwt expired" || error.message === "invalid token") {
      res.status(401).json({ message: "Unauthorized access" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export default userVerification;
