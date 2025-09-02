import { useTranslation } from "react-i18next";
import countries from "world-countries";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";

const Book = () => {
  const [captchaImage, setCaptchaImage] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [captchaError, setCaptchaError] = useState(null);

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    travelers: "",
    message: "",
  });

  const captchaInputRef = useRef(null);

  const { t } = useTranslation();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const tourTitle = params.get("tourTitle");
  const tourId = params.get("tourId");

  // Загрузка CAPTCHA
  const loadCaptcha = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}captcha`, {
         method: "GET",
                credentials: "include",
      });
      const svg = await res.text();
      setCaptchaImage(svg);
    } catch (err) {
      console.error("Failed to load captcha", err);
    }
  };

  useEffect(() => {
    loadCaptcha();
  }, []);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    setSuccess(null);
    setCaptchaError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}send-tour`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          tour: tourId || undefined,
          travelers: Number(formData.travelers),
          captcha: captchaText.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // Пытаемся вытащить именно ошибку по капче
        const serverMsg =
          data?.errors?.captcha?.[0] ||
          (typeof data?.error === "string" && /captcha/i.test(data.error) ? data.error : null) ||
          (typeof data?.message === "string" && /captcha/i.test(data.message) ? data.message : null);

        if (serverMsg) {
          setCaptchaError(serverMsg);
          setCaptchaText("");
          // Обновляем картинку и ставим фокус на поле
          await loadCaptcha();
          requestAnimationFrame(() => captchaInputRef.current?.focus());
        } else {
          setError(data?.error || data?.message || "Failed to submit");
        }
      } else {
        setSuccess("Booking submitted successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          travelers: "",
          message: "",
        });
        setCaptchaText("");
        setCaptchaError(null);
        await loadCaptcha();
      }
    } catch (err) {
      setError("Server error");
      await loadCaptcha();
    } finally {
      setSending(false);
    }
  };

  const countryList = countries
    .map((c) => ({ code: c.cca2, name: c.name.common }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="w-full">
      <div className="relative h-[50vh] md:h-[60vh] bg-[url('/rec.png')] bg-no-repeat bg-cover flex items-center justify-center">
        <img
          src="/location.png"
          alt="location"
          className="absolute top-4 left-1/2 -translate-x-1/2 w-[800px]"
        />
        <div className="absolute inset-0 bg-black/50 z-0" />
        <h1 className="text-white -mt-70 sm:-mt-100 md:-mt-80 lg:-mt-20 text-2xl sm:text-4xl lg:text-6xl font-bold text-center z-10 px-2">
          {t("book5.heading")}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative z-20 -mt-80 sm:-mt-120 md:-mt-65 lg:-mt-40 px-4 md:px-8 lg:px-20 pb-10">
          <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl space-y-6">
            {/* Контактные данные */}
            <div className="space-y-4">
              <p className="text-lg font-semibold text-gray-700">{t("contact")}</p>
              <div className="flex flex-col md:flex-row gap-4">
                <select className="border border-[#646464] rounded-md px-4 py-2 w-full md:w-1/4">
                  <option>{t("title5.mr")}</option>
                  <option>{t("title5.miss")}</option>
                </select>
                <input
                  name="firstName"
                  type="text"
                  placeholder={t("firstname")}
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border border-[#646464] rounded-md px-4 py-2 w-full"
                />
                <input
                  name="lastName"
                  type="text"
                  placeholder={t("lastname")}
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border border-[#646464] rounded-md px-4 py-2 w-full"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <select className="border border-[#646464] rounded-md px-4 py-2 w-full md:w-1/2">
                  <option>{t("nationality")}</option>
                  {countryList.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <input
                  name="email"
                  type="email"
                  placeholder={t("email")}
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-[#646464] rounded-md px-4 py-2 w-full"
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder={t("phone")}
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="border border-[#646464] rounded-md px-4 py-2 w-full"
                />
              </div>
            </div>

            {/* Тур и сообщение */}
            <div className="space-y-4">
              <p className="text-lg font-semibold text-gray-700">{t("tour")}</p>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  readOnly
                  type="text"
                  placeholder={t("tourname")}
                  value={tourTitle || ""}
                  className="border border-[#646464] flex-8 rounded-md px-4 py-2 w-full"
                />
                <input
                  name="travelers"
                  type="number"
                  required
                  placeholder={t("travelers")}
                  value={formData.travelers}
                  onChange={handleChange}
                  className="border border-[#646464] no-spinner flex-2 rounded-md px-4 py-2 w-full"
                />
              </div>
              <textarea
                name="message"
                placeholder={t("comments")}
                value={formData.message}
                onChange={handleChange}
                 className="w-full h-64 border border-[#646464] rounded-md px-2 py-2 text-start align-top"
              />
            </div>

            {/* CAPTCHA */}
            <div className="flex col-span-full items-center flex-col gap-2">
              <div className="flex items-center justify-center gap-2">
                <div dangerouslySetInnerHTML={{ __html: captchaImage }} />
                <button
                  type="button"
                  onClick={async () => {
                    await loadCaptcha();
                    setCaptchaText("");
                    setCaptchaError(null);
                    captchaInputRef.current?.focus();
                  }}
                  className="text-sm cursor-pointer hover:text-blue-400 text-blue-600 underline"
                >
                  Refresh
                </button>
              </div>

              <div className="w-full max-w-40">
                <input
                  ref={captchaInputRef}
                  name="captchaText"
                  value={captchaText}
                  onChange={(e) => {
                    setCaptchaText(e.target.value);
                    if (captchaError) setCaptchaError(null);
                  }}
                  className={`border md:text-sm text-xs py-2 px-3 rounded-md w-full ${
                    captchaError ? "border-red-500 ring-1 ring-red-500" : "border-[#646464]"
                  }`}
                  required
                  aria-invalid={!!captchaError}
                  aria-describedby={captchaError ? "captcha-error" : undefined}
                />
                {captchaError && (
                  <p id="captcha-error" role="alert" className="mt-1 text-xs text-red-600">
                    {captchaError}
                  </p>
                )}
              </div>
            </div>

            {/* Кнопка */}
            <div className="flex items-center text-center justify-self-center">
              <button
                type="submit"
                disabled={sending}
                className={`button-82-pushable ${sending ? "opacity-70 pointer-events-none" : ""}`}
              >
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                  {sending ? "..." : t("contact1.send")}
                </span>
              </button>
            </div>

            {success && <p className="text-green-600 mt-2">{success}</p>}
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Book;
