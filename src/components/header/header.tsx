import Swiper from "swiper";
import { Navbar } from "../navbar/navbar";
import { DeliveryIcon } from "../icons/delivery-icon";
import { PickupIcon } from "../icons/pickup-icon";
import "./header.scss";
import { useState } from "react";

interface IProps {
  setSwiperInstance: React.Dispatch<React.SetStateAction<Swiper | null>>;
  setUserScroll: (value: boolean) => void;
  setActiveIndex: (value: number) => void;
  activeIndex: number;
}

export function Header(props: IProps): React.ReactElement {
  const { activeIndex, setActiveIndex, setSwiperInstance, setUserScroll } = props;
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [lang, setLang] = useState<"RU" | "UZ" | "EN">("RU");

  return (
    <header className="header">
      <div className="header__top">
        <div className="header__langs">
          {(["RU", "UZ", "EN"] as const).map((l) => (
            <button
              key={l}
              className="header__lang"
              data-active={lang === l}
              onClick={() => setLang(l)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="header__toggles">
        <button
          className={`header__toggle ${orderType === "delivery" ? "header__toggle--active" : ""}`}
          onClick={() => setOrderType("delivery")}
        >
          <DeliveryIcon />
          Доставка
        </button>
        <button
          className={`header__toggle ${orderType === "pickup" ? "header__toggle--active" : ""}`}
          onClick={() => setOrderType("pickup")}
        >
          <PickupIcon />
          Самовывоз
        </button>
      </div>

      <Navbar
        {...{ activeIndex, setActiveIndex, setSwiperInstance, setUserScroll }}
      />
    </header>
  );
}
