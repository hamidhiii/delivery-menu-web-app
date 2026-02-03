import "react";
import "./card.scss";
import example from "@/assets/example-2.jpg";
import { numberDigits } from "@/helpers/number-digits";
import { PluseIcon } from "../icons/pluse-icon";
import { useState } from "react";
import { MinusIcon } from "../icons/minus-icon";

// interface IProps {}

export function Card(): React.ReactElement {
  // const {} = props;
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount((p) => ++p);
  };

  const decrement = () => {
    setCount((p) => --p);
  };

  const isCounterShow = count > 0;

  return (
    <div className="card">
      <div className="card__wrap">
        <div className="card__image-wrap">
          <img src={example} alt="" className="card__image" />
        </div>

        <div className="card__description">
          <span className="card__price">{numberDigits(43000)} сум</span>
          {/* <span className="card__price-old">{numberDigits(148000)} сум</span> */}
          <p className="card__name">Фреш Бургер с курицей</p>
          <div className="card__measure">251 г</div>
        </div>
      </div>

      {isCounterShow ? (
        <div className="card__counter">
          <button className="card__counter-btn" onClick={decrement}>
            <MinusIcon width={20} height={20} />
          </button>
          <span>{count}</span>
          <button className="card__counter-btn" onClick={increment}>
            <PluseIcon width={20} height={20} />
          </button>
        </div>
      ) : (
        <button className="card__btn" onClick={increment}>
          <PluseIcon width={20} height={20} />
        </button>
      )}
    </div>
  );
}
