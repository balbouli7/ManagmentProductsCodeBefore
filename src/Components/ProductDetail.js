import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../services/UseFetch";
import Spinner from "../Spinner";
import PageNotFound from "./NotFound";
import { useState } from "react";

export default function Detail(props) {
  const { id } = useParams()
  const [sku, setSku] = useState("")
  const navigate = useNavigate();
  const { data: product, loading, error } = useFetch(`products/${id}`)

  if (loading) return <Spinner />
  if (error) throw error;
  if (!product || Object.keys(product).length === 0 || !product.name) {
    return <PageNotFound />
  }

  // const addToCart = () => {
  //   if (!sku) return

  //   setCart((prevCart) => {
  //     const existingItem = prevCart.find(
  //       (item) => item.id === product.id && item.sku === sku
  //     );

  //     if (existingItem) {
  //       return prevCart.map((item) =>
  //         item.id === product.id && item.sku === sku
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       );
  //     } else {
  //       return [
  //         ...prevCart,
  //         { id: product.id, name: product.name, sku,  price: product.price, quantity: 1 },
  //       ]
  //     }
  //   })

  //   navigate("/cart")
  // }

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">
        {/* {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(product.price)} */}
        ${product.price}
      </p>

      <section id="filters">
        <label htmlFor="sku">Select a size:</label>{" "}
        <select id="size" value={sku} onChange={(e) => setSku(e.target.value)}>
          <option value="">All size</option>
          {product.skus.map((s) => (
            <option key={s.sku} value={s.sku}>
              {s.size}
            </option>
          ))}
        </select>
      </section>
      <button
  className="btn btn-primary"
  disabled={!sku}
  onClick={() => {
    const selectedSku = product.skus.find((s) => s.sku === sku); 
    navigate("/cart");
    props.addToCart(product.id, sku, product.name, selectedSku?.size, product.price);
  }}
>
  Add to cart
</button>

      {!sku && <p style={{ color: "red" }}>Please select a size before adding to cart.</p>}

      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}