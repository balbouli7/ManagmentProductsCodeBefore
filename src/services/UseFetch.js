import { useEffect, useState } from "react";
import { getProducts } from "./productService";
const baseUrl = process.env.REACT_APP_API_BASE_URL;


export default function useFetch(url){
    const[data,setData]=useState([])
    const[error,setError]=useState(null)
    const[loading,setLoading]=useState(true)
    useEffect(()=>{
        async function init(){
            try {
                const response=await fetch(baseUrl + url)
                if(response.ok){
                    const json =await response.json()
                    setData(json)
                }
            } catch (e) {
                setError(e)
            }
            finally{setLoading(false)}
        }
        init()
    },[url])
    return{data,error,loading}
}