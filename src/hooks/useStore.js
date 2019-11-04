import create from 'zustand'

export const [useStore] = create(set => ({
  isNavOpen: false,
  openNav: () => set({ isNavOpen: true }),
  closeNav: () => set({ isNavOpen: false }),
  toggleNav: () => set(state => ({ isNavOpen: !state.isNavOpen })),
}))
