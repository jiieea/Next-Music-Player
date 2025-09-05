import { useState, useEffect } from 'react';

// A helper function to get the duration of a single song
const getSongDuration = (songUrl: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        const audio = new Audio();
        audio.src = songUrl;

        const handleLoadedMetadata = () => {
            if (isNaN(audio.duration)) {
                reject(new Error('Invalid song duration'));
            } else {
                resolve(audio.duration);
            }
            cleanup();
        };

        const handleError = () => {
            reject(new Error('Error loading audio metadata'));
            cleanup();
        };

        const cleanup = () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('error', handleError);
            audio.src = '';
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('error', handleError);
    });
};

const formatTime = (totalSeconds: number): string => {
    if (isNaN(totalSeconds)) {
        return 'N/A';
    }
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600 ) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const parts = [];
    if (hours > 0) {
        parts.push(`${hours} hr`);
    }
    if (minutes > 0) {
        parts.push(`${minutes} min`);
    }
    if (seconds > 0 || parts.length === 0) {
        parts.push(`${seconds} sec`);
    }

    return parts.join(' ');
};

const useGetPlaylistDuration = (songUrls: string[]): string | null => {
    const [totalDuration, setTotalDuration] = useState<string | null>(null);

    useEffect(() => {
        if (!songUrls || songUrls.length === 0) {
            setTotalDuration('0:00');
            return;
        }

        const fetchDurations = async () => {
            setTotalDuration('Loading...'); // Set a loading state
            try {
                const durationPromises = songUrls.map(url => getSongDuration(url));
                const durations = await Promise.all(durationPromises);
                const totalSeconds = durations.reduce((sum, duration) => sum + duration, 0);
                setTotalDuration(formatTime(totalSeconds));
            } catch (error) {
                console.error('Error calculating playlist duration:', error);
                setTotalDuration('Error');
            }
        };

        fetchDurations();
    }, [songUrls]);

    return totalDuration;
};

export default useGetPlaylistDuration;