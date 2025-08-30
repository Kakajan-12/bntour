import React from "react";
import ContentLoader from "react-content-loader";

const SliderLoader = (props) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return isMobile ? (
    // --- Вариант для мобильных ---
    <ContentLoader
      speed={2}
      width="100%"
      height="100%"
      viewBox="0 0 390 800"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className="w-full h-screen"
      {...props}
    >
      {/* Прямоугольник на весь экран (мобильный формат) */}
      <rect x="0" y="0" rx="0" ry="0" width="400" height="600" />
    </ContentLoader>
  ) : (
    // --- Вариант для десктопа ---
    <ContentLoader
      speed={2}
      width="100%"
      height="100%"
      viewBox="0 0 1440 900"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className="w-full h-screen"
      {...props}
    >
      {/* Прямоугольник на весь экран (десктопный формат) */}
      <rect x="0" y="0" rx="0" ry="0" width="1440" height="900" />
    </ContentLoader>
  );
};

export default SliderLoader;
