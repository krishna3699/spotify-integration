import axios from 'axios';
import { ApiError } from '../utils/apiError';

export const getAdviceForTrack = async (trackName: string): Promise<string> => {
    try {
        const searchTerm = sanitizeTrackName(trackName);
        console.log('search term:', searchTerm);

        const response = await axios.get(
            `https://api.adviceslip.com/advice/search/${searchTerm}`
        );
        console.log('adivce response:', response.data);

        if (response.data.slips && response.data.slips.length > 0) {
            const randomIndex = Math.floor(
                Math.random() * response.data.slips.length
            );
            return response.data.slips[randomIndex].advice;
        }
        const randomResponse = await axios.get(
            'https://api.adviceslip.com/advice'
        );
        return randomResponse.data.slip.advice;
    } catch (error: any) {
        console.error(
            'Error getting advice:',
            error.response?.data || error.message
        );
        throw new ApiError(500, 'Failed to get advice');
    }
};

export const getAffirmation = async (): Promise<string> => {
    try {
        const response = await axios.get('https://www.affirmations.dev');
        console.log('affirmation response:', response.data);

        if (response.data && response.data.affirmation) {
            return response.data.affirmation;
        }
        throw new ApiError(500, 'Failed to get affirmation');
    } catch (error: any) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, 'Failed to get affirmation');
    }
};

const sanitizeTrackName = (trackName: string): string => {
    const words = trackName.toLowerCase().split(' ');
    console.log('words:', words);
    // Filter out common words like "the", "a", "an", etc.
    const stopWords = [
        'the',
        'a',
        'an',
        'and',
        'or',
        'but',
        'in',
        'on',
        'at',
        'to',
        'for',
    ];
    const meaningfulWords = words.filter(
        (word) => !stopWords.includes(word) && word.length > 2
    );
    return meaningfulWords[0] || words[0] || trackName;
};
