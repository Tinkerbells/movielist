import { useLayoutStore } from "@/store/layoutStore";
import { useKeenSlider } from "keen-slider/react";
import { FC, ReactNode, useEffect } from "react";

interface CarouselProps {
  children: ReactNode;
  autoplay: boolean;
  setIsDragged: (value: boolean) => void;
}
export const Carousel: FC<CarouselProps> = ({
  children,
  autoplay,
  setIsDragged,
}) => {
  const isSidebarCollapsed = useLayoutStore(
    (state) => state.isSidebarCollapsed
  );

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      breakpoints: {
        "(min-width: 640px)": {
          slides: { perView: 2, spacing: 5 },
        },
        "(min-width: 768px)": {
          slides: { perView: 3, spacing: 5 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 4, spacing: 10 },
        },
        "(min-width: 1280px)": {
          slides: { perView: 5, spacing: 10 },
        },
        "(min-width: 1536px)": {
          slides: { perView: 6, spacing: 10 },
        },
        "(min-width: 1800px)": {
          slides: { perView: 7, spacing: 10 },
        },
        "(min-width: 2560px)": {
          slides: { perView: 10, spacing: 10 },
        },
      },
      loop: true,
      renderMode: "performance",
      drag: true,
      dragStarted: () => {
        setIsDragged(true);
      },
      dragEnded: () => {
        setIsDragged(false);
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider?.next();
          }, 750);
        }
        if (autoplay) {
          slider.on("created", () => {
            slider.container.addEventListener("mouseover", () => {
              mouseOver = true;
              clearNextTimeout();
            });
            slider.container.addEventListener("mouseout", () => {
              mouseOver = false;
              nextTimeout();
            });
            nextTimeout();
          });
          slider.on("dragStarted", clearNextTimeout);
          slider.on("animationEnded", nextTimeout);
          slider.on("updated", nextTimeout);
        }
      },
    ]
  );

  useEffect(() => {
    slider?.current?.update();
  }, [isSidebarCollapsed]);

  return (
    <div
      ref={sliderRef}
      className="keen-slider rounded-box mx-4 flex w-full overflow-hidden"
    >
      {children}
    </div>
  );
};
