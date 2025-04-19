import React, { useEffect, useState } from 'react'


const Usefetch = (url) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {

            setLoading(true)

            try {

            const token = localStorage.getItem('token')

            const res = await fetch(url, {

                headers: {

                "Authorization": `Bearer ${token}`

            }
            });

            if(!res.ok) {

                setError('Failed to fetch!')
            }

            const result = await res.json();
            setData(result.data);
            setLoading(false)

        } catch(error) {

            setError(error.message)
            setLoading(false)

        }

        }

        fetchData()

    }, [url])

  return {

    data,
    loading,
    error
  }
    
}

export default Usefetch