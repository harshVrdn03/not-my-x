import prisma from "../prisma/prisma.js";

const commentController = async (req, res) => {
  const { userId } = req;
  const { postId } = req.params; // Accessing postId from route params
  const { comment } = req.body; // Assuming the comment text is sent in the request body
  console.log(comment);
  try {
    // Create the comment using Prisma
    const newComment = await prisma.comment.create({
      data: {
        comment: comment,
        userId: userId,
        postId: postId,
      },
    });

    res.status(201).json({ success: true, comment: newComment });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ success: false, error: "Failed to create comment" });
  }
};
const getComments = async (req, res) => {
  // const { userId } = req;
  const { postId } = req.params;
  try {
    console.log(postId, "commentsId");
    // Fetch all comments for the given postId along with user information
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      include: {
        user: true,
      },
    });

    res.status(200).json({ success: true, comments: comments });
  } catch (error) {
    console.error("Error retrieving comments:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to retrieve comments" });
  }
};
export { getComments };
export default commentController;
