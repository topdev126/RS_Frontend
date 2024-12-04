import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTermState: "",
  relatedSearchs: []
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTermState: (state, action) => {
      state.searchTermState = action.payload;
    },
    getRelatedSearch: (state, action) => {
      state.relatedSearchs = action.payload;
    }    
    
  }
});

export const { setSearchTermState, getRelatedSearch } = searchSlice.actions;

export default searchSlice.reducer;
