import Swiper from "swiper";
import { ArrowLeft } from "../icons/arrow-left";
import { SearchIcon } from "../icons/search-icon";
import { Navbar } from "../navbar/navbar";
import "./header.scss";

interface IProps {
  setSwiperInstance: React.Dispatch<React.SetStateAction<Swiper | null>>;
  setUserScroll: (value: boolean) => void;
  setActiveIndex: (value: number) => void;
  activeIndex: number;
  onClose: () => void;
}

export function Header(props: IProps): React.ReactElement {
  const {
    onClose,
    activeIndex,
    setActiveIndex,
    setSwiperInstance,
    setUserScroll,
  } = props;

  return (
    <header className="header">
      <div className="header__wrap">
        <button className="header__btn" onClick={onClose}>
          <ArrowLeft width={20} height={20} />
        </button>
        <h1 className="header__title">Evos</h1>
        <button className="header__btn">
          <SearchIcon width={20} height={20} />
        </button>
      </div>
      <Navbar
        {...{ activeIndex, setActiveIndex, setSwiperInstance, setUserScroll }}
      />
    </header>
  );
}
