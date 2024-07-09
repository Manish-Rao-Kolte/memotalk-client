import { apiCall } from "@/lib/apicall";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  user: null,
  userFriends: [],
  homeLoading: false,
  loading: false,
  error: null,
  allUsers: [],
  chatUsers: [],
};

export const registerUserAsync = createAsyncThunk(
  "user/registerUserAsync",
  async (payload) => {
    try {
      const result = await apiCall("users/register", "post", payload);
      toast.success(result.message || "User registered successfully!");
      return result; // Return the result to be stored in Redux store
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.err ||
          error?.response?.data?.error ||
          "Error while registering user!"
      );
      throw error; // Throw the error to propagate it for handling or logging
    }
  }
);

export const signInUserAsync = createAsyncThunk(
  "user/signInUserAsync",
  async (payload) => {
    try {
      const result = await apiCall("users/login", "post", payload);
      localStorage.setItem("user", JSON.stringify(result?.data));
      toast.success(result.message || "User signed in successfully!");
      return result;
    } catch (error) {
      toast.error(
        error?.response?.data?.err ||
          error?.response?.data?.error ||
          "Error while signing in!"
      );
      throw error;
    }
  }
);

export const signOutUserAsync = createAsyncThunk(
  "user/signOutUserAsync",
  async (payload) => {
    try {
      const result = await apiCall("users/signout", "get", payload);
      localStorage.removeItem("user");
      toast.success(result.message || "User signed out successfully!");
      return result;
    } catch (error) {
      toast.error(
        error?.response?.data?.err ||
          error?.response?.data?.error ||
          "Error while signing out!"
      );
      throw error;
    }
  }
);

export const getAllUsersAsync = createAsyncThunk(
  "user/getAllUsersAsync",
  async (payload) => {
    try {
      const result = await apiCall("/users", "get", null);
      return result;
    } catch (error) {
      toast.error(
        error?.response?.data?.err ||
          error?.response?.data?.error ||
          "Error while fetching users!"
      );
      throw error;
    }
  }
);

export const addFriendsAsync = createAsyncThunk(
  "user/addFriendsAsync",
  async (payload) => {
    try {
      const result = await apiCall("/users/add-friends", "post", payload);
      localStorage.setItem("user", JSON.stringify(result?.data));
      toast.success(result.message || "Friends added successfully!");
      return result;
    } catch (error) {
      toast.error(
        error?.response?.data?.err ||
          error?.response?.data?.error ||
          "Error while adding friends!"
      );
      throw error;
    }
  }
);

export const getChatFriendsAndUsersAsync = createAsyncThunk(
  "user/getChatFriendsAandUsers",
  async (payload) => {
    try {
      const result = await apiCall("/users/chat-friends-user", "get", payload);
      return result;
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.err ||
          error?.response?.data?.error ||
          "Error while getting chat friends and users!"
      );
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Additional reducers can be defined here
    setInitialUser: (state, action) => {
      state.user = action.payload;
    },
    addFriendToFriends: (state, action) => {
      state.friends = [action.payload, ...state.friends];
    },
    appendToChatUser: (state, action) => {
      state.chatUsers = [action.payload, ...state.chatUsers];
    },
    addNewMessageToUserMessages: (state, action) => {
      const usersList = [...state.chatUsers];
      usersList?.forEach((user) => {
        if (user._id === action.payload?.id) {
          user?.messages?.push(action.payload?.message);
        }
      });
      state.chatUsers = [...usersList];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      })
      .addCase(signInUserAsync.pending, (state) => {
        state.homeLoading = true;
        state.error = null;
      })
      .addCase(signInUserAsync.fulfilled, (state, action) => {
        state.userFriends = [...action.payload?.data?.friends];
        state.homeLoading = false;
        state.user = action.payload?.data;
      })
      .addCase(signInUserAsync.rejected, (state, action) => {
        state.homeLoading = false;
        state.error = action.error.message || "Signing in failed";
      })
      .addCase(signOutUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signOutUserAsync.fulfilled, (state, action) => {
        state.userFriends = [];
        state.loading = false;
        state.user = null;
        state.chatUsers = [];
        state.allUsers = [];
      })
      .addCase(signOutUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Signing out failed";
      })
      .addCase(getAllUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.allUsers = action.payload?.data;
        state.loading = false;
      })
      .addCase(getAllUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Signing out failed";
      })
      .addCase(addFriendsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFriendsAsync.fulfilled, (state, action) => {
        state.user = action.payload?.data;
        state.userFriends = [...action.payload?.data?.friends];
        state.loading = false;
      })
      .addCase(addFriendsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Adding friends failed";
      })
      .addCase(getChatFriendsAndUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChatFriendsAndUsersAsync.fulfilled, (state, action) => {
        state.chatUsers = [...action.payload?.data];
        state.loading = false;
      })
      .addCase(getChatFriendsAndUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Fethcing users failed";
      });
  },
});

export const userReducer = userSlice.reducer;
export const {
  setInitialUser,
  addUserToUsers,
  appendToChatUser,
  addNewMessageToUserMessages,
} = userSlice.actions;
export const userSelector = (state) => state.userReducer;
