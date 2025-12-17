import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {

    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            const item = localStorage.getItem(key);

            if (item) {
                const parsedItem = JSON.parse(item);

                if (typeof parsedItem === 'object' && parsedItem !== null && !Array.isArray(parsedItem)) {
                    return { ...initialValue, ...parsedItem };
                }

                return parsedItem;
            }
            return initialValue;
        } catch (error) {
            console.error(`Error loading localStorage key "${key}":`, error);
            return initialValue;
        }
    });


    useEffect(() => {

        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem(key, JSON.stringify(storedValue));
            } catch (error) {
                console.error(`Error saving localStorage key "${key}":`, error);
            }
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;