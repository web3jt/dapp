'use client';

import clsx from 'clsx';
import { atom, useAtom } from 'jotai';
import { BarsArrowUpIcon, UsersIcon, ArrowUpRightIcon, ArrowDownLeftIcon } from '@heroicons/react/20/solid';
import viem, { keccak256, encodePacked } from 'viem';


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

const atomSeed = atom(BigInt(1));

const atomDNA = atom((get) => {
  const seed = get(atomSeed);
  return keccak256(encodePacked(['uint256'], [seed]))
});

const atomHUE = atom((get) => {
  const dna = get(atomDNA);
  return BigInt(dna) % BigInt(360);
});

const atomShapeHighlightIdx = atom((get) => {
  const dna = get(atomDNA);
  return Number(BigInt(dna) % BigInt(4));
});

const atomShapeHighlight = atom((get) => {
  const idx = get(atomShapeHighlightIdx);
  return _idx2shape(idx);
});

const moveXY = (x: number, y: number) => {
  return {
    x: PAD + x * 10000,
    y: PAD + y * 10000,
  }
}

const atomTrayEggsAmount = atom((get) => {
  // const egg = get(atomEgg);
  const dna = get(atomDNA);
  const bnDNA = BigInt(dna);
  const bn = bnDNA % BigInt(13);
  return Number(bn);
});

const atomEgg = atom<boolean>((get) => {
  const trayEggsAmount = get(atomTrayEggsAmount);
  return 11 < trayEggsAmount;
});

const atomRandGrids = atom<number[][]>((get) => {
  const dna = get(atomDNA);

  let grids: number[][] = [];
  for (let x = 0; x < GRIDS; x++) {
    let row: number[] = [];
    for (let y = 0; y < GRIDS; y++) {
      const _b = keccak256(encodePacked(['bytes32', 'uint8', 'uint256', 'uint256'], [dna, 1, BigInt(x), BigInt(y)]));
      row.push(Number(BigInt(_b) % BigInt(4)));
    }
    grids.push(row);
  }

  return grids;
});

const atomShapeCounter = atom((get) => {
  const randGrids = get(atomRandGrids);
  const egg = get(atomEgg);

  let counter = {
    circle: 0,
    cross: 0,
    square: 0,
    triangle: 0,
  }

  randGrids.map((row, y) => {
    if (y === 13) return;
    row.map((v, x) => {
      // belt
      if (x === 2) return;

      // title
      if (y > 13 && x > 3 && x < 12) return;

      // indicator
      if (x < 2 && y < 2) return;

      // egg
      if (egg && x > 3 && 7 > x && y > 8 && 12 > y) return;

      switch (v) {
        case 0: counter.circle++; break;
        case 1: counter.cross++; break;
        case 2: counter.square++; break;
        case 3: counter.triangle++; break;
      }
    });
  });

  return counter;
});


