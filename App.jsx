
import { useState } from "react";
import "./App.css";

const shoes = [
  { id: 1, name: "Air Motion Runner", category: "Running", price: 2499, old: 3299, color: "Blue / White", emoji: "👟", bg: "blue" },
  { id: 2, name: "Street Classic", category: "Casual", price: 1899, old: 2499, color: "Black / White", emoji: "👞", bg: "dark" },
  { id: 3, name: "Cloud Walk Pro", category: "Sports", price: 2999, old: 3999, color: "Mint / White", emoji: "👟", bg: "mint" },
  { id: 4, name: "Urban High Top", category: "Sneakers", price: 2799, old: 3599, color: "Cream / Brown", emoji: "🥾", bg: "cream" },
  { id: 5, name: "Everyday Flex", category: "Casual", price: 1599, old: 2199, color: "Pink / White", emoji: "👟", bg: "pink" },
  { id: 6, name: "Trail Blazer", category: "Outdoor", price: 3499, old: 4299, color: "Olive / Black", emoji: "🥾", bg: "olive" }
];

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);

function App() {
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");
  const [notice, setNotice] = useState("");

  const categories = ["All", "Running", "Casual", "Sports", "Sneakers", "Outdoor"];

  const filteredShoes =
    category === "All"
      ? shoes
      : shoes.filter((shoe) => shoe.category === category);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function addToCart(shoe) {
    setCart((current) => {
      const existing = current.find((item) => item.id === shoe.id);

      if (existing) {
        return current.map((item) =>
          item.id === shoe.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...shoe, quantity: 1 }];
    });

    setNotice(shoe.name + " added to cart");
    window.setTimeout(() => setNotice(""), 2000);
  }

  function changeQuantity(id, amount) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(id) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  return (
    <div className="app-shell">

      <header className="topbar">
        <a className="brand" href="#home">
          <span className="brand-mark">S</span>
          SOLE<span className="brand-light">MATE</span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#collection">Collection</a>
          <a href="#about">About</a>
        </nav>

        <a className="cart-pill" href="#cart">
          🛍️ Cart <b>{cartCount}</b>
        </a>
      </header>

      <main>

        <section className="hero" id="home">
          <div className="hero-copy">
            <span className="eyebrow">✦ STEP INTO COMFORT</span>

            <h1>
              Find your
              <br />
              <em>perfect pair.</em>
            </h1>

            <p>
              Every step tells a story. Discover sneakers made
              for your everyday adventures, your big goals and
              everything in between.
            </p>

            <a className="primary-btn" href="#collection">
              Explore collection ↗
            </a>

            <div className="hero-stats">
              <div>
                <strong>06</strong>
                <small>Unique styles</small>
              </div>
              <div>
                <strong>100%</strong>
                <small>Everyday comfort</small>
              </div>
              <div>
                <strong>♡</strong>
                <small>Made to move</small>
              </div>
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-circle"></div>
            <span className="hero-spark">✳</span>
            <div className="hero-shoe">👟</div>

            <div className="float-card">
              <span>✦</span>
              <div>
                <b>Walk your way</b>
                <small>Comfort meets style</small>
              </div>
            </div>
          </div>
        </section>

        <section className="collection-section" id="collection">

          <div className="section-heading">
            <div>
              <span className="eyebrow">OUR PICKS</span>
              <h2>Made for every move.</h2>
            </div>

            <p>
              Fresh styles. Feel-good comfort.
              <br />
              Your next favourite pair is here.
            </p>
          </div>

          <div className="filters">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "filter active" : "filter"}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filteredShoes.map((shoe) => (
              <article className="product-card" key={shoe.id}>

                <div className={`product-visual ${shoe.bg}`}>
                  <span className="product-tag">NEW DROP</span>
                  <span className="shoe-emoji">{shoe.emoji}</span>
                  <span className="visual-number">0{shoe.id}</span>
                </div>

                <div className="product-info">
                  <div>
                    <span className="product-category">
                      {shoe.category}
                    </span>
                    <h3>{shoe.name}</h3>
                    <p>{shoe.color}</p>
                  </div>

                  <div className="price-block">
                    <strong>{money(shoe.price)}</strong>
                    <del>{money(shoe.old)}</del>
                  </div>
                </div>

                <button
                  className="add-btn"
                  onClick={() => addToCart(shoe)}
                >
                  Add to cart <span>＋</span>
                </button>

              </article>
            ))}
          </div>
        </section>

        <section className="cart-section" id="cart">

          <div className="cart-heading">
            <div>
              <span className="eyebrow">YOUR SELECTION</span>
              <h2>Your shopping bag.</h2>
            </div>

            <span className="cart-count">
              {cartCount} ITEMS
            </span>
          </div>

          <div className="cart-layout">

            <div className="cart-items">

              {cart.length === 0 ? (
                <div className="empty-cart">
                  <span>🛍️</span>
                  <h3>Your bag is waiting</h3>
                  <p>Add a pair you love from the collection above.</p>
                  <a href="#collection" className="text-link">
                    Explore shoes ↗
                  </a>
                </div>
              ) : (
                cart.map((item) => (
                  <div className="cart-item" key={item.id}>

                    <div className={`cart-thumb ${item.bg}`}>
                      {item.emoji}
                    </div>

                    <div className="cart-item-info">
                      <h3>{item.name}</h3>
                      <p>{item.color}</p>
                      <strong>{money(item.price)}</strong>
                    </div>

                    <div className="quantity-control">
                      <button
                        onClick={() => changeQuantity(item.id, -1)}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => changeQuantity(item.id, 1)}
                      >
                        ＋
                      </button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      ×
                    </button>

                  </div>
                ))
              )}

            </div>

            <aside className="summary-card">
              <h3>Order summary</h3>

              <div className="summary-line">
                <span>Subtotal</span>
                <b>{money(total)}</b>
              </div>

              <div className="summary-line">
                <span>Delivery</span>
                <b>{total === 0 ? "—" : "FREE"}</b>
              </div>

              <div className="summary-line">
                <span>Taxes</span>
                <span>Included</span>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <strong>{money(total)}</strong>
              </div>

              <button
                className="checkout-btn"
                disabled={cart.length === 0}
                onClick={() =>
                  alert("Thank you! This is a demo checkout.")
                }
              >
                Proceed to checkout →
              </button>

              <p className="secure-note">
                ♡ Easy returns · Secure checkout demo
              </p>
            </aside>

          </div>
        </section>

      </main>

      <footer id="about">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark">S</span>
          SOLEMATE
        </a>

        <p>Made for the miles that matter.</p>

        <span>© 2026 SOLEMATE · DEMO STORE</span>
      </footer>

      {notice && <div className="toast">✓ {notice}</div>}

    </div>
  );
}

export default App;
