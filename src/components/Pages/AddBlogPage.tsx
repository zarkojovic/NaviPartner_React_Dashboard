import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addBlog} from "../../redux/blog/blogSlice";
import CustomInput from "../Common/CustomInput";
import CustomButton from "../Common/Button";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {selectUserById} from "../../redux/user/userSlice";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import coverPhoto from "../../images/cover-photo.png";

export const AddBlogPage: React.FC = () => {
    const {userId} = useParams<{ userId: string }>();
    const selectUser = useTypedSelector((state) => selectUserById(state, parseInt(userId!)));
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!selectUser) {
            navigate("/");
        }
    }, []);

    const createBlogHandler = () => {
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
            dispatch(addBlog({userId: parseInt(userId!), title, body: content}));
            navigate("/");
        }
    };

    return (
        <div className="bg-slate-100 h-screen ">
            <Helmet>
                <title>Add New Blog</title>
            </Helmet>

            <h1 className="text-xl font-bold mb-3 bg-white p-3 border-b">
                <img src={coverPhoto} alt="Cover" className={"h-6"}/>
            </h1>
            <div className="md:w-7/12 mx-auto bg-white p-3 rounded-lg shadow">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">Add Blog for
                        user {selectUser!.first_name} {selectUser!.last_name}</h1>

                    <CustomButton
                        text="Back"
                        onClick={() => navigate("/")}
                        className="text-xs bg-gray-100 hover:bg-gray-300 text-gray-700 rounded-full px-3 py-2 font-bold transition duration-300"
                        icon={faArrowLeft}
                    />
                </div>
                <form>
                    <CustomInput
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        error={titleError}
                    />
                    <CustomInput
                        type="text"
                        placeholder="Body"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        error={contentError}
                        isTextArea={true}
                    />
                    <CustomButton
                        text="Create"
                        onClick={(e) => {
                            e.preventDefault();
                            createBlogHandler();
                        }}
                        className="bg-blue-500 text-white rounded-full text-xs font-medium py-2"
                    />
                </form>
            </div>
        </div>
    );
};