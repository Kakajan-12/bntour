import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ContactHead = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    subject: "",
    message: "",
    captchaText: "",
  });

  const dataApi = import.meta.env.VITE_API_URL;
  const [captchaImage, setCaptchaImage] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);

  // загрузка капчи
  const loadCaptcha = async () => {
    try {
      const res = await fetch(`${dataApi}captcha`, {
        method: "GET",
        credentials: "include",
      });
      const svg = await res.text();
      setCaptchaImage(svg);
    } catch {
      setError("Failed to load captcha");
    }
  };

  useEffect(() => {
    loadCaptcha();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    setCaptchaError(null);
    setSuccess(null);

    try {
      const res = await fetch(`${dataApi}send`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });

      const data = await res.json();

      if (!res.ok) {
        // проверка на ошибку капчи
        if (data?.error?.toLowerCase().includes("captcha")) {
          setCaptchaError(data.error);
          setFormData((prev) => ({ ...prev, captchaText: "" }));
          await loadCaptcha();
        } else {
          setError(data.error || "Failed to send message");
        }
      } else {
        setSuccess("Message sent successfully!");

        // очистка формы
        setFormData({
          name: "",
          surname: "",
          email: "",
          subject: "",
          message: "",
          captchaText: "",
        });
        await loadCaptcha();

        // скрыть сообщение через 5 секунд
        setTimeout(() => setSuccess(null), 5000);
      }
    } catch {
      setError("Server error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center bg-no-repeat bg-center justify-center gap-10 py-20 px-6 sm:px-16 lg:px-40 bg-white"
      style={{ backgroundImage: "url('/redBigMap.png')" }}
    >
      <motion.div
        className="text-center space-y-6 max-w-4xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h1 className="text-2xl md:text-4xl font-bold max-w-lg mx-auto">
          {t("readyAdventureTitle")}
        </h1>
        <p className="text-[#2D1B0D] text-lg">{t("readyAdventureText")}</p>
      </motion.div>

      <motion.form
        className="w-full max-w-8xl space-y-8"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Имя и фамилия */}
        <div className="flex flex-col sm:flex-row gap-6 bg-white">
          <input
            type="text"
            value={formData.name}
            onChange={handleChange}
            name="name"
            placeholder={t("contact1.name") || "Имя"}
            required
            className="w-full border border-[#848484] rounded-lg bg-transparent px-1 py-4 focus:outline-none focus:border-[#336B7B] transition"
          />
          <input
            type="text"
            value={formData.surname}
            onChange={handleChange}
            name="surname"
            placeholder={t("surname")}
            required
            className="w-full border border-[#848484] rounded-lg bg-transparent px-1 py-4 focus:outline-none focus:border-[#336B7B] transition"
          />
        </div>

        {/* Email */}
        <input
          type="email"
          value={formData.email}
          onChange={handleChange}
          name="email"
          placeholder={t("contact1.email") || "Электронная почта"}
          required
          className="w-full border rounded-lg bg-white border-[#848484] px-1 py-4 focus:outline-none focus:border-[#336B7B] transition"
        />

        {/* Сообщение */}
        <textarea
          value={formData.message}
          onChange={handleChange}
          name="message"
          placeholder={t("contact1.message") || "Ваше сообщение"}
          required
          className="w-full h-64 text-start border border-[#848484] bg-white rounded-lg px-1 py-2 focus:outline-none focus:border-[#336B7B] transition"
        />

      <div className="flex items-center justify-center">
          {/* CAPTCHA */}
        <div className="flex flex-col  items-start  gap-2">
          <div dangerouslySetInnerHTML={{ __html: captchaImage }} />
          <button
            type="button"
            onClick={loadCaptcha}
            className="text-sm text-blue-600 underline"
          >
            Refresh
          </button>

          <input
            name="captchaText"
            value={formData.captchaText}
            onChange={handleChange}
            className={`border md:text-sm text-xs py-2 px-3 rounded-md max-w-40 ${
              captchaError ? "border-red-500 ring-1 ring-red-500" : ""
            }`}
            required
          />
          {captchaError && (
            <p className="text-red-500 text-xs">{captchaError}</p>
          )}
        </div>

        {/* Сообщения */}
        {success && (
          <motion.p
            className="text-green-600 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {success}
          </motion.p>
        )}
        {error && (
          <p className="text-red-600 text-center">{error}</p>
        )}
      </div>

        {/* Кнопка */}
        <button
          type="submit"
          disabled={sending}
          className="bg-[#A40000] hover:bg-[#285563] text-white font-semibold w-full py-3 rounded-lg transition duration-200"
        >
          {sending ? "..." : t("contact1.send") || "Отправить"}
        </button>
      </motion.form>
    </div>
  );
};

export default ContactHead;
