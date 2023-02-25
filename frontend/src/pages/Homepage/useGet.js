import { useState, useEffect } from 'react';
import { getEventGroups } from '../../api/api';

export default function useGet(initialState = null) {

    const [data, setData] = useState(initialState);

    useEffect(() => {
        async function fetchData(){

            await getEventGroups()
                .then(response => {
                    //console.log(response.data);
                    setData(response.data);
                });
        
        }
        fetchData();
    },[]);
    
    return { data };
}