const atomCssRows = atom<string[]>((get) => {
  const hue = get(atomHUE);

  const rows: string[] = [];

  let _rootRows: string[] = [];

  // bg
  const egg = get(atomEgg);
  if (egg) {
    _rootRows.push(`--bg: hsl(${hue} 50% 10%);`)
  } else {
    _rootRows.push(`--bg: hsl(${hue} 50% 30%);`)
  }

  // front
  _rootRows.push(`--fr: hsl(${(Number(hue) + 120) % 360} 40% 80%);`)
  _rootRows.push(`--fh: hsl(${(Number(hue) + 240) % 360} 40% 80%);`)

  // 3 colors for the chosen shape
  for (let i = 0; i < 3; i++) {
    _rootRows.push(`--c${i}: hsl(${(Number(hue) + 30 + 120 * i) % 360} 40% 65%);`);
    _rootRows.push(`--b${i}: hsl(${(Number(hue) + 330 + 120 * i) % 360} 30% 65%);`);
  }




  rows.push(`:root {${_rootRows.join('')}}`);

  // opacity: 10 - 90
  for (let _p = 10; _p <= 100; _p += 10) {
    rows.push(`.o${_p} { opacity: ${_p}%; }`);
  }

  // bg
  rows.push(`.bg {
    fill: var(--bg);
  }`);

  rows.push(`.x2 {
    fill: var(--fr);
    stroke: var(--fr);
    stroke-width: 1500;
    stroke-linecap: round;
    stroke-linejoin: round;

    transform: scale(2);
  }`);

  rows.push(`.x2:hover {
      fill: var(--fh);
      stroke: var(--fh);
      stroke-width: 1666;
  }`);

  rows.push(`.x3 {
      transform: scale(3);
  }`);

  rows.push(`.belt {
    fill: transparent;
    stroke: var(--fr);
    stroke-width: 666;
    stroke-linecap: round;
    stroke-linejoin: round;
  }`);

  rows.push(`.gene {
    fill: transparent;
    stroke: var(--fr);
    stroke-width: 666;
    stroke-linecap: round;
    stroke-linejoin: round;
    opacity: 26%;
  }`);

  rows.push(`.gene:hover {
      fill: var(--fr);
      stroke: var(--fr);
      stroke-width: 888;
      opacity: 39%;
  }`);

  rows.push(`.rand {
    fill: transparent;
    stroke: var(--fr);
    stroke-width: 666;
    stroke-linecap: round;
    stroke-linejoin: round;
  }`);

  rows.push(`.rand:hover {
      fill: var(--fh);
      stroke: var(--fh);
      stroke-width: 888;
      animation: none;
  }`);

  rows.push(`.egg {
    fill: var(--fr);
    stroke: var(--fr);
    stroke-width: 666;
    stroke-linecap: round;
    stroke-linejoin: round;
  }`);

  rows.push(`.tray {
      fill: var(--fr);
      stroke: var(--fr);
      stroke-width: 222;
      stroke-linecap: round;
      stroke-linejoin: round;
      opacity: 26%;
  }`);

  rows.push(`.egg0 {
      fill: var(--b0);
      stroke: var(--b0);
      stroke-width: 666;
      stroke-linecap: round;
      stroke-linejoin: round;
  }`);

  rows.push(`.egg0:hover {
      stroke-width: 888;
  }`);


  // tray 11
  for (let i = 0; i < 11; i++) {
    rows.push(`.e${i} {
      transform: translate(${PAD + 152000 - 5000 * i}px, ${PAD - 8000}px);
      opacity: ${20 + 3 * (i + 1)}%;
  }`);
    rows.push(`.e${i}:hover {opacity: 100%;}`);
  }

  rows.push(`.ex {transform: scale(0.6);}`);

  // ?
  rows.push(`
  .t {
    stroke-width: 666;
    stroke-linecap: round;
    stroke-linejoin: round;

    font-family: Courier, monospace;
    font-size: 9000px;
    letter-spacing: 4607px;
  }`);

  rows.push(`.t .t0 {
    fill: var(--fr);
    opacity: 40%;
  }`);

  rows.push(`.t .t1 {
    fill: var(--fr);
    opacity: 60%;
  }`);

  rows.push(`.t .tu {
    fill: transparent;
    stroke: var(--fr);
    opacity: 70%;
  }`);

  rows.push(`.t:hover .t0 {
    opacity: 100%;
  }`);

  rows.push(`.t:hover .t1 {
    opacity: 100%;
  }`);

  rows.push(`.t:hover .tu {
    opacity: 100%;
  }`);


  // b0 ~ b15
  for (let i = 0; i < 16; i++) {
    const _dur = 0.06 * i;
    rows.push(`.b${i} {animation: belt 3s ${_dur}s infinite cubic-bezier(0, 1, 1, 0);}`);
  }

  // belt keyframes
  const BELT_STEP = BigInt(33);
  const BELT_V: number[] = [0, 1, 2];

  let _beltRows: string[] = [];
  BELT_V.map((k, v) => {
    _beltRows.push(`${(BELT_STEP * BigInt(k))}% {fill: var(--b${v});stroke: var(--b${v});}`);
  });
  _beltRows.push(`100% {fill: var(--b${BELT_V[0]});stroke: var(--b${BELT_V[0]});}`);

  rows.push(`@keyframes belt {${_beltRows.join('')}}`);


  //     for (let [k, v] of BELT_V.entries()) {
  //         at4belt.push(`${BELT_STEP.mul(k).toString()}% {fill: var(--b${v});stroke: var(--b${v});}\n`);
  //     }


  // move to corner
  rows.push(`.mCORNER {
    -webkit-transform: translate(-${CORNER_OFFSET}px, -${CORNER_OFFSET}px);
    -moz-transform: translate(-${CORNER_OFFSET}px, -${CORNER_OFFSET}px);
    transform: translate(-${CORNER_OFFSET}px, -${CORNER_OFFSET}px);
  }`);

  // move to x,y by grid
  for (let x = 0; x < GRIDS; x++) {
    for (let y = 0; y < GRIDS; y++) {
      const xy = moveXY(x, y);

      let _moveRows: string[] = [];
      _moveRows.push(`-webkit-transform: translate(${xy.x}px, ${xy.y}px);`);
      _moveRows.push(`-moz-transform: translate(${xy.x}px, ${xy.y}px);`);
      _moveRows.push(`transform: translate(${xy.x}px, ${xy.y}px);`);

      rows.push(`.mX${x}Y${y} {${_moveRows.join('')}}`);
    }
  }


  return rows;
});




