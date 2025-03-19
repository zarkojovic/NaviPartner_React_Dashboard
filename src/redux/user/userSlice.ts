import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getUsers, User} from "../../data/data";
import {RootState} from "../store";

export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
    "users/fetchUsers",
    async (_, {rejectWithValue}) => {
        try {
            const response = await getUsers();
            return response;
        } catch (error) {
            return rejectWithValue("Failed to fetch users");
        }
    }
);

export interface UserState {
    userList: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    userList: [],
    loading: false,
    error: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        deleteUser(state, action: PayloadAction<number>) {
            state.userList = state.userList.filter(user => user.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, {payload}) => {
                state.userList = payload;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state, {payload}) => {
                state.loading = false;
                state.error = payload || "Unknown error";
            });
    },
});

export const {deleteUser} = userSlice.actions;

export default userSlice.reducer;

export const selectUsers = (state: RootState) => state.user.userList;

export const selectUsersByPage = (state: RootState, page: number, pageSize: number) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return state.user.userList.slice(startIndex, endIndex);
};

export const userCount = (state: RootState) => state.user.userList.length;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;
export const selectUserById = (state: RootState, userId: number) => state.user.userList.find(user => user.id === userId);