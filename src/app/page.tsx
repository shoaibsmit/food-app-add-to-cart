"use client";

import React, { useState } from "react";

// Define Burger type
type Burger = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

const burgerData: Burger[] = [
  {
    id: 1,
    name: "Zinger",
    price: 5.99,
    description: "Crispy fried chicken burger",
    image: "https://plus.unsplash.com/premium_photo-1684534125661-614f59f16f2e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Mighty",
    price: 6.99,
    description: "Loaded with extra cheese and toppings",
    image: "https://plus.unsplash.com/premium_photo-1683619761492-639240d29bb5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Double Decker",
    price: 7.99,
    description: "Two layers of juicy patties",
    image: "https://images.unsplash.com/photo-1536014019466-da3e69c19fe9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJ1cmdlcnN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    name: "Quad",
    price: 9.99,
    description: "Four stacked patties for the hungry",
    image: "https://images.unsplash.com/photo-1684957691800-502e754ea1e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJ1cmdlcnN8ZW58MHx8MHx8fDA%3D",
  },
];
const PFC: React.FC = () => {
  const [cart, setCart] = useState<Burger[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (burger: Burger) => {
    const updatedCart = [...cart, burger];
    setCart(updatedCart);
    console.log("Cart items:", updatedCart); // Logs cart contents to console
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price, 0).toFixed(2);

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h1 style={styles.navTitle}>PFC - Premium Food Corner</h1>
        <button style={styles.cartButton} onClick={toggleCart}>
          🛒 Cart ({cart.length})
        </button>
      </nav>

      {/* Burger List */}
      <div style={styles.container}>
        {burgerData.map((burger) => (
          <div key={burger.id} style={styles.burgerCard}>
            <img
              src={burger.image}
              alt={burger.name}
              style={styles.burgerImage}
            />
            <h2>{burger.name}</h2>
            <p>{burger.description}</p>
            <p>Price: ${burger.price.toFixed(2)}</p>
            <button style={styles.button} onClick={() => addToCart(burger)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Popup */}
      {isCartOpen && (
        <div style={styles.cartPopup}>
          <div style={styles.cartContent}>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                <ul style={styles.cartList}>
                  {cart.map((item, index) => (
                    <li key={index} style={styles.cartItem}>
                      {item.name} - ${item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
                <p style={styles.total}>
                  <strong>Total: </strong>${calculateTotal()}
                </p>
              </>
            )}
            <button style={styles.closeButton} onClick={toggleCart}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2024 PFC - Premium Food Corner. All Rights Reserved.</p>
        <div style={styles.footerLinks}>
          <a href="#" style={styles.footerLink}>
            Privacy Policy
          </a>
          <a href="#" style={styles.footerLink}>
            Terms of Service
          </a>
          <a href="#" style={styles.footerLink}>
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  );
};

// Styles
const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f8f8",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
  },
  navbar: {
    backgroundColor: "#d62300",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    position: "sticky" as const,
    top: 0,
    zIndex: 1000,
  },
  navTitle: {
    fontSize: "1.8em",
    fontWeight: "bold",
  },
  cartButton: {
    backgroundColor: "white",
    color: "#d62300",
    border: "none",
    borderRadius: "5px",
    padding: "10px 15px",
    cursor: "pointer",
    fontSize: "1em",
  },
  container: {
    display: "flex",
    flexWrap: "wrap" as const,
    justifyContent: "center",
    margin: "20px",
  },
  burgerCard: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    margin: "15px",
    textAlign: "center" as const,
    width: "250px",
    overflow: "hidden",
  },
  burgerImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover" as const,
  },
  button: {
    backgroundColor: "#d62300",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
    margin: "10px 0",
  },
  cartPopup: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1001,
  },
  cartContent: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "20px",
    width: "90%",
    maxWidth: "400px",
    textAlign: "center" as const,
  },
  cartList: {
    listStyle: "none",
    padding: 0,
    margin: "15px 0",
  },
  cartItem: {
    borderBottom: "1px solid #ddd",
    padding: "10px 0",
    fontSize: "1.1em",
  },
  total: {
    fontSize: "1.2em",
    marginTop: "10px",
  },
  closeButton: {
    backgroundColor: "#d62300",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  footer: {
    backgroundColor: "#d62300",
    color: "white",
    textAlign: "center" as const,
    padding: "10px 20px",
    marginTop: "auto",
  },
  footerLinks: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  footerLink: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default PFC;