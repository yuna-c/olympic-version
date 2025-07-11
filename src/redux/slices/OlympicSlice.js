import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  countries: [],
  medal: { country: '', gold: 0, silver: 0, bronze: 0 },
  sortOption: 'gold'
};

const olymPicSlice = createSlice({
  name: 'olympic',
  initialState,
  reducers: {
    setMedal(state, action) {
      state.medal = { ...state.medal, ...action.payload };
    },
    createMedal(state, action) {
      const created = state.countries.find((e) => e.country === state.medal.country);
      if (!state.medal.country || created) return;

      const newMedal = {
        id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        ...state.medal
      };
      state.countries = [...state.countries, newMedal];
      state.medal = { country: '', gold: 0, silver: 0, bronze: 0 };
      localStorage.setItem('countries', JSON.stringify(state.countries));
    },
    updateMedal(state, action) {
      state.countries = state.countries.map((e) => (e.country === state.medal.country ? { ...e, ...state.medal } : e));
      state.medal = { country: '', gold: 0, silver: 0, bronze: 0 };
      localStorage.setItem('countries', JSON.stringify(state.countries));
    },
    deleteMedal(state, action) {
      state.countries = state.countries.filter((e) => e.id !== action.payload);
      localStorage.setItem('countries', JSON.stringify(state.countries));
    },
    setSortOption(state, action) {
      state.sortOption = action.payload;
    },
    loadFormStorage(state, action) {
      const saved = localStorage.getItem('countries');
      if (saved) state.countries = JSON.parse(saved);
    }
  }
});

export const { setMedal, createMedal, updateMedal, deleteMedal, setSortOption, loadFormStorage } = olymPicSlice.actions;
export default olymPicSlice.reducer;
