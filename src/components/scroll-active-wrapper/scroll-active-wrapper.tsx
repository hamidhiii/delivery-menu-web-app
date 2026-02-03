import { useEffect, useRef } from "react";
import { Section } from "../section/section";
import { throttle } from "lodash";
import Swiper from "swiper";
import { mockData } from "../mock/mock";

interface IProps {
  swiperInstance: Swiper | null;
  setUserScroll: (value: boolean) => void;
  userScroll: boolean;
  setActiveIndex: (value: number) => void;
}

export function ScrollActiveWrapper(props: IProps): React.ReactElement {
  const { swiperInstance, userScroll, setUserScroll, setActiveIndex } = props;
  const sectionContainerRef = useRef<null | HTMLDivElement>(null);
  const sectionOffset = 112;
  const isScrolling = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    const sectionContainer = sectionContainerRef.current;
    const handleScroll = throttle(() => {
      if (!sectionContainer) return;
      const sections =
        sectionContainer.querySelectorAll<HTMLElement>("div.section");
      const sectionLen = sections.length - 1;
      if (!sectionContainer) return;

      const containerRect = sectionContainer.getBoundingClientRect();

      if (containerRect.top < 0) {
        const activeSectionIndex =
          sectionLen -
          [...sections].reverse().findIndex((section) => {
            return window.scrollY >= (section?.offsetTop ?? 0) - sectionOffset;
          });

        if (userScroll && activeSectionIndex !== swiperInstance?.activeIndex) {
          setActiveIndex(activeSectionIndex);
          swiperInstance?.slideTo(activeSectionIndex);
        }

        // user scroll set true
        if (isScrolling.current) {
          clearTimeout(isScrolling.current);
        }
        isScrolling.current = setTimeout(() => {
          setUserScroll(true);
        }, 200);
        // user scroll set true
      }
    }, 150);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (isScrolling.current) {
        clearTimeout(isScrolling.current);
      }
    };
  }, [swiperInstance, userScroll, setUserScroll, isScrolling]);

  return (
    <div ref={sectionContainerRef} id="sections-container">
      {mockData?.map((i) => {
        return (
          <Section
            key={i?.id}
            sectionId={i?.id}
            title={i?.title}
            childs={i?.childs}
          />
        );
      })}
    </div>
  );
}
