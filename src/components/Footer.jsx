import BottomFooter from "../pages/BottomFooter"; 
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);


gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  useEffect(() => {
    // ➕ Бесконечное вращение hebent.svg
    gsap.to(".hebentLogo", {
      rotation: 360,
      repeat: -1,
      duration: 10, // скорость вращения
      ease: "linear",
    });
  }, []);


  return (
    <div className="relative w-full mt-50 sm:mt-80  bg-[#A40000]">
      <div className="container w-full relative mx-auto  ">
     <div className="absolute  z-0 -top-34 sm:-top-45 md:-top-55 lg:-top-40 xl:-top-48 2xl:-top-55 w-full  xs:w-3/4 lg:w-1/2 left-0">
       <img src="/redmap.png" alt="Red Map" className="sm:w-full" />
        </div>


      <div className="relative z-10 container mx-auto px-5 sm:px-20 py-12 space-y-10 text-white">
        <div className="flex flex-col lg:flex-row  gap-6 py-8">
          <h3 className="text-2xl sm:text-4xl md:text-6xl font-bold font-montserrat">
            BALKANSYYAHAT
          </h3>
        </div>

        <hr className="border-white w-full" />

        <BottomFooter />
      </div>
      </div>
      <div className="absolute z-0 bottom-0 left-0 w-full h-auto">
        <img
          src="/cityFooter.svg"
          alt="City Illustration"
          className="w-full h-auto object-cover pointer-events-none"
        />
      </div>
      <div className="flex lg:text-xl items-center justify-center text-white pb-5">
        <p>All rights reserved | Privacy Policy | Powered by </p>
      <img src="/hebent.svg" alt="img" className="hebentLogo" />
      </div>
    </div>
  );
};

export default Footer
