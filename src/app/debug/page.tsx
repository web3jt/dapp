'use client';

import Placeholder from '@/components/debug/Placeholder';
import Section from '@/components/debug/Section';
import Steps from '@/components/debug/Steps';
import Features1 from '@/components/debug/Features1';
import Features2 from '@/components/debug/Features2';
import Subscribe from '@/components/debug/Subscribe';
import FAQ from '@/components/debug/FAQ';




export default function Page() {
  return (
    <>
      <Section />
      <Features2 />
      <Steps />
      <Features1 />
      <Placeholder />
      <Subscribe />
      <FAQ />
    </>
  )
}
