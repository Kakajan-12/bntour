import { motion } from "framer-motion";

const MainGrid = () => {
  return (
    <div>
         <div className="grid grid-cols-4 lg:grid-rows-[repeat(15,_80px)] gap-2 w-full max-w-5xl mx-auto px-2">
        {[
  { span: 'row-span-4', image: '/g1.svg' },
  { span: 'row-span-2', image: '/g2.svg' },
  { span: 'row-span-3', image: '/g3.svg' },
  { span: 'row-span-5', image: '/g4.svg' },
  { span: 'row-span-2 col-start-1 row-start-5', image: '/g5.svg' },
  { span: 'row-span-3 col-start-2 row-start-3', image: '/g6.svg' },
  { span: 'row-span-4 col-start-3 row-start-4', image: '/g7.svg' },
  { span: 'row-span-3 col-start-4 row-start-6', image: '/g8.svg' },
  { span: 'row-span-3 col-start-1 row-start-7', image: '/g9.svg' },
  { span: 'row-span-5 col-start-2 row-start-6', image: '/g10.svg' },
  { span: 'row-span-2 col-start-3 row-start-8', image: '/g11.svg' },
  { span: 'row-span-4 col-start-4 row-start-9', image: '/g12.svg' },
  { span: 'row-span-5 row-start-10', image: '/g13.svg' },
  { span: 'row-span-4 col-start-2 row-start-11', image: '/g14.svg' },
  { span: 'row-span-5 col-start-3 row-start-10', image: '/g17.svg' },
  { span: 'row-span-2 col-start-4 row-start-13', image: '/g16.svg' },
        ].map((item, index) => (
          <div
            key={index}
            className={`${item.span} overflow-hidden `}
          >
             <motion.img
          key={item.id}
          src={item.image}
          alt={`img-${index + 1}`}
          className="w-full h-full object-cover rounded-md cursor-pointer hover:scale-115 transition duration-450"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.3, 
            ease: "easeOut" 
          }}
        />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MainGrid