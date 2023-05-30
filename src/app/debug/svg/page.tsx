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

  const _rows: string[] = [];

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




  _rows.push(`:root {${_rootRows.join('')}}`);

  // opacity: 10 - 90
  for (let _p = 10; _p <= 100; _p += 10) {
    _rows.push(`.o${_p} { opacity: ${_p}%; }`);
  }

  // bg
  _rows.push(`.bg {
    fill: var(--bg);
  }`);

  _rows.push(`.x2 {
    fill: var(--fr);
    stroke: var(--fr);
    stroke-width: 1500;
    stroke-linecap: round;
    stroke-linejoin: round;

    transform: scale(2);
  }`);

  _rows.push(`.x2:hover {
      fill: var(--fh);
      stroke: var(--fh);
      stroke-width: 1666;
  }`);

  _rows.push(`.x3 {
      transform: scale(3);
  }`);

  _rows.push(`.belt {
    fill: transparent;
    stroke: var(--fr);
    stroke-width: 666;
    stroke-linecap: round;
    stroke-linejoin: round;
  }`);

  _rows.push(`.gene {
    fill: transparent;
    stroke: var(--fr);
    stroke-width: 666;
    stroke-linecap: round;
    stroke-linejoin: round;
    opacity: 26%;
  }`);

  _rows.push(`.gene:hover {
      fill: var(--fr);
      stroke: var(--fr);
      stroke-width: 888;
      opacity: 39%;
  }`);

  _rows.push(`.rand {
    fill: transparent;
    stroke: var(--fr);
    stroke-width: 666;
    stroke-linecap: round;
    stroke-linejoin: round;
  }`);

  _rows.push(`.rand:hover {
      fill: var(--fh);
      stroke: var(--fh);
      stroke-width: 888;
      animation: none;
  }`);

  _rows.push(`.egg {
    fill: var(--fr);
    stroke: var(--fr);
    stroke-width: 666;
    stroke-linecap: round;
    stroke-linejoin: round;
  }`);

  _rows.push(`.tray {
      fill: var(--fr);
      stroke: var(--fr);
      stroke-width: 222;
      stroke-linecap: round;
      stroke-linejoin: round;
      opacity: 26%;
  }`);

  _rows.push(`.egg0 {
      fill: var(--b0);
      stroke: var(--b0);
      stroke-width: 666;
      stroke-linecap: round;
      stroke-linejoin: round;
  }`);

  _rows.push(`.egg0:hover {
      stroke-width: 888;
  }`);


  // tray 11
  for (let i = 0; i < 11; i++) {
    _rows.push(`.e${i} {
      transform: translate(${PAD + 152000 - 5000 * i}px, ${PAD - 8000}px);
      opacity: ${20 + 3 * (i + 1)}%;
  }`);
    _rows.push(`.e${i}:hover {opacity: 100%;}`);
  }

  _rows.push(`.ex {transform: scale(0.6);}`);

  // ?
  _rows.push(`
  .t {
    stroke-width: 666;
    stroke-linecap: round;
    stroke-linejoin: round;

    font-family: Courier, monospace;
    font-size: 9000px;
    letter-spacing: 4607px;
  }`);

  _rows.push(`.t .t0 {
    fill: var(--fr);
    opacity: 40%;
  }`);

  _rows.push(`.t .t1 {
    fill: var(--fr);
    opacity: 60%;
  }`);

  _rows.push(`.t .tu {
    fill: transparent;
    stroke: var(--fr);
    opacity: 70%;
  }`);

  _rows.push(`.t:hover .t0 {
    opacity: 100%;
  }`);

  _rows.push(`.t:hover .t1 {
    opacity: 100%;
  }`);

  _rows.push(`.t:hover .tu {
    opacity: 100%;
  }`);


  // b0 ~ b15
  for (let i = 0; i < 16; i++) {
    const _dur = 0.06 * i;
    _rows.push(`.b${i} {animation: belt 3s ${_dur}s infinite cubic-bezier(0, 1, 1, 0);}`);
  }

  // belt keyframes
  const BELT_STEP = BigInt(33);
  const BELT_V: number[] = [0, 1, 2];

  let _beltRows: string[] = [];
  BELT_V.map((k, v) => {
    _beltRows.push(`${(BELT_STEP * BigInt(k))}% {fill: var(--b${v});stroke: var(--b${v});}`);
  });
  _beltRows.push(`100% {fill: var(--b${BELT_V[0]});stroke: var(--b${BELT_V[0]});}`);

  _rows.push(`@keyframes belt {${_beltRows.join('')}}`);


  //     for (let [k, v] of BELT_V.entries()) {
  //         at4belt.push(`${BELT_STEP.mul(k).toString()}% {fill: var(--b${v});stroke: var(--b${v});}\n`);
  //     }


  // move to corner
  _rows.push(`.mCORNER {
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

      _rows.push(`.mX${x}Y${y} {${_moveRows.join('')}}`);
    }
  }


  return _rows;
});

const atomDefsRows = atom<string[]>((get) => {
  const _rows: string[] = [];

  _rows.push(`<filter id="paper">`);
  _rows.push(`<feTurbulence type="fractalNoise" baseFrequency="0.0005" result="noise" numOctaves="5" />`);
  _rows.push(`<feDiffuseLighting in="noise" lighting-color="var(--bg)" surfaceScale="3">`);
  _rows.push(`<feDistantLight azimuth="45" elevation="60" />`);
  _rows.push(`</feDiffuseLighting>`);
  _rows.push(`</filter>`);
  _rows.push(`<radialGradient id="corner">`);
  _rows.push(`<stop offset="0%" stop-color="transparent" />`);
  _rows.push(`<stop offset="5%" stop-color="transparent" />`);
  _rows.push(`<stop offset="100%" stop-color="black" />`);
  _rows.push(`</radialGradient>`);
  // _rows.push(``);

  _rows.push(`<circle id="${SHAPE_CIRCLE}" cx="5000" cy="5000" r="3111" />`);
  _rows.push(`<path id="${SHAPE_CROSS}" d="M2111 2111 L7889 7889 M2111 7889 L7889 2111" />`);
  _rows.push(`<rect id="${SHAPE_SQUARE}" x="2000" y="2000" rx="100" ry="100" width="6000" height="6000" />`);
  _rows.push(`<polygon id="${SHAPE_TRIANGLE}" points="5000 2111, 2111 7889, 7889 7889" />`);
  _rows.push(`<path id="${SHAPE_UNDERLINE}" d="M2111 7889 L7889 7889" />`);
  _rows.push(`<path id="EGG" d="M2111 5500 A2500 3000, 0, 0 0, 7889 5500 A2333 3700, 0, 0 0, 2111 5500" />`);

  return _rows;
});


const atomSvgRows = atom<string[]>((get) => {
  const _rows: string[] = [];
  _rows.push(`<rect width="${CANVAS}" height="${CANVAS}" class="bg" filter="url(#paper)"/>`);
  _rows.push(`<g class="mCORNER"><rect width="${CANVAS}" height="${CANVAS}" fill="url(#corner)" class="x${CORNER_SCALE}" /></g>`);
  return _rows;
});

const atomSvgEncoded = atom((get) => {
  const cssRows = get(atomCssRows);
  const defsRows = get(atomDefsRows);
  const svgRows = get(atomSvgRows);

  const _rows: string[] = [];
  _rows.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CANVAS} ${CANVAS}">`);
  _rows.push(`<style type="text/css">`);
  _rows.push(cssRows.join(''));
  _rows.push(`</style>`);
  _rows.push(`<defs>`);
  _rows.push(defsRows.join(''));
  _rows.push(`</defs>`);
  _rows.push(svgRows.join(''));
  _rows.push(`</svg>`);

  const rows = _rows.join('');

  // return base64 encoded rows
  return `data:image/svg+xml;base64,${btoa(rows)}`;
});




