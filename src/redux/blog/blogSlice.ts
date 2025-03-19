import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getMembers, BlogPost} from "../../data/data";
import {RootState} from "../store";

export const fetchBlogs = createAsyncThunk<BlogPost[], void, { rejectValue: string }>(
    "blogs/fetchBlogs",
    async (_, {rejectWithValue}) => {
        try {
            const response = await getMembers();
            return response;
        } catch (error) {
            return rejectWithValue("Failed to fetch blogs");
        }
    }
);

export interface BlogState {
    blogList: BlogPost[];
    loading: boolean;
    error: string | null;
}

const initialState: BlogState = {
    blogList: [],
    loading: false,
    error: null,
};

export type EditBlog = {
    id: string;
    title: string;
    body: string;
};

export type AddBlog = {
    title: string;
    body: string;
    userId: number;
};

export const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        addBlog: (state, action: PayloadAction<AddBlog>) => {
            state.blogList.push({
                id: Math.random().toString(36).substr(2, 9),
                title: action.payload.title,
                body: action.payload.body,
                datePosted: new Date().toISOString(),
                userId: action.payload.userId,
            });
        },
        updateBlog: (state, action: PayloadAction<EditBlog>) => {
            const index = state.blogList.findIndex((blog) => blog.id === action.payload.id);
            if (index !== -1) {
                state.blogList[index].body = action.payload.body;
                state.blogList[index].title = action.payload.title;
            }
        },
        deleteBlog: (state, action: PayloadAction<string>) => {
            state.blogList = state.blogList.filter((blog) => blog.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogs.fulfilled, (state, {payload}) => {
                state.blogList = payload;
                state.loading = false;
            })
            .addCase(fetchBlogs.rejected, (state, {payload}) => {
                state.loading = false;
                state.error = payload || "Unknown error";
            });
    },
});

export default blogSlice.reducer;

export const selectBlogs = (state: RootState) => state.blog.blogList;

export const selectBlogsByUserId = (state: RootState, userId: number) => {
    return state.blog.blogList.filter(blog => blog.userId === userId);
};

export const selectBlogFromId = (state: RootState, blogId: string) => {
    return state.blog.blogList.find(blog => blog.id === blogId);
}

export const {updateBlog, deleteBlog, addBlog} = blogSlice.actions;

export const selectBlogLoading = (state: RootState) => state.blog.loading;
export const selectBlogError = (state: RootState) => state.blog.error;