import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {UserDto} from "../user/dto/UserDtos.ts";

interface LoggedUserState {
    user: UserDto | undefined;
    loading: boolean;
}

const initialUserState: LoggedUserState = {
    user: undefined,
    loading: false
};

export const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        setLoggedUser(state: LoggedUserState, action: PayloadAction<UserDto>) {
            state.user = action.payload;
        },
        logout (state: LoggedUserState)  {
            state.user = undefined;
        },
    }
});

export const { setLoggedUser, logout } = userSlice.actions;

export default userSlice.reducer;
