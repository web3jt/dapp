import Image from 'next/image';

import logo1 from '@/downloads/transistor-logo-white.svg';
import logo2 from '@/downloads/reform-logo-white.svg';
import logo3 from '@/downloads/tuple-logo-white.svg';
import logo4 from '@/downloads/savvycal-logo-white.svg';
import logo5 from '@/downloads/statamic-logo-white.svg';


export default function Logos() {
  return (
    <div className="py-24 sm:py-32 bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-white">
          Trusted by the world’s most innovative teams
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <Image
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src={logo1}
            alt="Transistor"
            width={158}
            height={48}
          />

          <Image
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src={logo2}
            alt="Reform"
            width={158}
            height={48}
          />

          <Image
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src={logo3}
            alt="Tuple"
            width={158}
            height={48}
          />


          <Image
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src={logo4}
            alt="SavvyCal"
            width={158}
            height={48}
          />

          <Image
            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
            src={logo5}
            alt="Statamic"
            width={158}
            height={48}
          />
        </div>
      </div>
    </div>
  )
}
