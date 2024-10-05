import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState();
    const [loading, loadingData] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            loadingData(true);

            try {
                const res = await axios.get(url);
                setData(res);
            } catch (error) {
                console.log(error);
            }
            loadingData(false);
        }
        fetchData();
    }, [url]);

    const reFetch = async () => {

        loadingData(true);

        try {
            const res = await fetch.get(url);
            setData(res);
        } catch (error) {
            console.log(error);
        }
        loadingData(false);
    }

    return { data, loading, error, reFetch };
}
export { useFetch };