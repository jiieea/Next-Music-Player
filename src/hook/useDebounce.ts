import { useEffect, useState } from "react";


function useDebounce<T> (value : T , delay ?: number) : T {
    const [ debouceTime , setDebounceTime ] = useState(value);

    useEffect(() => {
        const time = setTimeout(() => {
            setDebounceTime(value);
        } , delay || 500);

        return () => {
            clearTimeout(time);
        }
    } , [ value , delay] )
    
    return debouceTime;
}


export default useDebounce;