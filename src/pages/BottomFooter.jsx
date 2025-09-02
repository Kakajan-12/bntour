import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaXTwitter, FaTelegram, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { FiFacebook } from "react-icons/fi";

const BottomFooter = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  const [addresses, setAddresses] = useState([]);
  const [phones, setPhones] = useState([]);
  const [email, setEmail] = useState("");
  const [messengers, setMessengers] = useState([]);

  const stripHtml = (html) => html.replace(/<[^>]+>/g, "");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // Адреса
        const resAddr = await fetch(`${import.meta.env.VITE_API_URL}api/contact-address`);
        const addrData = await resAddr.json();
        if (Array.isArray(addrData)) setAddresses(addrData);

        // Email
        const resMail = await fetch(`${import.meta.env.VITE_API_URL}api/contact-mails`);
        const mailData = await resMail.json();
        if (mailData.length > 0) setEmail(mailData[0].mail);

        // Телефоны
        const resPhone = await fetch(`${import.meta.env.VITE_API_URL}api/contact-numbers`);
        const phoneData = await resPhone.json();
        if (Array.isArray(phoneData)) setPhones(phoneData);

        // Мессенджеры
        const resMess = await fetch(`${import.meta.env.VITE_API_URL}api/links`);
        const messData = await resMess.json();
        if (Array.isArray(messData)) setMessengers(messData);
      } catch (err) {
        console.error("Ошибка при загрузке контактов:", err);
      }
    };

    fetchContacts();
  }, [locale]);

  const renderMessengerIcons = () =>
    messengers.map((item) => {
      const iconType = item.icon?.toLowerCase();
      const icons = {
        telegram: FaTelegram,
        linkedin: FaLinkedin,
        instagram: GrInstagram,
        whatsapp: FaWhatsapp,
        facebook: FiFacebook,
        twitter: FaXTwitter,
      };

      const Icon = icons[iconType];
      if (!Icon) return null;

      return (
        <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer">
          <Icon style={{ width: "25px", height: "25px" }} />
        </a>
      );
    });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between xl:text-2xl gap-10 md:gap-20">
        {/* Левая колонка */}
        <div className="flex flex-col space-y-5 max-w-md">
          <p>{t('footer.description')}</p>
          <div className="flex gap-5">{renderMessengerIcons()}</div>
        </div>

        {/* Контакты */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-3 font-semibold">
            <img src="/phone.png" alt="phone" className="w-5 h-5" />
            <p>{t('footer.contacts')}</p>
          </div>

          {phones.map((phone) => {
            const matchAddress = addresses.find(
              (addr) => addr.location_id_real === phone.location_id_real
            );

            const localizedAddress = matchAddress
              ? locale === "rus"
                ? matchAddress.location_ru
                : locale === "tkm"
                ? matchAddress.location_tk
                : matchAddress.location_en
              : "";

            return (
              <div key={phone.id} className="flex items-center gap-3">
                <img src="/phone.png" alt="phone" className="w-5 h-5" />
                <a href={`tel:${phone.number}`}>
                  <p>
                    {phone.number} : {stripHtml(localizedAddress)}
                  </p>
                </a>
              </div>
            );
          })}

          <div className="flex items-center gap-3">
            <img src="/phone.png" alt="email" className="w-5 h-5" />
            <p>{email}</p>
          </div>
          <div className="flex items-center gap-3">
            <img src="/phone.png" alt="clock" className="w-5 h-5" />
            <p>{t('footer.hours')}</p>
          </div>
        </div>

        {/* Быстрые ссылки */}
        <div className="flex flex-col space-y-2 font-semibold">
          <a href="/contact" className="hover:underline">{t('footer.quickAccess')}</a>
          <a href="/blog" className="hover:underline">{t('footer.blog')}</a>
          <a href="/tour" className="hover:underline">{t('footer.tours')}</a>
          <a href="/about" className="hover:underline">{t('footer.about')}</a>
        </div>
      </div>
    </div>
  );
};

export default BottomFooter;
