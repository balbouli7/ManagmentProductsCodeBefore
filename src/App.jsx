import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import { getProducts } from "./services/productService";
import Spinner from "./Spinner";
import useFetch from "./services/UseFetch";
import { Route, Routes } from "react-router-dom";


export default function App() {
// const[products,setProducts]=useState([])
const[size,setSize]=useState("")
// const[error,setError]=useState(null)
// const[loading,setLoading]=useState(true)
const{data:products,loading,error}=useFetch()

// useEffect(()=>{
//   async function init(){
//     try {
//       const response=await getProducts("shoes")
//       setProducts(response)
//     } catch (err) {
//       console.log('error fetching product',err)
//     }
//     finally{
//       setLoading(false)
//     }
//   }
//   init()
// },[])
function renderProduct(p){
  return(
    <div key={p.id} className="product">
      <a href="/">
      <img src={`/images/${p.image}`} alt={p.name}/>
     <h3>{p.name}</h3> 
     <p>${p.price}</p>
      </a>
    </div>
  )
}
const filteredProducts=size
?products.filter((p)=>p.skus.find((s)=>s.size===parseInt(size)))
:products
if(error) throw error
if(loading){return <Spinner/>}
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>{" "}
            <select id="size"
            value={size}
            onChange={(e)=>setSize(e.target.value)}>
              <option value="">All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </section>
          <section id="products">
            {
              filteredProducts.map(renderProduct)
            }

          </section>
          <Routes>
            <Route path="/" />
            <Route path="/products" element={<useFetch />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
