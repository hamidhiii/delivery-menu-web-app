import { useCart } from "@/contexts/cart-context";
import { useI18n } from "@/contexts/i18n-context";
import { numberDigits } from "@/helpers/number-digits";
import { MinusIcon } from "@/components/icons/minus-icon";
import { PluseIcon } from "@/components/icons/pluse-icon";
import { useNavigate } from "react-router-dom";
import "./cart-page.scss";

export function CartPage(): React.ReactElement {
    const navigate = useNavigate();
    const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();
    const { t } = useI18n();

    const handlePlaceOrder = () => {
        navigate("/checkout");
    };

    if (items.length === 0) {
        return (
            <div className="cart-page">
                <div className="cart-page__header">
                    <h1 className="cart-page__title">{t.cartTitle} (0)</h1>
                </div>
                <div className="cart-page__empty">
                    <div className="cart-page__empty-icon">🛒</div>
                    <h2 className="cart-page__empty-title">{t.emptyCart}</h2>
                    <p className="cart-page__empty-message">{t.emptyCartMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-page__header">
                <h1 className="cart-page__title">
                    {t.cartTitle} ({items.length})
                </h1>
                <button className="cart-page__clear" onClick={clearCart}>
                    {t.clearCart}
                </button>
            </div>

            <div className="cart-page__items">
                {items.map((item) => (
                    <div key={item.id} className="cart-item">
                        <div className="cart-item__image-wrap">
                            <img src={item.image} alt={item.name} className="cart-item__image" />
                            {item.quantity > 1 && (
                                <div className="cart-item__badge">{item.quantity}x</div>
                            )}
                        </div>

                        <div className="cart-item__info">
                            <h3 className="cart-item__name">{item.name}</h3>
                            {item.weight && <div className="cart-item__weight">{item.weight}</div>}
                            <div className="cart-item__price">
                                {numberDigits(item.price * item.quantity)} {t.sum}
                            </div>
                        </div>

                        <div className="cart-item__controls">
                            <button
                                className="cart-item__btn"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                                <MinusIcon width={20} height={20} />
                            </button>
                            <span className="cart-item__quantity">{item.quantity}</span>
                            <button
                                className="cart-item__btn"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                                <PluseIcon width={20} height={20} />
                            </button>
                        </div>

                        <button
                            className="cart-item__remove "
                            onClick={() => removeItem(item.id)}
                        >
                            🗑️
                        </button>
                    </div>
                ))}
            </div>

            <div className="cart-page__footer">
                <div className="cart-page__total">
                    <span className="cart-page__total-label">{t.total}</span>
                    <span className="cart-page__total-price">
                        {numberDigits(totalPrice)} {t.sum}
                    </span>
                </div>
                <button className="cart-page__order-btn" onClick={handlePlaceOrder}>
                    {t.placeOrder}
                </button>
            </div>
        </div>
    );
}
