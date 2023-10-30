'use client';

import { motion } from "framer-motion";
import Container, { Grid6 } from '@/components/root/container';

export default function Page() {
  return (
    <>
      <Container>
        <motion.div
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'white',
            borderRadius: '20px'
          }}
          initial={false}
          animate={{
            scale: 1.2,
            rotate: 45
          }}
        />
      </Container>
    </>
  )
}
