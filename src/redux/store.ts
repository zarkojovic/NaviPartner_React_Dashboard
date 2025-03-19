import {
    combineReducers,
    configureStore,
    PreloadedState,
} from "@reduxjs/toolkit";

import userReducer from "./user/userSlice";
import blogReducer from "./blog/blogSlice";

const rootReducer = combineReducers({
    user: userReducer,
    blog: blogReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
    configureStore({
        reducer: rootReducer,
        preloadedState,
    });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
