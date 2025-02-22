import React, { useState } from "react";
import { saveShippingAddress } from "../services/shippingService";
import { useNavigate } from "react-router-dom";
const emptyAddress={
  city:"",
  country:""
}

export default function Checkout({emptyCart}){
  const navigate=useNavigate()
  const [address,setAddress]=useState(emptyAddress)
  const[saveError,setSaveError]=useState(null)
  const[touched,setTouched]=useState({})
  const errors=getErrors(address)
  const isValid=Object.keys(errors).length===0
  function getErrors(address){
    const result={}
    if(!address.city)result.city="City is required"
    if(!address.country)result.country="Country is required"
    return result
  }
  function handleChange(e){
    e.persist()
    setAddress((curAddress)=>{
      return {
        ...curAddress,
        [e.target.id]:e.target.value
      }
    })
  }
  function handleBlur(event){
    event.persist()
    setTouched((cur)=>{
      return {...cur,[event.target.id]:true}
    })
  }
  async function handleSubmit(event){
    event.preventDefault()
    if (!address.city) {
      window.confirm("City is required")
      return
    }
    if (!address.country) {
      window.confirm("Country is required")
      return
    }
  
  // // Mark all fields as touched so that errors appear
  // setTouched({ city: true, country: true });

  // // Recalculate errors
  // const errors = getErrors(address);
  // const isValid = Object.keys(errors).length === 0;

  // // Prevent submission if there are errors
  // if (!isValid) {
  //   return;
  // }


    try {
      console.log(address.city)
      console.log(address.country)
      await saveShippingAddress(address)
      emptyCart()
      navigate('/products/shoes')
    } catch (error) {
      setSaveError(error)
    }
  }
  return (
    <>
    {!isValid&&(
      <div role="alert">
        <p>Please fix the following errors</p>
        <ul>
          {Object.keys(errors).map((key)=>{
            return <li key={key}>{errors[key]}</li>
          })}
        </ul>
      </div>
    )}
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="city">City</label>
        <br/>
        <input 
        id="city"
        type="text"
        value={address.city}
        onBlur={handleBlur}
        onChange={handleChange}/>
        <p role="alert">
          {(touched.city)&& errors.city}
        </p>
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <br/>
        <select
        id="country"
        type="text"
        value={address.country}
        onBlur={handleBlur}
        onChange={handleChange}>
              <option value="">Select Country</option>
              <option value="Tunisie">Tunisie</option>
              <option value="Algerie">Algerie</option>
              <option value="Maroc">Maroc</option>
              <option value="Egypt">Egypt</option>
        </select>
        <p role="alert">
          {(touched.country)&& errors.country}
        </p>
      </div>
      <div>
        <input
        type="submit"
        className="btn btn-primary"
        value="Save Shipping Info"/>
      </div>
    </form>
    </>
  )
}