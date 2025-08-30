import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  return (
    <ContentLoader
      speed={2}
      width="100%"
      height={isMobile ? 1200 : 700}
      viewBox={isMobile ? "0 0 400 1200" : "0 0 1440 700"}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className="w-full lg:my-33 mx-auto"
      {...props}
    >
      {/* Заголовок */}
      <rect
        x="20"
        y="10"
        rx="10"
        ry="5"
        width={isMobile ? 360 : 800}
        height="40"
        className="w-full"
      />

      {/* Подзаголовки */}
      <rect
        x="20"
        y="70"
        rx="5"
        ry="5"
        width={isMobile ? 300 : 400}
        height="30"
      />

      {/* Карточки */}
      {isMobile ? (
        // Мобильный вариант: одна колонка
        <>
          <rect x="20" y="150" rx="10" ry="10" width="360" height="200" />
          <rect x="20" y="370" rx="10" ry="10" width="360" height="200" />
          <rect x="20" y="590" rx="10" ry="10" width="360" height="200" />
          <rect x="20" y="810" rx="10" ry="10" width="360" height="200" />
          <rect x="20" y="1030" rx="10" ry="10" width="360" height="200" />
        </>
      ) : (
        // Десктоп: сетка 3x2
        <>
          <rect x="20" y="160" rx="10" ry="10" width="440" height="250" />
          <rect x="500" y="160" rx="10" ry="10" width="440" height="250" />
          <rect x="980" y="160" rx="10" ry="10" width="440" height="250" />

          <rect x="20" y="440" rx="10" ry="10" width="440" height="250" />
          <rect x="500" y="440" rx="10" ry="10" width="440" height="250" />
          <rect x="980" y="440" rx="10" ry="10" width="440" height="250" />
        </>
      )}
    </ContentLoader>
  );
};

export default MyLoader;
