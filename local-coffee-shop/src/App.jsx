import { useState, useEffect } from "react";
import { Card } from "./components/Card/Card";
import { useInView } from "react-intersection-observer";
import "./App.css";

const coffeeImages = {
  Espresso: "/espresso.jpg",
  Cappuccino: "/cappuccino.jpg",
  "Caramel Macchiato": "/macchiato.jpg",
  "Iced Latte": "/latte.jpg",
  "Cold Brew": "/coldbrew.jpg",
  "Blueberry Muffin": "/muffin.jpg",
  "Butter Croissant": "/croissant.jpg",

};


const MenuCard = ({ item }) => {
  const { ref, inView }=useInView({
    threshold:0.5,
    triggerOnce:false,
  })
  return (
    <Card className="menu-item">
     <img
  ref={ref}
  src={coffeeImages[item.name]}
  alt={item.name}
  className={`menu-image ${inView ? "active" : ""}`}
/>

      <div className="menu-content">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <p>{item.category}</p>
        <strong>${item.price.toFixed(2)}</strong>
      </div>
    </Card>
  );
};

function App() {
  const [menu, setMenu] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => setMenu(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={darkMode ? "dark" : "light"}>
      <header>
        <div className="logo">
  <img src="/logo.jpg" alt="LazyBrew Logo" />
  <h1>LazyBrew Cafe</h1>
</div>

        <button onClick={() => setDarkMode(!darkMode)}>
          Dark Mode
        </button>
      </header>
      <section className="hero">
        <h2>Slow Mornings. Great Coffee. ☕</h2>
        <p>
          Enjoy handcrafted coffee, cold brews, and sweet treats.
        </p>
      </section>
      <section>
        <h2>Our Menu</h2>

       
  {menu.map((item) => (
    <MenuCard key={item.id} item={item} />
  ))}

      </section>
    </div>
  );
}

export default App;
