import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/cart-context";
import { useI18n } from "@/contexts/i18n-context";
import { numberDigits } from "@/helpers/number-digits";
import { PaymentModal } from "@/components/payment-modal/payment-modal";
import { SuccessModal } from "@/components/success-modal/success-modal";
import "./checkout-page.scss";

export function CheckoutPage(): React.ReactElement {
    const navigate = useNavigate();
    const { items, totalPrice, clearCart } = useCart();
    const { t, language } = useI18n();

    const [needCutlery, setNeedCutlery] = useState(false);
    const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery");
    const [comment, setComment] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [deliveryAddress, setDeliveryAddress] = useState<string | null>(null);
    const [deliveryTime, setDeliveryTime] = useState<string | null>(null);
    const [phoneNumber, setPhoneNumber] = useState("");

    const deliveryFee = deliveryMethod === "delivery" ? 0 : 0; // Бесплатно
    const total = totalPrice + deliveryFee;

    // Проверка заполнения обязательных полей
    const isFormValid = () => {
        if (!paymentMethod) return false;
        if (deliveryMethod === "delivery" && !deliveryAddress) return false;
        return true;
    };

    const handlePlaceOrder = () => {
        if (!isFormValid()) {
            alert(language === "ru"
                ? "Пожалуйста, заполните все обязательные поля"
                : "Iltimos, barcha majburiy maydonlarni to'ldiring");
            return;
        }

        // Show success modal
        setIsSuccessModalOpen(true);
    };

    const handleSuccessConfirm = () => {
        setIsSuccessModalOpen(false);
        clearCart();
        navigate("/orders");
    };

    if (items.length === 0) {
        navigate("/cart");
        return <></>;
    }

    return (
        <div className="checkout-page">
            <div className="checkout-page__header">
                <button className="checkout-page__back" onClick={() => navigate("/cart")}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M15 18L9 12L15 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <h1 className="checkout-page__title">
                    {language === "ru" ? "Оформление заказа" : "Buyurtmani rasmiylashtirish"}
                </h1>
            </div>

            <div className="checkout-page__content">
                {/* Cutlery Section */}
                <div className="checkout-section">
                    <div className="checkout-section__header">
                        <h2 className="checkout-section__title">
                            {language === "ru" ? "Нужны салфетки?" : "Salfetka kerakmi?"}
                        </h2>
                        <p className="checkout-section__subtitle">
                            {language === "ru" ? "Добавить салфетки к заказу" : "Buyurtmaga salfetka qo'shish"}
                        </p>
                    </div>
                    <div className="checkout-toggle">
                        <button
                            className={`checkout-toggle__btn ${!needCutlery ? "checkout-toggle__btn--active" : ""}`}
                            onClick={() => setNeedCutlery(false)}
                        >
                            {language === "ru" ? "Нет" : "Yo'q"}
                        </button>
                        <button
                            className={`checkout-toggle__btn ${needCutlery ? "checkout-toggle__btn--active" : ""}`}
                            onClick={() => setNeedCutlery(true)}
                        >
                            {language === "ru" ? "Да" : "Ha"}
                        </button>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="checkout-section">
                    <h2 className="checkout-section__title">
                        {language === "ru" ? "Ваш заказ" : "Sizning buyurtmangiz"}
                    </h2>
                    <div className="checkout-order">
                        {items.map((item) => (
                            <div key={item.id} className="checkout-order__item">
                                <span className="checkout-order__name">
                                    {item.name} × {item.quantity}
                                </span>
                                <span className="checkout-order__price">
                                    {numberDigits(item.price * item.quantity)} {t.sum}
                                </span>
                            </div>
                        ))}
                        <div className="checkout-order__row">
                            <span>{language === "ru" ? "Сумма заказа:" : "Buyurtma summasi:"}</span>
                            <span>{numberDigits(totalPrice)} {t.sum}</span>
                        </div>
                        <div className="checkout-order__row">
                            <span>{language === "ru" ? "Доставка:" : "Yetkazib berish:"}</span>
                            <span className="checkout-order__free">
                                {language === "ru" ? "Бесплатно" : "Bepul"}
                            </span>
                        </div>
                        <div className="checkout-order__row">
                            <span>{language === "ru" ? "Способ оплаты:" : "To'lov usuli:"}</span>
                            <span className="checkout-order__not-selected">
                                {language === "ru" ? "Не выбрано" : "Tanlanmagan"}
                            </span>
                        </div>
                        <div className="checkout-order__total">
                            <span>{language === "ru" ? "Итого:" : "Jami:"}</span>
                            <span>{numberDigits(total)} {t.sum}</span>
                        </div>
                    </div>
                </div>

                {/* Delivery Method */}
                <div className="checkout-section">
                    <h2 className="checkout-section__title">
                        {language === "ru" ? "Способ получения" : "Olish usuli"}
                    </h2>
                    <div className="checkout-methods">
                        <button
                            className={`checkout-method ${deliveryMethod === "delivery" ? "checkout-method--active" : ""}`}
                            onClick={() => setDeliveryMethod("delivery")}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M13 16V6C13 5.46957 12.7893 4.96086 12.4142 4.58579C12.0391 4.21071 11.5304 4 11 4H3C2.46957 4 1.96086 4.21071 1.58579 4.58579C1.21071 4.96086 1 5.46957 1 6V13C1 13.5304 1.21071 14.0391 1.58579 14.4142C1.96086 14.7893 2.46957 15 3 15H13M13 16C13 16.5304 13.2107 17.0391 13.5858 17.4142C13.9609 17.7893 14.4696 18 15 18M13 16C13 15.4696 13.2107 14.9609 13.5858 14.5858C13.9609 14.2107 14.4696 14 15 14M15 18C15 18.5304 15.2107 19.0391 15.5858 19.4142C15.9609 19.7893 16.4696 20 17 20C17.5304 20 18.0391 19.7893 18.4142 19.4142C18.7893 19.0391 19 18.5304 19 18M15 18H17M19 18C19 18.5304 19.2107 19.0391 19.5858 19.4142C19.9609 19.7893 20.4696 20 21 20C21.5304 20 22.0391 19.7893 22.4142 19.4142C22.7893 19.0391 23 18.5304 23 18M19 18H21M23 18V13C23 12.4696 22.7893 11.9609 22.4142 11.5858C22.0391 11.2107 21.5304 11 21 11H15M15 14V11"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>{t.delivery}</span>
                        </button>
                        <button
                            className={`checkout-method ${deliveryMethod === "pickup" ? "checkout-method--active" : ""}`}
                            onClick={() => setDeliveryMethod("pickup")}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>{t.pickup}</span>
                        </button>
                    </div>
                </div>

                {/* Delivery Address */}
                {deliveryMethod === "delivery" && (
                    <div className="checkout-section">
                        <h2 className="checkout-section__title">
                            {language === "ru" ? "Адрес доставки" : "Yetkazib berish manzili"}
                        </h2>
                        <button
                            className={`checkout-address ${deliveryAddress ? 'checkout-address--selected' : ''}`}
                            onClick={() => {
                                // TODO: Open address selection modal
                                const mockAddress = language === "ru"
                                    ? "ул. Пушкина, 15"
                                    : "Pushkin ko'chasi, 15";
                                setDeliveryAddress(mockAddress);
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>
                                {deliveryAddress || (language === "ru" ? "Выбрать на карте" : "Xaritadan tanlash")}
                            </span>
                            <svg className="checkout-address__arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path
                                    d="M7.5 15L12.5 10L7.5 5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <p className="checkout-address__hint">
                            {language === "ru"
                                ? "Нажмите, чтобы ввести адрес доставки"
                                : "Yetkazib berish manzilini kiritish uchun bosing"}
                        </p>
                    </div>
                )}

                {/* Payment Method */}
                <div className="checkout-section">
                    <h2 className="checkout-section__title">
                        {language === "ru" ? "Способ оплаты" : "To'lov usuli"}
                    </h2>
                    <button className="checkout-payment" onClick={() => setIsPaymentModalOpen(true)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path d="M1 10H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>
                            {paymentMethod
                                ? paymentMethod === "cash"
                                    ? language === "ru"
                                        ? "Наличные"
                                        : "Naqd pul"
                                    : paymentMethod === "uzcard"
                                        ? language === "ru"
                                            ? "Карта UzCard"
                                            : "UzCard karta"
                                        : language === "ru"
                                            ? "Онлайн оплата"
                                            : "Onlayn to'lov"
                                : language === "ru"
                                    ? "Выберите способ оплаты"
                                    : "To'lov usulini tanlang"}
                        </span>
                        <svg className="checkout-payment__arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M7.5 15L12.5 10L7.5 5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                {/* Delivery Time */}
                <div className="checkout-section">
                    <h2 className="checkout-section__title">
                        {language === "ru" ? "Время доставки" : "Yetkazib berish vaqti"}
                    </h2>
                    <button
                        className={`checkout-time ${deliveryTime ? 'checkout-time--selected' : ''}`}
                        onClick={() => {
                            // TODO: Open time selection modal
                            const mockTime = language === "ru"
                                ? "Как можно скорее"
                                : "Iloji boricha tezroq";
                            setDeliveryTime(mockTime);
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>
                            {deliveryTime || (language === "ru" ? "Как можно скорее" : "Imkon qadar tezroq")}
                        </span>
                        <svg className="checkout-time__arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M7.5 15L12.5 10L7.5 5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                {/* Phone Number */}
                <div className="checkout-section">
                    <h2 className="checkout-section__title">
                        {language === "ru" ? "Дополнительный номер телефона" : "Qo'shimcha telefon raqami"}
                    </h2>
                    <div className="checkout-phone">
                        <span className="checkout-phone__code">+998</span>
                        <input
                            type="tel"
                            className="checkout-phone__input"
                            placeholder="XX XXX XX XX"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            maxLength={9}
                        />
                    </div>
                    <p className="checkout-phone__hint">
                        {language === "ru"
                            ? "Курьер свяжется с вами по этому номеру для уточнения деталей доставки"
                            : "Kuryer yetkazib berish tafsilotlarini aniqlash uchun siz bilan bog'lanadi"}
                    </p>
                </div>

                {/* Comment */}
                <div className="checkout-section">
                    <h2 className="checkout-section__title">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M17.5 12.5C17.5 13.163 17.2366 13.7989 16.7678 14.2678C16.2989 14.7366 15.663 15 15 15H5L2.5 17.5V5C2.5 4.33696 2.76339 3.70107 3.23223 3.23223C3.70107 2.76339 4.33696 2.5 5 2.5H15C15.663 2.5 16.2989 2.76339 16.7678 3.23223C17.2366 3.70107 17.5 4.33696 17.5 5V12.5Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        {language === "ru" ? "Комментарий к заказу" : "Buyurtmaga izoh"}
                    </h2>
                    <textarea
                        className="checkout-comment"
                        placeholder={
                            language === "ru"
                                ? "Добавьте комментарий к заказу (необязательно)"
                                : "Buyurtmaga izoh qo'shing (majburiy emas)"
                        }
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        maxLength={200}
                    />
                    <div className="checkout-comment__counter">{comment.length}/200</div>
                </div>
            </div>

            {/* Footer */}
            <div className="checkout-page__footer">
                <button
                    className={`checkout-page__submit ${!isFormValid() ? 'checkout-page__submit--disabled' : ''}`}
                    onClick={handlePlaceOrder}
                    disabled={!isFormValid()}
                >
                    {language === "ru" ? "Оформить заказ" : "Buyurtma berish"} • {numberDigits(total)} {t.sum}
                </button>
            </div>

            {/* Payment Modal */}
            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                onSelect={setPaymentMethod}
                language={language}
            />
            {/* Success Modal */}
            <SuccessModal
                isOpen={isSuccessModalOpen}
                onClose={handleSuccessConfirm}
                language={language}
            />
        </div>
    );
}
