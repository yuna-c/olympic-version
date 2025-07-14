import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useOlympicStore = create(
  devtools(
    persist(
      (set) => ({
        countries: [],
        medal: { country: '', gold: 0, silver: 0, bronze: 0 },
        sortOption: 'gold',

        onChanged: (payload) =>
          set(
            (state) => ({
              medal: { ...state.medal, ...payload }
            }),
            false,
            'onChanged'
          ),

        onCreated: () =>
          set(
            (state) => {
              const { medal, countries } = state;
              const newMedal = {
                id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                ...medal
              };
              const updated = [...countries, newMedal];

              return {
                countries: updated,
                medal: { country: '', gold: 0, silver: 0, bronze: 0 }
              };
            },
            false,
            'onCreated'
          ),

        onUpdated: () =>
          set(
            (state) => {
              const { medal, countries } = state;
              const updated = countries.map((e) => (e.country === medal.country ? { ...e, ...medal } : e));

              return {
                countries: updated,
                medal: { country: '', gold: 0, silver: 0, bronze: 0 }
              };
            },
            false,
            'onUpdated'
          ),

        onDeleted: (id) =>
          set(
            (state) => {
              const deleted = state.countries.filter((e) => e.id !== id);
              return { countries: deleted };
            },
            false,
            'onDeleted'
          ),

        onSorted: (value) => set({ sortOption: value }, false, 'onSorted')
      }),
      {
        name: 'countriesZustand', //  localStorage 키 이름
        partialize: (state) => ({ countries: state.countries }) // 저장할 상태만 선택
      }
    )
  )
);

export default useOlympicStore;
