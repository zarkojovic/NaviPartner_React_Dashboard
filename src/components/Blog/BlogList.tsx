import React, {useState, useEffect} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {selectBlogsByUserId} from "../../redux/blog/blogSlice";
import BlogItem from "../Blog/BlogItem";

interface BlogListProps {
    userId: number;
}

const BlogList: React.FC<BlogListProps> = ({userId}) => {
    const blogsFromUser = useTypedSelector((state) => selectBlogsByUserId(state, userId));
    const [deleteMessage, setDeleteMessage] = useState("");

    const handleDeleteMessage = (message: string) => {
        setDeleteMessage(message);
        setTimeout(() => {
            setDeleteMessage("");
        }, 3000); // Clear the message after 3 seconds
    };

    if (blogsFromUser.length === 0) {
        return (
            <div className="p-3 border flex items-center justify-center rounded">
                <h2 className="text-lg">No blogs available for this user</h2>
            </div>
        );
    }

    return (
        <div className="h-screen overflow-y-scroll">
            <h2 className="text-xl font-bold mb-3">Blogs</h2>
            {deleteMessage && (
                <div
                    className="bg-green-300 text-green-700 p-3 text-center rounded-lg border border-green-500 text-xs font-bold mb-3">
                    {deleteMessage}
                </div>
            )}
            <div className="grid grid-cols-1 gap-2">
                {blogsFromUser.map((blog) => (
                    <BlogItem key={blog.id} blog={blog} onDeleteMessage={handleDeleteMessage}/>
                ))}
            </div>
        </div>
    );
};

export default BlogList;