
export const LineAndDots = ({ i }) => {
  return (
    <div className="absolute -left-3 -top-2 h-full z-10">
      {/* Вертикальная линия */}
      <div
        className={`absolute left-[8px] ${
          i !== 0 ? "top-0" : "top-7"
        }  top-0  h-36 lg:bottom-0   lg:h-28  w-0.5 bg-tittle bg-[#4B666C]`}
      ></div>

      {/* Круглая точка */}
      <div className="w-3 h-3 bg-tittle bg-[#4B666C] rounded-full absolute left-[3px] top-1/2 -translate-y-1/2"></div>
    </div>
  );
};

export const UnderLine = ({ isActive }) => {
  return (
    <div
      className={`h-[1px] w-full transition-all duration-300 ${
        isActive ? "bg-tittle" : "bg-gray-300"
      }`}
    />
  );
};
