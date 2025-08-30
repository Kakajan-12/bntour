import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const ContactLocation = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]); // сгруппированные данные
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const stripHTML = (text) => text?.replace(/<[^>]*>/g, "") || "";
  const lang = i18n.language;
  const getLangKey = (base) =>
    `${base}_${lang === "rus" ? "ru" : lang === "tkm" ? "tk" : "en"}`;

 useEffect(() => {
  const fetchData = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL;

      const [locationsRes, addressesRes, numbersRes, mailsRes] = await Promise.all([
        fetch(`${baseUrl}contact-location`).catch(() => ({ json: async () => [] })),
        fetch(`${baseUrl}contact-address`).catch(() => ({ json: async () => [] })),
        fetch(`${baseUrl}contact-numbers`).catch(() => ({ json: async () => [] })),
        fetch(`${baseUrl}contact-mails`).catch(() => ({ json: async () => [] })),
      ]);

      const locations = (await locationsRes.json()) || [];
      const addresses = (await addressesRes.json()) || [];
      const numbers = (await numbersRes.json()) || [];
      const mails = (await mailsRes.json()) || [];

      const grouped = locations.map((loc) => {
        const address = addresses.find(a => a.location_id_real === loc.id) || null;
        const numberList = numbers.filter(n => n.location_id_real === loc.id).map(n => n.number) || [];
        const mail = mails.find(m => m.location_id_real === loc.id)?.mail || "balkansyyahatviza@gmail.com";

        return {
          location: loc,
          address,
          numbers: numberList,
          mail,
          iframe: address?.iframe || "",
        };
      });

      setData(grouped);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load contact data");
      setLoading(false);
    }
  };

  fetchData();
}, []);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (data.length === 0) return <div>No contact data available</div>;

  const active = data[activeIndex];
  const mapSrcMatch = active.iframe?.match(/src="([^"]+)"/);
  const mapSrc = mapSrcMatch ? mapSrcMatch[1] : "";

  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-10 px-5 lg:px-0 max-w-7xl mx-auto">
      {/* Левый блок: кнопки и карта */}
      <div className="w-full lg:w-1/2 space-y-10">
        <div className="flex gap-4 max-w-xl">
          {data.map((loc, idx) => (
            <button
              key={loc.location.id}
              onClick={() => setActiveIndex(idx)}
              className={`flex-1 px-4 py-3 rounded-2xl border text-center transition-all font-medium focus:outline-none ${
                activeIndex === idx
                  ? "bg-[#A40000] text-white border-[#A40000]"
                  : "bg-white text-[#A40000] border-[#A40000] hover:bg-[#ffe5e5]"
              }`}
            >
              {stripHTML(loc.location?.[getLangKey("location")])}
            </button>
          ))}
        </div>

        <iframe
          src={mapSrc}
          className="w-full max-w-2xl h-72 rounded-lg shadow-md"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Правый блок: контакты */}
      <div className="w-full lg:w-1/2 mt-10 space-y-14">
        <div className="flex items-start justify-center lg:justify-start gap-4">
          <img src="/redl.svg" alt="location icon" className="w-1/11"/>
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-semibold">
              {stripHTML(active.location?.[getLangKey("location")])}
            </p>
            <p className="text-2xl font-semibold">
              {active.address ? stripHTML(active.address[getLangKey("address")]) : ""}
            </p>
            <div className="grid grid-cols-1  sm:grid-cols-2 gap-1">
              {active.numbers?.map((phone, idx) => (
                <a
                  key={idx}
                  href={`tel:${phone}`}
                  className="text-[#A40000] text-lg hover:underline"
                >
                  {phone}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-start justify-center lg:justify-start gap-4">
          <img src="/ashgabat.png" alt="email icon"  className="w-1/11"/>
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-semibold">E-mail address</p>
            <a
              href={`mailto:${active.mail}`}
              className="text-[#A40000] text-lg hover:underline"
            >
              {active.mail}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactLocation;
