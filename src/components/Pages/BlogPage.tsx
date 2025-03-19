import React, {useEffect, useState, useRef} from "react";
import {Helmet} from "react-helmet";
import {useDispatch} from "react-redux";
import {deleteBlog, selectBlogFromId, updateBlog} from "../../redux/blog/blogSlice";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useNavigate, useParams} from "react-router-dom";
import CustomInput from "../Common/CustomInput";
import CustomButton from "../Common/Button";
import CustomModal from "../Common/CustomModal";
import {faArrowLeft, faEllipsisV, faFileEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import coverPhoto from "../../images/cover-photo.png";

export const BlogPage: React.FC = () => {
    const [editPost, setEditPost] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const {blogId} = useParams<{ blogId: string }>();
    const blogInfo = useTypedSelector((state) => selectBlogFromId(state, blogId!));
    const [title, setTitle] = useState(blogInfo?.title || "");
    const [content, setContent] = useState(blogInfo?.body || "");
    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!blogInfo) {
            navigate("/");
        }
    }, [blogInfo, navigate]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const editPostHandler = () => {
        let hasError = false;

        if (!title) {
            setTitleError("Title is required");
            hasError = true;
        } else {
            setTitleError("");
        }

        if (!content) {
            setContentError("Content is required");
            hasError = true;
        } else {
            setContentError("");
        }

        if (!hasError) {
            dispatch(updateBlog({id: blogId!, title, body: content}));
            setEditPost(false);
        }
    };

    const deletePostHandler = (id: string) => {
        dispatch(deleteBlog(id));
        navigate("/");
    };

    return (
        <div className="bg-slate-100 h-screen">
            <Helmet>
                <title>{blogInfo?.title} - Blog Page</title>
            </Helmet>

            <h1 className="text-xl font-bold mb-3 bg-white p-3 border-b">
                <img src={coverPhoto} alt="Cover" className={"h-6"}/>
            </h1>
            <div className={"w-7/12 mx-auto bg-white p-4 rounded-xl shadow"}>
                <div className="flex justify-between">
                    <CustomButton
                        text="Back"
                        onClick={() => navigate("/")}
                        className="text-xs bg-gray-100 hover:bg-gray-300 text-gray-700 rounded-full px-3 py-2 font-bold  transition duration-300"
                        icon={faArrowLeft}
                    />


                    <h3 className=" text-xs text-end italic my-3">Posted
                        on: {new Date(blogInfo!.datePosted).toLocaleDateString()}</h3>
                </div>
                {editPost ? (
                    <div>
                        <CustomInput
                            type=" text"
                            placeholder=" Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            error={titleError}
                        />
                        <CustomInput
                            type=" text"
                            placeholder=" Body"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            error={contentError}
                            isTextArea={true}
                        />
                        <CustomButton
                            text=" Save Post"
                            onClick={(e) => {
                                e.preventDefault();
                                editPostHandler();
                            }}
                            className=" bg-blue-700 text-white px-3 py-2 rounded-full text-xs font-bold
                        hover:bg-blue-800  transition duration-300"
                        />
                    </div>
                ) : (
                    <div>
                        <div className=" relative" ref={dropdownRef}>
                            <button
                                className=" text-gray-500 absolute right-0"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <FontAwesomeIcon icon={faEllipsisV} className=" mr-2"/>
                            </button>
                            {showDropdown && (
                                <div className=" absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                                    <CustomButton
                                        icon={faFileEdit}
                                        text=" Edit Post"
                                        className=" block w-full text-left px-3 py-2 text-xs text-gray-700
                            hover:bg-gray-100"
                                        onClick={() => {
                                            setEditPost(true);
                                            setShowDropdown(false);
                                        }}
                                    />
                                    <CustomButton
                                        text=" Delete Post"
                                        icon={faTrash}
                                        className=" block w-full text-left px-3 py-2 text-xs text-gray-700
                            hover:bg-gray-100"
                                        onClick={() => {
                                            setShowModal(true);
                                            setShowDropdown(false);
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        <h1 className=" text-3xl font-bold font-serif pt-4">{blogInfo?.title}</h1>
                        <p className=" font-mono text-xs mb-4 mt-3">{blogInfo?.body}</p>
                    </div>
                )}
            </div>

            <CustomModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={() => deletePostHandler(blogInfo!.id)}
                title=" Confirm Delete"
                message=" Are you sure you want to delete this blog post?"
            />
        </div>
    );
};