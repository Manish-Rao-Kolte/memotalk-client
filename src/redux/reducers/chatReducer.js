import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCall } from "@/lib/apicall";
import { toast } from "react-toastify";

const initialState = {
  chats: null,
  loading: false,
  error: null,
};

export const getChatsAsync = createAsyncThunk(
  "chat/getChatsAsync",
  async (payload) => {
    try {
      const result = await apiCall("/messages", "get", payload);
      return result; // Return the result to be stored in Redux store
    } catch (error) {
      toast.error(
        error?.response?.data?.err ||
          error?.response?.data?.error ||
          "Error while registering user!"
      );
      throw error; // Throw the error to propagate it for handling or logging
    }
  }
);

export const createChatMessageAsync = createAsyncThunk(
  "chat/createChatMessageAsync",
  async (payload) => {
    try {
      const result = await apiCall("/messages/create", "post", payload);
      return result;
    } catch (error) {
      toast.error(
        error?.response?.data?.err ||
          error?.response?.data?.error ||
          "Error while registering user!"
      );
      throw error; // Throw the error to propagate it for handling or logging
    }
  }
);

export const markChatsAsReadAsync = createAsyncThunk(
  "chat/markChatsAsReadAsync",
  async (payload) => {
    try {
      const result = await apiCall(
        "/messages/update/mark-read",
        "patch",
        payload
      );
      return result;
    } catch (error) {
      toast.error(
        error?.response?.data?.err ||
          error?.response?.data?.error ||
          "Error while registering user!"
      );
      throw error; // Throw the error to propagate it for handling or logging
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setInitialChat: (state, action) => {
      state.chats = action.payload;
    },
    addMessageToChats: (state, action) => {
      console.log(action.payload);
      state.chats = [...state.chats, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatsAsync.pending, (state, action) => {
        state.chats = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(getChatsAsync.fulfilled, (state, action) => {
        state.chats = action.payload?.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(getChatsAsync.rejected, (state, action) => {
        state.chats = null;
        state.loading = false;
        state.error = action.error.message || "Failed fetching chat";
      })
      .addCase(createChatMessageAsync.fulfilled, (state, action) => {
        state.chats = [...state.chats, action.payload?.data];
        state.loading = false;
        state.error = null;
      })
      .addCase(createChatMessageAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed fetching chat";
      })
      .addCase(markChatsAsReadAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(markChatsAsReadAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed fetching chat";
      });
  },
});

export const chatReducer = chatSlice.reducer;
export const { setInitialChat, addMessageToChats } = chatSlice.actions;
export const chatSelector = (state) => state.chatReducer;
