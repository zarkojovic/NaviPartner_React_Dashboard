import React, {useEffect} from "react";
import {Routes, Route} from "react-router-dom";

import NotFoundPage from "./Pages/NotFoundPage";
import {HomePage} from "./Pages/HomePage";
import {BlogPage} from "./Pages/BlogPage";
import {useFetchData} from "../hooks/useFetchData";
import {AddBlogPage} from "./Pages/AddBlogPage";

export const App: React.FC = () => {

    useFetchData();
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/blog/:blogId" element={<BlogPage/>}/>
            <Route path="/:userId/add-blog" element={<AddBlogPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    );
};