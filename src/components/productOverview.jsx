import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../section";
import { gsap } from "gsap";
import { useTheme } from "../context/ThemeContext";

export default function ProductOverview() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const productRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  useEffect(() => {
    if (product && productRef.current) {
      // Initial state - hidden
      gsap.set(productRef.current, { opacity: 0, y: 20 });

      // Animate in
      gsap.to(productRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <section className="py-8 bg-bg-primary md:py-16 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="mb-6">
          <Link to="/" className="text-accent hover:underline">
            ← Back to Products
          </Link>
        </div>

        <div
          ref={productRef}
          className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16"
        >
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img
              className="w-full rounded-lg"
              src={product.imageSrc}
              alt={product.imageAlt}
            />
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-2xl font-semibold text-primary sm:text-3xl">
              {product.name}
            </h1>
            <p className="text-3xl font-extrabold text-primary sm:text-4xl mt-4">
              {product.price}
            </p>
            <div className="mt-4 space-y-6">
              <p className="text-lg text-secondary">Color: {product.color}</p>
              <p className="text-base text-secondary">{product.imageAlt}</p>

              <div className="mt-8">
                <button
                  type="button"
                  className={`w-full rounded-md bg-button px-5 py-3 text-sm font-medium shadow-sm hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                    theme === "light" ? "text-gray-900" : "text-white"
                  }`}
                >
                  Add to Cart
                </button>
              </div>

              <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-10">
                <h3 className="text-sm font-medium text-primary">Details</h3>
                <div className="prose prose-sm mt-4 text-secondary">
                  <p>
                    This premium {product.name} is designed for maximum
                    performance and comfort.
                  </p>
                  <p>Perfect for both casual use and professional settings.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
