'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HomeContainer() {
  return (
    <div className="home__container container-1 text-[hsl(353,90%,16%)]">
      <motion.div className="home__data" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 2.5, ease: 'easeOut' }}>
        <h1 className="home__title font-bold">
          Welcome To <br /> Poetry
        </h1>
        <p className="home__description">Poetry is a website for better reading poetry, you can visit and feel the charm of poetry, you will feel the beautiful poetry to bring you a wonderful experience.</p>
        <Button asChild className='home__button bg-gradient-to-r from-[hsl(353,98%,67%)] to-[hsl(353,50%,47%)] text-[hsl(353,90%,16%)] font-semibold transition-shadow duration-500 hover:shadow-lg shadow-[hsla(353, 98%, 56%, 0.4)]'>
          <Link href="/poetry">Explore Place</Link>
        </Button>
        <motion.img
          src="img-home/lantern-1.svg"
          alt="lantern 1"
          className="home__lantern-1"
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 3, ease: 'easeOut' }}
        />
        <motion.img
          src="img-home/lantern-2.svg"
          alt="lantern 2"
          className="home__lantern-2"
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 3.2, ease: 'easeOut' }}
        />
      </motion.div>

      <div className="home__images select-none">
        <motion.img src="img-home/img-1.svg" alt="image 1" className="home__img-1" initial={{ opacity: 0, x: 400 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 5 }} />
        <motion.img
          src="img-home/img-2.svg"
          alt="image 2"
          className="home__img-2"
          initial={{ opacity: 0, y: 400 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: 'backOut' }}
        />
        <motion.img
          src="img-home/img-3.svg"
          alt="image 3"
          className="home__img-3"
          initial={{ opacity: 0, y: 400 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: 'backOut' }}
        />
        <motion.img
          src="img-home/img-4.svg"
          alt="image 4"
          className="home__img-4"
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.8, ease: 'backOut' }}
        />
        <motion.img
          src="img-home/img-5.svg"
          alt="image 5"
          className="home__img-5"
          initial={{ opacity: 0, y: 400 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: 'backOut' }}
        />
        <motion.img
          src="img-home/img-6.svg"
          alt="image 6"
          className="home__img-6"
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.1, ease: 'backOut' }}
        />
      </div>
    </div>
  )
}
