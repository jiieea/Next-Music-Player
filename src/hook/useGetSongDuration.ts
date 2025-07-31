import { useState, useEffect } from 'react';

const useGetSongDuration = (songUrl: string | null): string | null => {
    const [duration, setDuration] = useState<string | null>(null);

    useEffect(() => {
        if (!songUrl) {
            setDuration(null);
            return;
        }

        const audio = new Audio();
        audio.src = songUrl;

        const handleLoadedMetadata = () => {
            const totalSeconds = audio.duration;
            if (isNaN(totalSeconds)) { // Handle cases where duration might be NaN
                setDuration('N/A');
                return;
            }
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = Math.floor(totalSeconds % 60);
            setDuration(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
            // No need to revokeObjectURL here as we're using a direct URL, not a Blob URL
        };

        const handleError = (e: Event) => {
            console.error('Error loading audio metadata:', e);
            setDuration('Error');
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('error', handleError);

        // Cleanup function
        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('error', handleError);
            // Optionally, stop loading if component unmounts before metadata loads
            // audio.pause();
            // audio.src = ''; // Clear src to stop network request if still pending
        };
    }, [songUrl]); // Re-run effect if songUrl changes

    return duration;
};

export default useGetSongDuration;