import prisma from "../prisma/prisma.js";
const createPost = async (req, res) => {
  try {
    const { text, imageUrl } = req.body;
    const { userId } = req;
    const post = await prisma.post.create({
      data: {
        content: text,
        userId,
        imageUrl,
      },
    });

    res.status(201).json({ success: true, post });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "Failed to create post", error: err }); // Use 500 for unexpected errors
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        User: {
          select: { email: true, username: true, image: true, id: true },
        },
      },
    });

    res.status(201).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to retrieve posts" });
  }
};

const myPosts = async (req, res) => {
  const { userId } = req;
  try {
    const posts = await prisma.post.findMany({
      where: {
        userId: userId,
      },
      include: {
        User: {
          select: { email: true, username: true, image: true, id: true },
        },
      },
    });
    return res.status(201).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const deletePost = async (req, res) => {
  const { userId } = req;
  const { postId } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId, userId },
    });

    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found or unauthorized deletion" });
    }

    await prisma.post.delete({ where: { id: postId } });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export { createPost, getPosts, myPosts, deletePost };
