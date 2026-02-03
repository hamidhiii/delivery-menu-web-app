import { useEffect, useState } from "react";
import { Header } from "./components/header/header";
import { ScrollActiveWrapper } from "./components/scroll-active-wrapper/scroll-active-wrapper";
import Swiper from "swiper";
import { HeaderPlaceholder } from "./components/header-placeholder/header-placeholder";

import "swiper/css";
import "swiper/css/pagination";

const tg = window.Telegram.WebApp;

export function App(): React.ReactElement {
  const [swiperInstance, setSwiperInstance] = useState<Swiper | null>(null);
  const [userScroll, setUserScroll] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    tg.ready();
  }, []);

  const onClose = () => {
    tg.close();
  };

  return (
    <div>
      <HeaderPlaceholder />
      <Header
        setUserScroll={setUserScroll}
        setSwiperInstance={setSwiperInstance}
        setActiveIndex={setActiveIndex}
        activeIndex={activeIndex}
        onClose={onClose}
      />
      <ScrollActiveWrapper
        userScroll={userScroll}
        setUserScroll={setUserScroll}
        swiperInstance={swiperInstance}
        setActiveIndex={setActiveIndex}
      />
    </div>
  );
}
