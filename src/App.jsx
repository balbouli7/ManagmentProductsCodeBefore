import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import { getProducts } from "./services/productService";
import Spinner from "./Spinner";
import useFetch from "./services/UseFetch";
import { Route, Routes } from "react-router-dom";
import GetAllProducts from "./Components/GetAllProducts";
import Detail from "./Components/ProductDetail";
import Cart from "./Components/Cart";

export default function App() {
  //const [products,setProducts]=useState([])
  // const [size,setSize]=useState("")
 // const [error,setError]=useState(null)
  //const [loading,setLoading]=useState(true)
  // const {data:products,loading,error}=useFetch();
  /*useEffect(()=>{
    async function init(){
      try {
        const response = await getProducts('shoes')

        setProducts(response)
      } catch (error) {
        console.error("Error fetching products",error)
        
      }
      finally{
        setLoading(false)
      }
    }
    init()
  },[])*/
  //  function renderProduct(p) {
  //    return (
  //      <div key={p.id} className="product">
  //        <a href="/">
  //         <img src={`/images/${p.image}`} alt={p.name} />
  //         <h3>{p.name}</h3>
  //        <p>${p.price}</p>
  //       </a>
  //      </div>
  //    ); 
  //   }
  //   const filteredProducts= size
  //   ? products.filter((p)=>p.skus.find((s)=>s.size===parseInt(size)))
  //   :products;
    // if(error) throw error
    // if(loading){
    //   return <Spinner/>
    // }
  return (
    <>

      <div className="content">
        <Header />
        <main>
     
        <Routes>
          <Route path="/" element={<h1>Welcome to our store</h1>}></Route>
          <Route path="/products/:category" element={<GetAllProducts></GetAllProducts>} ></Route>
          <Route path="/products/:category/:id" element={<Detail/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          </Routes>
         
      <Footer />
      </main>
      </div>
    </>
  );
}