export default function Page() {
  const [id, setId] = useAtom(atomSeed);
  const [dna] = useAtom(atomDNA);
  const [hue] = useAtom(atomHUE);
  const [shapeHighlightIdx] = useAtom(atomShapeHighlightIdx);
  const [shapeHighlight] = useAtom(atomShapeHighlight);

  const [egg] = useAtom(atomEgg);

  const [cssRaws] = useAtom(atomCssRows);

  const [trayEggsAmount] = useAtom(atomTrayEggsAmount);

  const [randGrids] = useAtom(atomRandGrids);

  const [shapeCounter] = useAtom(atomShapeCounter);

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

        <div className="font-mono text-black dark:text-white text-center">
          <div>
            {dna}
          </div>
          <div className="space-x-10">
            <span>
              H{hue.toString()} / {shapeHighlight}({shapeHighlightIdx}) / T{trayEggsAmount}({egg.toString()})
            </span>

          </div>
          <div>
            {shapeCounter.circle} / {shapeCounter.cross} / {shapeCounter.square} / {shapeCounter.triangle}
          </div>
        </div>

        <div className="space-y-3 font-mono text-black dark:text-white">
          {randGrids.map((row, y) => (
            <div key={y} className={clsx("grid grid-cols-16 text-center")}>
              {row.map((v, x) => (
                <div key={x} className={clsx(
                  (x === 2 || y === 13) && "opacity-20",
                  (y > 13 && x > 3 && x < 12) && "text-rose-500",
                  (x < 2 && y < 2) && "text-yellow-500",
                  (egg && x > 3 && 7 > x && y > 8 && 12 > y) && "text-rose-500",
                  (x > 3 && 15 > x && y > 0 && 12 > y) && "text-blue-500",
                )}>
                  {v}
                </div>
              ))}
            </div>
          ))}
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${CANVAS} ${CANVAS} `}>
          <style type="text/css">

          </style>
          <defs>

          </defs>

          <path d="M256 192H.1C2.7 117.9 41.3 52.9 99 14.1c13.3-8.9 30.8-4.3 39.9 8.8L256 192zm128-32c0-35.3 28.7-64 64-64h32c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0v64c0 25.2-5.8 50.2-17 73.5s-27.8 44.5-48.6 62.3s-45.5 32-72.7 41.6S253.4 416 224 416s-58.5-5-85.7-14.6s-51.9-23.8-72.7-41.6s-37.3-39-48.6-62.3S0 249.2 0 224l224 0 160 0V160zM80 416a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm240 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z" />
        </svg>
      </div>


      <div className="font-mono text-black dark:text-white font-xs">
        {cssRaws.map((raw, idx) => (
          <div key={idx}>
            {raw}
          </div>
        ))}
      </div>
    </div >
  )
}
