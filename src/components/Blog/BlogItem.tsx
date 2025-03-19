import React, {useState, useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteBlog} from "../../redux/blog/blogSlice";
import CustomButton from "../Common/Button";
import {faEllipsisV, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CustomModal from "../Common/CustomModal";

interface BlogItemProps {
    blog: {
        id: string;
        title: string;
        datePosted: string;
    };
    onDeleteMessage: (message: string) => void;
}

const BlogItem: React.FC<BlogItemProps> = ({blog, onDeleteMessage}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const handleBlogClick = () => {
        navigate(`/blog/${blog.id}`);
    };

    const deleteBlogHandler = (id: string) => {
        dispatch(deleteBlog(id));
        onDeleteMessage("Blog has been deleted.");
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setShowModal(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef]);

    return (
        <div className="p-3 border rounded-xl  bg-white relative z-1 ">
            <h4 className="font-bold hover:underline hover:cursor-pointer w-5/6 text-sm" onClick={handleBlogClick}>
                {blog.title.length > 50 ? blog.title.substring(0, 50) + "..." : blog.title}
            </h4>
            <p className="text-xs italic text-end mt-3">
                Created at: {new Date(blog.datePosted).toLocaleDateString()}
            </p>
            <div className="absolute  right-2 top-1">
                <div className="relative">
                    <button
                        className="text-gray-500"
                        aria-label="ellipsis"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <FontAwesomeIcon icon={faEllipsisV} className="mr-2 text-xs"/>
                    </button>
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 z-50 bg-white border rounded shadow-lg">
                            <button
                                className="block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                                onClick={() => {
                                    setShowModal(true);
                                    setShowDropdown(false);
                                }}
                            >
                                <FontAwesomeIcon icon={faTrash} className="mr-2 text-xs"/>
                                Delete Blog
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <div ref={modalRef}>
                    <CustomModal
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        onConfirm={() => deleteBlogHandler(blog.id)}
                        title="Confirm Delete"
                        message="Are you sure you want to delete this blog post?"
                    />
                </div>
            )}
        </div>
    );
};

export default BlogItem;