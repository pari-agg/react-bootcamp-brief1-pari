import { useState, useEffect } from "react";
import "./App.css";

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
        <h1>☕ Local Coffee Shop</h1>

        <button onClick={() => setDarkMode(!darkMode)}>
          Toggle Theme
        </button>
      </header>

      <section>
        <h2>Our Menu</h2>

        {menu.map((item) => (
          <div key={item.id} className="card">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{item.category}</p>
            <p>${item.price.toFixed(2)}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
