import { useEffect, useState } from "react";
import { getProducts } from "./productService";

export default function useFetch(url){
    const[data,setData]=useState(null)
    const[error,setError]=useState(null)
    const[loading,setLoading]=useState(true)
    useEffect(()=>{
        async function init(){
            try {
                const response=await getProducts("shoes")
                setData(response)
            } catch (e) {
                setError(e)
            }
            finally{setLoading(false)}
        }
        init()
    },[])
    return{data,error,loading}
}