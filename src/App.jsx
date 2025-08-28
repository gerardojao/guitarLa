import { useEffect, useState } from 'react'
import './App.css'
import Guitar from './Components/Guitar'
import Header from './Components/Header'
import { db } from './data/db'


function App() {

const initialCart = JSON.parse(localStorage.getItem('cart')) || [];

  const [data, setData] = useState(db)
  const [cart, setCart] = useState(initialCart)

  const MAX_QTY = 5;

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);   

const addToCart = (item) => {
  const itemExists = cart.findIndex(cartItem => cartItem.id === item.id);

  const updatedCart = [...cart];

  if (itemExists === -1) {
    // No existe: lo agregamos con quantity = 1
    updatedCart.push({ ...item, quantity: 1 });
  } else {
    const currentQty = cart[itemExists].quantity ?? 0;

    if (currentQty >= MAX_QTY) {
    //   console.log(`Máximo ${MAX_QTY} unidades para "${cart[itemExists].name}"`);
      return;
    }
    // Ya existe: incrementamos quantity 
    updatedCart[itemExists] = {
      ...updatedCart[itemExists],
      quantity: currentQty + 1,
    };
  }

  if (updatedCart !== cart) setCart(updatedCart);

};

const decreaseToCart = (item) => {
  const itemExists = cart.findIndex(cartItem => cartItem.id === item.id);

  let updatedCart = cart;
  const currentQty = cart[itemExists].quantity ?? 0;

  if (currentQty <= 1) {
    updatedCart = cart.filter((_, idx) => idx !== itemExists);
  } else { 
    updatedCart = [...cart];
    updatedCart[itemExists] = {
      ...updatedCart[itemExists],
      quantity: currentQty - 1,
    };
  }

  if (updatedCart !== cart) {
    setCart(updatedCart);
  }
};

const removeFromCart = (item) => {
  setCart(prevCart => prevCart.filter(p => p.id !== item.id));
};
const clearCart = () => {
  setCart([]);
};

  return (
    <>
    <Header 
      cart={cart} 
      addToCart={addToCart}
      decreaseToCart={decreaseToCart}
      removeFromCart={removeFromCart}
      clearCart={clearCart}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">     
            {data.map(g => (
              <Guitar 
              key={g.id} 
              guitar={g} 
              setCart={setCart}
              addToCart={addToCart}
            />
            ))}
        </div>     
    </main>

    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
