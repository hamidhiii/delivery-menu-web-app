import "react";
import "./card.scss";
import example from "@/assets/example-2.jpg";
import { numberDigits } from "@/helpers/number-digits";
import { PluseIcon } from "../icons/pluse-icon";
import { MinusIcon } from "../icons/minus-icon";
import { useCart } from "@/contexts/cart-context";
import { useI18n } from "@/contexts/i18n-context";

// interface IProps {}

export function Card(): React.ReactElement {
  // const {} = props;
  const { addItem, updateQuantity, items } = useCart();
  const { t } = useI18n();

  const productId = "product-1"; // In real app, this would be a prop
  const productName = "Фреш Бургер с курицей";
  const productPrice = 43000;
  const productWeight = "251 г";

  const cartItem = items.find((item) => item.id === productId);
  const quantity = cartItem?.quantity || 0;

  const increment = () => {
    if (quantity === 0) {
      addItem({
        id: productId,
        name: productName,
        price: productPrice,
        image: example,
        weight: productWeight,
      });
    } else {
      updateQuantity(productId, quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 0) {
      updateQuantity(productId, quantity - 1);
    }
  };

  const isCounterShow = quantity > 0;

  return (
    <div className="card">
      <div className="card__wrap">
        <div className="card__image-wrap">
          <img src={example} alt="" className="card__image" />
        </div>

        <div className="card__description">
          <p className="card__name">{productName}</p>
          <div className="card__measure">{productWeight}</div>
          <span className="card__price">
            {numberDigits(productPrice)} {t.sum}
          </span>
        </div>
      </div>

      {isCounterShow ? (
        <div className="card__counter">
          <button className="card__counter-btn" onClick={decrement}>
            <MinusIcon width={20} height={20} />
          </button>
          <span>{quantity}</span>
          <button className="card__counter-btn" onClick={increment}>
            <PluseIcon width={20} height={20} />
          </button>
        </div>
      ) : (
        <button className="card__btn" onClick={increment}>
          <span>{t.addToCart}</span>
          <PluseIcon width={18} height={18} />
        </button>
      )}
    </div>
  );
}
