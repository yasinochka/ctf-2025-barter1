'use client';
import styles from './WhyParticipateSection.module.css';
import { useState } from 'react';

interface RectangleData {
  title: string;
  text: string;
}

const WhyParticipateSection: React.FC = () => {
  const rectanglesData: RectangleData[] = [
    {
      title: "Ефективний піар",
      text: "Ми подбаємо про згадки, сторіс, пости та логотип на наших платформах. Фото і відео, де розумні та амбітні студенти насолоджуються вашою продукцією. Просування вашого бренду через інформаційні платформи BEST Lviv розширить охоплення у соцмережах та зміцнить впізнаваність серед широкої аудиторії.",
    },
    {
      title: "Популяризація через прямий контакт з продуктом",
      text: "Під час події учасники особисто спробують вашу продукцію та зможуть оцінити її смак і високу якість. Для компаній у сфері харчування, змога дати спробувати свій продукт десятку потенційних клієнтів — це унікальна маркетингова можливість з максимальною віддачею.",
    },
    {
      title: "Посилення іміджу через соціальну відповідальність",
      text: "Партнерство – це заява про ваші цінності. Ви маєте можливість позиціювати себе не як чергова компанія, яких тисячі, а як та, що інвестує в інтелектуальне майбутнє України та підтримує сферу, яка є драйвером економіки. Це потужний репутаційний актив, що виділяє Вас на фоні конкурентів.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleRectangle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
    document.querySelectorAll(`.${styles.rectangle}`).forEach((rect: Element, i: number) => {
      if (i !== index) {
        const element = rect as HTMLElement;
        element.classList.remove(styles.active);
      }
    });
  };

  return (
    <section className={styles.whyparticipateSection}>
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.text}>
            <h1>Переваги для партнерів</h1>
          </div>
          <div className={styles.rectangles}>
            {rectanglesData.map((rect, index) => (
              <div
                key={index}
                className={`${styles.rectangle} ${activeIndex === index ? styles.active : ''}`}
                onClick={() => toggleRectangle(index)}
              >
                <div className={styles.dropdownTrigger}>
                  <h3 className={styles.rectangleTitle}>{rect.title}</h3>
                  <div className={`${styles.triangle} ${activeIndex === index ? styles.rotated : ''}`}></div>
                </div>
                <div className={styles.dropdownContent}>
                  <p className={styles.rectangleText}>{rect.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.glowBlob}></div>
        </div>
      </div>
    </section>
  );
};

export default WhyParticipateSection;