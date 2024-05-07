import prisma from "../prisma/prisma.js";
import bcrypt from "bcrypt";
const register = async (req, res) => {
  try {
    const { username, email, password, image } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
    if (existingUser) {
      return res
        .status(401)
        .json({ message: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserName = username[0] === "@" ? username : "@" + username;

    const newUser = await prisma.user.create({
      data: {
        username: newUserName,
        email,
        password: hashedPassword,
        image,
      },
    });

    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).json({ message: "Failed to register user" });
  }
};
export default register;
