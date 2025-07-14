import { create } from 'zustand';

const useOlympicStore = create((set) => {
  return {
    countries: [],
    medal: { country: '', gold: 0, silver: 0, bronze: 0 },
    sortOption: 'gold',

    onChanged: (payload) =>
      set((state) => ({
        medal: { ...state.medal, ...payload }
      })),

    onCreated: () =>
      set((state) => {
        const { medal, countries } = state;
        const newMedal = {
          id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          ...medal
        };
        const updated = [...countries, newMedal];
        localStorage.setItem('countries', JSON.stringify(updated));

        return {
          countries: updated,
          medal: { country: '', gold: 0, silver: 0, bronze: 0 }
        };
      }),

    onUpdated: () =>
      set((state) => {
        const { medal, countries } = state;
        const updated = countries.map((e) => (e.country === medal.country ? { ...e, ...medal } : e));
        localStorage.setItem('countries', JSON.stringify(updated));

        return {
          countries: updated,
          medal: { country: '', gold: 0, silver: 0, bronze: 0 }
        };
      }),

    onDeleted: (id) =>
      set((state) => {
        const deleted = state.countries.filter((e) => e.id !== id);
        localStorage.setItem('countries', JSON.stringify(deleted));

        return { countries: deleted };
      }),

    onSorted: (value) => set({ sortOption: value }),

    loadFromStorage: () => {
      const saved = localStorage.getItem('countries');
      if (saved) set({ countries: JSON.parse(saved) });
    }
  };
});

export default useOlympicStore;
