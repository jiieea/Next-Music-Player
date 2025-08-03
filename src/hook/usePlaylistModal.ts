import { create } from "zustand";

interface PlaylistModalProps {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
}


const usePlaylistModal = create<PlaylistModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))


export default usePlaylistModal;