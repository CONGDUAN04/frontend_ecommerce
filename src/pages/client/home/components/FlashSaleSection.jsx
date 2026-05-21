import { useEffect, useState } from "react";
import ProductCard from "../../product-detail/ProductCard";

const FlashSaleSection = ({ products }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    if (!products?.length) return;

    const endTime = products[0]?.flashSaleEndTime;

    if (!endTime) return;

    const target = new Date(endTime).getTime();

    const interval = setInterval(() => {
      const now = Date.now();

      const distance = target - now;

      if (distance <= 0) {
        clearInterval(interval);

        setTimeLeft({
          hours: "00",
          minutes: "00",
          seconds: "00",
        });

        return;
      }

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [products]);

  return (
    <section className="flash-sale">
      <div className="flash-sale-header">
        <h2>⚡ FLASH SALE</h2>

        <div className="flash-timer">
          <span>{timeLeft.hours}</span>:<span>{timeLeft.minutes}</span>:
          <span>{timeLeft.seconds}</span>
        </div>
      </div>

      <div className="product-row">
        {products.slice(0, 5).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FlashSaleSection;
