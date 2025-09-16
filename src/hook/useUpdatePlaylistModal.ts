import { create } from "zustand";

interface UpdatePlaylistModal {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
}


const useUpdatePlaylistModal = create<UpdatePlaylistModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))


export default useUpdatePlaylistModal;