export default function Page() {
  const [id, setId] = useAtom(atomSeed);
  const [dna] = useAtom(atomDNA);
  const [hue] = useAtom(atomHUE);
  const [shapeHighlightIdx] = useAtom(atomShapeHighlightIdx);
  const [shapeHighlight] = useAtom(atomShapeHighlight);

  const [egg] = useAtom(atomEgg);

  const [cssRows] = useAtom(atomCssRows);
  const [defsRows] = useAtom(atomDefsRows);
  const [svgRows] = useAtom(atomSvgRows);

  const [trayEggsAmount] = useAtom(atomTrayEggsAmount);

  const [randGrids] = useAtom(atomRandGrids);

  const [shapeCounter] = useAtom(atomShapeCounter);

  const [svgEncoded] = useAtom(atomSvgEncoded);

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
        <img src={svgEncoded} alt="xx" className="mx-auto" />

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
              {row.map((v, x) => {
                if (x === 2 || y === 13) return (
                  <div key={x} className="opacity-20">
                    .
                  </div>
                );

                // title
                if (y > 13 && x > 3 && x < 12) return (
                  <div key={x} className="text-rose-500">
                    P
                  </div>
                );

                // highlight
                if (x < 2 && y < 2) return (
                  <div key={x} className="text-yellow-500">
                    {shapeHighlightIdx}
                  </div>
                );

                // egg
                if (egg && x > 3 && 7 > x && y > 8 && 12 > y) return (
                  <div key={x} className="text-rose-500">
                    E
                  </div>
                );

                // field
                if (x > 3 && 15 > x && y > 0 && 12 > y) {
                  if (v === shapeHighlightIdx) {
                    return (
                      <div key={x} className="text-green-500">
                        {v}
                      </div>
                    );
                  } else {
                    return (
                      <div key={x} className="text-blue-500">
                        {v}
                      </div>
                    );
                  }
                }

                return (
                  <div key={x}>
                    {v}
                  </div>
                )
              })}
            </div>
          ))}
        </div>


      </div>

      {/* <div className="mt-12 font-mono text-black dark:text-white font-xs">
        {defsRows.map((row, idx) => (
          <div key={idx}>
            {row}
          </div>
        ))}
      </div>

      <div className="mt-12 font-mono text-black dark:text-white font-xs">
        {svgRows.map((row, idx) => (
          <div key={idx}>
            {row}
          </div>
        ))}
      </div>

      <div className="mt-12 font-mono text-black dark:text-white font-xs">
        {cssRows.map((row, idx) => (
          <div key={idx}>
            {row}
          </div>
        ))}
      </div> */}
    </div >
  )
}
