import "./bottom-nav.scss";
import { HomeIcon } from "../icons/home-icon";
import { CartIcon } from "../icons/cart-icon";
import { OrdersIcon } from "../icons/orders-icon";
import { ProfileIcon } from "../icons/profile-icon";
import { useState } from "react";

export function BottomNav() {
    const [activeTab, setActiveTab] = useState("home");

    const tabs = [
        { id: "home", label: "Главная", icon: <HomeIcon /> },
        { id: "cart", label: "Корзина", icon: <CartIcon /> },
        { id: "orders", label: "Заказы", icon: <OrdersIcon /> },
        { id: "profile", label: "Профиль", icon: <ProfileIcon /> },
    ];

    return (
        <nav className="bottom-nav">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`bottom-nav__item ${activeTab === tab.id ? "bottom-nav__item--active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                >
                    <div className="bottom-nav__icon">{tab.icon}</div>
                    <span className="bottom-nav__label">{tab.label}</span>
                </button>
            ))}
        </nav>
    );
}
