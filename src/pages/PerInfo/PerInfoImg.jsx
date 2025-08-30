import React from 'react';

const PerInfoSecend = () => {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-20">
    <div className="grid grid-cols-8 gap-2">
  <div className="col-span-4 row-span-2">
    <img
      src="/cafe.png"
      alt="img1"
      className="w-full h-full object-cover animate-fade-in delay-100"
    />
  </div>

  <div className="col-span-2 col-start-5">
    <img
      src="/cafe.png"
      alt="img2"
      className="w-full h-full object-cover animate-fade-in delay-300"
    />
  </div>

  <div className="col-span-2 col-start-7">
    <img
      src="/cafe.png"
      alt="img3"
      className="w-full h-full object-cover animate-fade-in delay-500"
    />
  </div>

  <div className="col-span-2 col-start-5 row-start-2">
    <img
      src="/cafe.png"
      alt="img4"
      className="w-full h-full object-cover animate-fade-in delay-700"
    />
  </div>

  <div className="col-span-2 col-start-7 row-start-2">
    <img
      src="/cafe.png"
      alt="img5"
      className="w-full h-full object-cover animate-fade-in delay-900"
    />
  </div>
</div>


    </div>
  );
};

export default PerInfoSecend;
