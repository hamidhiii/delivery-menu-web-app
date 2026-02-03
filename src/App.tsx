import { useEffect, useState } from "react";
import { Header } from "./components/header/header";
import { ScrollActiveWrapper } from "./components/scroll-active-wrapper/scroll-active-wrapper";
import Swiper from "swiper";
import { BottomNav } from "./components/bottom-nav/bottom-nav";

import "swiper/css";
import "swiper/css/pagination";

const tg = window.Telegram.WebApp;

export function App(): React.ReactElement {
  const [swiperInstance, setSwiperInstance] = useState<Swiper | null>(null);
  const [userScroll, setUserScroll] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    tg.ready();
    tg.expand();
    tg.enableClosingConfirmation();
  }, []);

  return (
    <div className="app-container">
      <Header
        setUserScroll={setUserScroll}
        setSwiperInstance={setSwiperInstance}
        setActiveIndex={setActiveIndex}
        activeIndex={activeIndex}
      />
      <main className="main-content">
        <ScrollActiveWrapper
          userScroll={userScroll}
          setUserScroll={setUserScroll}
          swiperInstance={swiperInstance}
          setActiveIndex={setActiveIndex}
        />
      </main>
      <BottomNav />
    </div>
  );
}
