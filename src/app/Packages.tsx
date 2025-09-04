'use client';
import styles from "./types/Packages.module.css";
import { useState, useEffect } from "react";
import { Package } from "./types/types";
import Image from "next/image";

interface PackagesProps {
  cart: Package[];
  setCart: React.Dispatch<React.SetStateAction<Package[]>>;
  selectedPackages: Set<string>;
  setSelectedPackages: React.Dispatch<React.SetStateAction<Set<string>>>;
  setHighlightedOptions?: (options: string[]) => void;
}

const Packages = ({ cart, setCart, selectedPackages, setSelectedPackages, setHighlightedOptions = () => {} }: PackagesProps) => {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const defaultPackage: Package = {
    id: "1",
    name: "ПРОПОЗИЦІЯ",
    price: "",
    features: [
      "Промоція в 1 Instagram Story",
      "Фотозвіт та згадка про компанію в постпроєктному відео",
      "Логотип компанії на бренд-воллі",
      "Транслювання відеоролика на місці події",
    ],
    descriptions: [
      "Story містить логотип, назву компанії й фото наданої продукції, та буде розміщена після івенту на офіційній сторінці @best_lviv.",
      "Після завершення змагань кожна компанія-партнер отримає звітність з усіма фотографіями компанії. Також логотип компанії з’явиться наприкінці відео, що підсумовує подію та публікується на Instagram-сторінці @best_lviv після завершення CTF 2025.",
      "На місці проведення події буде розміщено великий банер з логотипами всіх компаній, що стали нашими партнерами.",
      "На місці проведення змагань будуть транслюватися відеоролики компаній. Необхідні відеоматеріали тривалістю до 40 секунд надає компанія-учасник.",
    ],
  };

  useEffect(() => {
    if (!cart.some((item) => item.id === "1")) {
      setCart((prevCart) => [...prevCart, { ...defaultPackage, quantity: 1 }]);
      setSelectedPackages((prev) => new Set([...prev, "1"]));
    }
  }, [cart, setCart, setSelectedPackages]);

  useEffect(() => {
    const highlightedOptions: string[] = [];
    if (selectedPackages.has("1")) {
      highlightedOptions.push("Промоція в 1 Instagram Story");
    }
    setHighlightedOptions(highlightedOptions);
  }, [selectedPackages, setHighlightedOptions]);

  const openDetails = (pkg: Package) => {
    setSelectedPackage(pkg);
  };

  const closeDetails = () => {
    const modalOverlay = document.querySelector(`.${styles.modalOverlay}`);
    const modalContent = document.querySelector(`.${styles.modalContent}`);
    if (modalOverlay && modalContent) {
      modalOverlay.classList.add(`${styles.closing}`);
      modalContent.classList.add(`${styles.closing}`);
      setTimeout(() => {
        setSelectedPackage(null);
        modalOverlay.classList.remove(`${styles.closing}`);
        modalContent.classList.remove(`${styles.closing}`);
      }, 700);
    }
  };

  useEffect(() => {
    if (selectedPackage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedPackage]);

  return (
    <section className={styles.packagesSection} id="offers">
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>ПРОПОЗИЦІЯ</h1>
        <div className={styles.iconSection}>
          <Image
            src="/images/prep_finger.svg"
            alt="Finger Icon"
            width={450}
            height={500}
            className={styles.cornerIconLeft}
          />
          <Image
            src="/images/prep_mask.png"
            alt="Mask Icon"
            width={450}
            height={600}
            className={styles.cornerIconRight}
          />
        </div>
        <div className={styles.packagesContainer}>
          <div
            className={`${styles.packageCard} ${styles.packageCardBase}`}
            data-package={defaultPackage.id}
          >
            <h2 className={styles.packageTitle}>{defaultPackage.name}</h2>
            <p className={styles.mandatoryText}>Цей пакет є обов’язковим!</p>
            <div className={styles.packageFeatures}>
              {defaultPackage.features.map((feature, index) => (
                <p
                  key={index}
                  className={styles.featureItem}
                  data-testid={`feature-item-${defaultPackage.id}-${index}`}
                >
                  <Image
                    src="/images/Union1.svg"
                    alt="Union Icon"
                    width={10}
                    height={10}
                    className={styles.unionBase}
                  />
                  {feature}
                </p>
              ))}
            </div>
            <div className={styles.infoGroup}>
              <Image
                src="/images/info.png"
                alt="Partner Info"
                width={20}
                height={20}
                className={styles.infoBase}
                onClick={(e) => {
                  e.stopPropagation();
                  openDetails(defaultPackage);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedPackage && (
        <div className={styles.modalOverlay} onClick={closeDetails}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Image
              src="/images/close.svg"
              alt="Close Modal"
              width={40}
              height={40}
              className={styles.closeIcon}
              onClick={closeDetails}
            />
            <h2 className={styles.modalTitle}>{selectedPackage.name}</h2>
            <ul className={styles.modalFeatures}>
              {selectedPackage.features.map((feature, index) => (
                <li key={index}>
                  <h3 className={styles.featureTitle}>{feature}</h3>
                  <p className={styles.descriptionText}>{selectedPackage.descriptions[index]}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default Packages;