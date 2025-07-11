"use client"

import useUploadModal from "@/hook/useUploadModal";
import Modal from "./Modal";


/**
 * UploadModal component for handling song uploads.
 * This component utilizes a custom hook `useUploadModal` to manage its open/close state.
 * It renders a `Modal` component, providing it with a title, description, and
 * a callback function for when the modal's open state changes.
 */

const UploadModal = () => {
    //     * Initializes the upload modal state manager from the `useUploadModal` hook.
    //    * This hook provides access to `isOpen` (boolean indicating if the modal is open)
    //    * and `onClose` (function to close the modal).
    const uploadModal = useUploadModal();

    //     **
    //    * Handles the change event of the Modal component.
    //    * This function is called when the Modal's open state changes (e.g., when the user clicks outside or presses escape).
    //    * If the modal is being closed (`open` is false), it triggers the `onClose` action from the `useUploadModal` hook
    //    * to update the global state.
    //    *
    const showUploadModal = (open: boolean) => {
        if (!open) {
            uploadModal.onClose();
        }

    }
    return (
        <>
            <Modal
                title="Upload The Song"
                description="Testing upload songs modal"
                isOpen={uploadModal.isOpen}
                onChange={showUploadModal}
            >
                Upload Content
            </Modal>
        </>
    )

}


export default UploadModal;