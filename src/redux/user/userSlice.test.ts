import {User} from "../../data/data";
import reducer, {fetchUsers, UserState} from "../user/userSlice";

const TestUsers: User[] = [
    {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        email: "test@test.org",
        gender: "Male",
        ip_address: "127.0.0.1",
    },
    {
        id: 2,
        first_name: "Jane",
        last_name: "Doe",
        email: "test-second@test.org",
        gender: "Female",
        ip_address: "0.0.0.0",
    },
];

describe("usersSlice", () => {
    const initialState: UserState = {
        userList: [],
        loading: false,
        error: null,
    };

    it("should return the initial state", () => {
        expect(reducer(undefined, {type: undefined})).toEqual(initialState);
    });

    it("should handle fetchUsers.pending", () => {
        const action = {type: fetchUsers.pending.type};
        const state = reducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            loading: true,
        });
    });

    it("should handle fetchUsers.fulfilled", () => {
        const action = {type: fetchUsers.fulfilled.type, payload: TestUsers};
        const state = reducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            userList: TestUsers,
            loading: false,
        });
    });

    it("should handle fetchUsers.rejected", () => {
        const action = {type: fetchUsers.rejected.type, payload: "Failed to fetch users"};
        const state = reducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            loading: false,
            error: "Failed to fetch users",
        });
    });

    it("should handle deleteUser", () => {
        const action = {type: "user/deleteUser", payload: 1};
        const state = reducer(
            {
                ...initialState,
                userList: TestUsers,
            },
            action
        );
        expect(state).toEqual({
            ...initialState,
            userList: [TestUsers[1]],
        });
    });
});