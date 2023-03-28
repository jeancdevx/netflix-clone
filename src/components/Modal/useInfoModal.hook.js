import { create } from 'zustand'

const useInfoModal = create((set) => ({
  movieId: undefined,
  isOpen: false,
  openModal: (movieId) => set({ movieId, isOpen: true }),
  closeModal: () => set({ movieId: undefined, isOpen: false })
}))

export default useInfoModal
