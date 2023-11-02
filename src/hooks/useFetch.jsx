
import { useState, useEffect } from 'react'

const useFetch = (url) => {

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

  
    useEffect(() => {

        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })
        .then ( res => {
            if(!res.ok){
                throw Error('Could not fetch the data')
            }

            return res.json()
        })
        .then(data => {
            //saving the data in data state
            setData(data)
            //since data has been retrieved, set loading to false
            setIsLoading(false)
            //set error back to null incase it has been error before
            setError(null)

        })
        .catch(err => {
            if(err.name === 'AbortError'){
                console.log('fetch aborted')
            }
            else{
            //since there is an error in retrieving from db loadin is false
            setIsLoading(false)
            setError(err.message)
            }
            
        })

        //if the fetch is aborted here we catch the error in the if statement above.
        return () => abortCont.abort();

        //every time the url updates, useEffect runs

    }, [url])

    //returning the states so we can grab them anywhere
    return { data, isLoading, error}

}

export default useFetch