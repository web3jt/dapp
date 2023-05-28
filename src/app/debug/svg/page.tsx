'use client';

import clsx from 'clsx';
import { atom, useAtom } from 'jotai';
import { BarsArrowUpIcon, UsersIcon, ArrowUpRightIcon, ArrowDownLeftIcon } from '@heroicons/react/20/solid';
// import { Container }
import { encodePacked, keccak256 } from 'viem';


const PAD = 17000;
const GRIDS = 16;
const GRIDS_D = 10000 * GRIDS;
const CANVAS = PAD * 2 + GRIDS_D;
const CORNER_SCALE = 3;
const CORNER_OFFSET = Number(BigInt(CANVAS) * BigInt(CORNER_SCALE - 1) / BigInt(2));

const SHAPE_CIRCLE = 'CIRCLE';
const SHAPE_CROSS = 'CROSS';
const SHAPE_SQUARE = 'SQUARE';
const SHAPE_TRIANGLE = 'TRIANGLE';
const SHAPE_UNDERLINE = 'UNDERLINE';


const _idx2shape = (idx: number) => {
  switch (idx) {
    case 1: return SHAPE_CROSS;
    case 2: return SHAPE_SQUARE;
    case 3: return SHAPE_TRIANGLE;
    default: return SHAPE_CIRCLE;
  }
}

const atomId = atom(BigInt(1));

const atomDNA = atom((get) => {
  const id = get(atomId);
  return keccak256(encodePacked(['uint256'], [id]))
});

const atomHUE = atom((get) => {
  const dna = get(atomDNA);
  return BigInt(dna) % BigInt(360);
});

const atomShapeCoreIdx = atom((get) => {
  const dna = get(atomDNA);
  return Number(BigInt(dna) % BigInt(4));
});

const atomShapeCore = atom((get) => {
  const idx = get(atomShapeCoreIdx);
  return _idx2shape(idx);
});

const atomCssRaws = atom<string[]>((get) => {
  const hue = get(atomHUE);

  const raws: string[] = [];

  // bg
  const egg = get(atomEgg);
  if (egg) {
    raws.push(`--bg: hsl(${hue} 50% 10%);`)
  } else {
    raws.push(`--bg: hsl(${hue} 50% 30%);`)
  }

  // front
  raws.push(`--fr: hsl(${(Number(hue) + 120) % 360} 40% 80%);`)
  raws.push(`--fh: hsl(${(Number(hue) + 240) % 360} 40% 80%);`)

  return raws;
});


const atomEgg = atom<boolean>((get) => {
  const dna = get(atomDNA);
  const bn = BigInt(dna) % BigInt(10);
  return 7 < Number(bn);
});


export default function Page() {
  const [id, setId] = useAtom(atomId);
  const [dna] = useAtom(atomDNA);
  const [hue] = useAtom(atomHUE);
  const [shapeCoreIdx] = useAtom(atomShapeCoreIdx);
  const [shapeCore] = useAtom(atomShapeCore);

  const [egg] = useAtom(atomEgg);

  const [cssRaws] = useAtom(atomCssRaws);

  const increase = () => {
    setId(id + BigInt(1));
  }

  const decrease = () => {
    if (id < BigInt(1)) return;
    setId(id - BigInt(1));
  }

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const num = Number(value);
    if (isNaN(num)) return;

    const newId = BigInt(num);
    if (newId < BigInt(0)) setId(BigInt(0));

    setId(BigInt(num));
  }

  return (
    <div className="px-6 py-8 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Seed */}
        <div>
          <label htmlFor="seed" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
            Seed
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={decrease}
              className={clsx(
                "relative group inline-flex items-center",
                "rounded-l-md",
                "dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800",
                "px-3 py-2 text-sm font-semibold text-gray-900",
                "ring-1 ring-inset ring-gray-300 dark:ring-gray-700",
              )}
            >
              <ArrowDownLeftIcon className="-mr-0.5 h-5 w-5 text-gray-400 group-hover:text-white" aria-hidden="true" />
            </button>

            <input
              type="seed"
              name="seed"
              id="seed"
              className={clsx(
                "relative -mx-px w-full z-10 border-0 rounded-none py-1.5",
                "text-center sm:text-sm sm:leading-6",
                "dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:bg-gray-800",
                "ring-1 ring-inset ring-gray-300 dark:ring-gray-700",
                "focus:ring-1 focus:ring-inset focus:ring-indigo-600",
                "placeholder:text-gray-400",
                "text-gray-900 dark:text-white",
              )}
              value={id.toString()}
              onChange={handleIdChange}
              placeholder="0"
            // readOnly
            />

            <button
              type="button"
              onClick={increase}
              className={clsx(
                "relative group inline-flex items-center",
                "rounded-r-md",
                "dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800",
                "px-3 py-2 text-sm font-semibold text-gray-900",
                "ring-1 ring-inset ring-gray-300 dark:ring-gray-700",
              )}
            >
              <ArrowUpRightIcon className="-ml-0.5 h-5 w-5 text-gray-400 group-hover:text-white" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* DNA */}
        <div>
          <label htmlFor="dna" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white select-none">
            DNA
          </label>
          <input
            type="text"
            name="dna"
            id="dna"
            className={clsx(
              "relative mt-1 w-full rounded-md border-0 py-1.5 pr-10 shadow-sm font-mono",
              "ring-1 ring-inset focus:ring-2 focus:ring-inset",
              "sm:text-sm sm:leading-6",
              "text-gray-900 dark:text-white",
              "ring-gray-300 dark:ring-white/10",
              "placeholder:text-gray-400 dark:placeholder:text-gray-600",
              "focus:ring-indigo-600 dark:focus:ring-indigo-500",
              "dark:bg-white/10",
            )}
            placeholder="DNA"
            defaultValue={dna}
            readOnly
          />
        </div>

        <div className="font-mono text-black dark:text-white">
          <div>
            HUE: {hue.toString()}
          </div>
          <div>
            CORE: {shapeCore}/{shapeCoreIdx}
          </div>

          <div>
            EGG: {egg.toString()}
          </div>
        </div>


        <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${CANVAS} ${CANVAS}`}>
          <style type="text/css">

          </style>
          <defs>

          </defs>

          <path d="M256 192H.1C2.7 117.9 41.3 52.9 99 14.1c13.3-8.9 30.8-4.3 39.9 8.8L256 192zm128-32c0-35.3 28.7-64 64-64h32c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0v64c0 25.2-5.8 50.2-17 73.5s-27.8 44.5-48.6 62.3s-45.5 32-72.7 41.6S253.4 416 224 416s-58.5-5-85.7-14.6s-51.9-23.8-72.7-41.6s-37.3-39-48.6-62.3S0 249.2 0 224l224 0 160 0V160zM80 416a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm240 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z" />
        </svg>

        <div className="font-mono text-black dark:text-white">
          {cssRaws.map((raw, idx) => (
            <div key={idx}>
              {raw}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
