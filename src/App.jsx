import React, { useEffect, useState } from "react";
import {  Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Detail from "./Components/ProductDetail";
import Carts from "./Components/Cart";
import GetAllProducts from "./Components/GetAllProducts";
import Checkout from "./Components/Checkout";

export default function App() {
  const [cart, setCart] = useState(()=>
  {try {
    return JSON.parse(localStorage.getItem("cart"))??[]
  } catch (error) {
    console.error("The cart could not be parsed into JSON")
    return []
  }})
  useEffect(()=>localStorage.setItem("cart",JSON.stringify(cart)),[cart])
  const addToCart = (id, sku, name, size, price) => {  // Accept name & size
    setCart((items) => {
      const itemsInCart = items.find((i) => i.sku === sku);
      if (itemsInCart) {
        return items.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...items, { id, sku, name, size, price, quantity: 1 }]; // Add name & size
      }
    });
  };
  function updateQuantity(sku,quantity){
    setCart((items)=>{
      return quantity===0
      ?items.filter((i)=>i.sku !== sku)
      : items.map((i)=>(i.sku===sku?{...i,quantity , totalPrice: (i.price * quantity).toFixed(2)}:i))
    }
   )
  }
  function emptyCart(){
    setCart([])
  }

  return (
      <div className="content">
        <Header />
        <main>
        <Routes>
  <Route path="/" element={<h1>Welcome to our store</h1>} />
  <Route path="/products" element={<GetAllProducts/>} />
  <Route path="/products/:category" element={<GetAllProducts />} />
  <Route path="/products/:category/:id" element={<Detail addToCart={addToCart} />} /> {/* Pass addToCart */}
  <Route path="/cart" element={<Carts cart={cart} updateQuantity={updateQuantity} />} />
  <Route path="/checkout" element={<Checkout emptyCart={emptyCart}/>} />
</Routes>

        </main>
        <Footer />
      </div>
  );
}