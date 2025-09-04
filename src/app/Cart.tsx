'use client';
import styles from "./types/Cart.module.css";
import { useState, useEffect } from "react";
import { Package } from "./types/types";
import emailjs from "@emailjs/browser";

interface CartProps {
  cart: Package[];
  setCart: React.Dispatch<React.SetStateAction<Package[]>>;
  setSelectedPackages: React.Dispatch<React.SetStateAction<Set<string>>>;
  packages: Package[];
}

const Cart = ({ cart, setCart, setSelectedPackages, packages }: CartProps) => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    emailjs.init("_8KlxS0-6bbPQMhDy");
  }, []);

  const calculateTotal = () => {
    return cart.reduce((total, item: Package) => {
      const price = item.price ? parseFloat(item.price.replace("$", "")) : 0;
      return total + (price || 0) * (item.quantity || 1);
    }, 0);
  };

  const handleRemoveFromCart = (item: Package) => {
    setSelectedPackages((prev: Set<string>) => {
      const newSet = new Set(prev);
      newSet.delete(item.id);
      return newSet;
    });
    setCart((prevCart: Package[]) => prevCart.filter((cartItem) => cartItem.id !== item.id));
  };

  const total = calculateTotal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const selectedPackages = "cheap";

      const templateParams = {
        company: companyName,
        email: email,
        packages: selectedPackages,
      };

      await emailjs.send(
        "service_0ppucce",
        "template_lcjcmz8",
        templateParams,
        "u9J-J_czz99mb0qCW"
      );

      alert("Дякуємо! Ми зв'яжемося з вами найближчим часом.");
      setCompanyName("");
      setEmail("");
      setCart([]);
      setSelectedPackages(new Set());
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'text' in error) {
        console.error("Email sending error:", (error as { text: string }).text);
        alert("Помилка надсилання! " + (error as { text: string }).text);
      } else {
        console.error("Email sending error:", error);
        alert("Помилка надсилання! Спробуйте ще раз.");
      }
    }
  };

  return (
    <section className={styles.cartSection}>
      <div className={styles.blob}></div>
      <div className={styles.cartWrapper}>
        <div className={styles.cartContainer}>
          <form className={styles.orderForm} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Назва компанії"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className={styles.inputField}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputField}
              required
            />
            <button className={styles.orderButton} type="submit" disabled={!companyName || !email}>
              Замовити
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Cart;