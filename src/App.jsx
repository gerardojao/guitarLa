import { useEffect, useState } from 'react'
import './App.css'
import Guitar from './Components/Guitar'
import Header from './Components/Header'
import { db } from './data/db'


function App() {
  const [data, setData] = useState(db)
  const [cart, setCart] = useState([])

  const addToCart = (item) => {
    const itemExists = cart.findIndex(cartItem => cartItem.id === item.id);
    if (itemExists >= 0) {
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity ++;
      setCart(updatedCart);      
      console.log("El item ya existe en el carrito", updatedCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
 
  }

  return (
    <>
    <Header />

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
