import Swiper from "swiper";
import { Navbar } from "../navbar/navbar";
import { DeliveryIcon } from "../icons/delivery-icon";
import { PickupIcon } from "../icons/pickup-icon";
import { useI18n, Language } from "@/contexts/i18n-context";
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
  const { language, setLanguage, t } = useI18n();

  return (
    <header className="header">
      <div className="header__top">
        <div className="header__langs">
          {(["ru", "uz"] as Language[]).map((l) => (
            <button
              key={l}
              className="header__lang"
              data-active={language === l}
              onClick={() => setLanguage(l)}
            >
              {l.toUpperCase()}
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
          {t.delivery}
        </button>
        <button
          className={`header__toggle ${orderType === "pickup" ? "header__toggle--active" : ""}`}
          onClick={() => setOrderType("pickup")}
        >
          <PickupIcon />
          {t.pickup}
        </button>
      </div>

      <Navbar
        {...{ activeIndex, setActiveIndex, setSwiperInstance, setUserScroll }}
      />
    </header>
  );
}
