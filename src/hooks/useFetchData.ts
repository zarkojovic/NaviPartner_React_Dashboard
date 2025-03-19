import { useEffect } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { fetchUsers } from "../redux/user/userSlice";
import {fetchBlogs} from "../redux/blog/blogSlice";

export const useFetchData = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchBlogs());
    }, [dispatch]);
};