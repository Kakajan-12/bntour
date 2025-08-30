const ContactSecend = () => {
  return (
    <div className="flex flex-col">
      <h2 className="text-3xl  text-start font-bold text-[#A40000] px-10 lg:px-40 mb-4">Map</h2>

      <div className="w-full flex justify-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5061.418460244334!2d100.53670481111746!3d13.742880673604471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ecde53c821f%3A0xdd059f2a7a0bc650!2zU2VhIExpZmUgQmFuZ2tvayDQvtC60LXQsNC90LDRgNC40YPQvA!5e1!3m2!1sru!2sth!4v1751374622363!5m2!1sru!2sth"
          className="w-full h-screen rounded-lg shadow-md"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default ContactSecend;
