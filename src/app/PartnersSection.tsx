'use client';
import styles from './PartnersSection.module.css';
import Image from 'next/image';

const PartnersSection: React.FC = () => {
  return (
    <section className={styles.partnersSection}>
      <div className={styles.content}>
        <h2 className={styles.title}>Наші партнери</h2>
        <div className={styles.partnersLogos}>
          <Image
            src="/images/partner2.svg" 
            alt="Partner 1"
            width={100}
            height={45}
            className={styles.logo}
          />
          <Image
            src="/images/partner1.svg" 
            alt="Partner 2"
            width={100}
            height={60}
            className={styles.logo}
          />
          <Image
            src="/images/partner3.svg" 
            alt="Partner 3"
            width={100}
            height={55}
            className={styles.logo}
          />
          <Image
            src="/images/partner4.svg" 
            alt="Partner 4"
            width={100}
            height={60}
            className={styles.logo}
          />
          <Image
            src="/images/partner5.svg" 
            alt="Partner 5"
            width={100}
            height={55}
            className={styles.logo}
          />
          <Image
            src="/images/partner6.svg" 
            alt="Partner 6"
            width={100}
            height={50}
            className={styles.logo}
          />
          <Image
            src="/images/partner7.svg"
            alt="Partner 7"
            width={100}
            height={45}
            className={styles.logo}
          />
          <Image
            src="/images/partner9.svg" 
            alt="Partner 8"
            width={100}
            height={55}
            className={styles.logo}
          />
          <Image
            src="/images/partner8.svg"
            alt="Partner 9"
            width={100}
            height={45}
            className={styles.logo}
          />

        </div>
      </div>
    </section>
  );
};

export default PartnersSection;