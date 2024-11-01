import { useContext, useState } from "react";
import { UserContext } from "../App";
import { toast, Toaster } from "react-hot-toast";
import { BlogContext } from "../pages/blog.page";
import axios from "axios";

const CommentField = ({ action }) => {
    const {
        blog,
        blog: {
            _id,
            author: { _id: blog_author },
            comments,
            comments: { results: commentsArr = [] } = {},
            activity,
            activity: { total_comments, total_parent_comments },
        },
        setBlog,
        setTotalParentCommentsLoaded,
    } = useContext(BlogContext);
    
    const { userAuth: { access_token, username, fullname, profile_img } } = useContext(UserContext);
    
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const handleComment = async () => {
        if (!access_token) {
            return toast.error("Kindly log in to leave a comment.");
        }
        if (!comment.trim().length) {
            return toast.error("Write something to leave a comment.");
        }
    
        try {
            setLoading(true); // Start loading
            const { data } = await axios.post(
                `${import.meta.env.VITE_SERVER_DOMAIN}/add-comment`,
                { _id: blog._id, blog_author, comment },
                {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                    },
                }
            );
    
            // Reset comment field
            setComment("");

            // Prepare the new comment
            data.commented_by = { personal_info: { username, profile_img, fullname } };
            data.childrenLevel = 0;

            // Update comments array
            const newCommentArr = [data, ...commentsArr];

            // Update blog state
            setBlog(prevBlog => ({
                ...prevBlog,
                comments: { ...prevBlog.comments, results: newCommentArr },
                activity: {
                    ...prevBlog.activity,
                    total_comments: prevBlog.activity.total_comments + 1,
                    total_parent_comments: prevBlog.activity.total_parent_comments + 1,
                },
            }));
    
            setTotalParentCommentsLoaded(prevVal => prevVal + 1);
        } catch (err) {
            console.error("Error adding comment:", err);
            toast.error("There was an error adding your comment. Please try again.");
        } finally {
            setLoading(false); // Ensure loading state is reset
        }
    };

    return (
        <>
            <Toaster />
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Leave a comment..."
                className="input-box pl-5 placeholder:text-dark-grey resize-none h-[150px] overflow-auto"
                aria-label="Comment"
            />
            <button
                className="btn-dark mt-5 px-10"
                onClick={handleComment}
                aria-label={`Submit ${action} comment`}
                disabled={loading} // Disable button while loading
            >
                {loading ? "Submitting..." : action}
            </button>
        </>
    );
};

export default CommentField;
