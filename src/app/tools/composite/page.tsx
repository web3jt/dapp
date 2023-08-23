'use client';

// import clsx from 'clsx';
import { Atom, atom, useAtom } from 'jotai';
import Container, { Grid6 } from '@/components/root/container';
// import bs58 from 'bs58';

import { useEffect } from 'react';

import useSWR, { Fetcher } from 'swr';
import axios from 'axios';
// import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'

import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import { Code } from "@nextui-org/react";
import { Button } from "@nextui-org/react";


import type { CompositeReadResponse, TraitType, TraitItem, TraitGroup } from '@/types';

const atomCompositeReadData = atom<CompositeReadResponse>({
  root_dir: '',
  work_dir: '',
  traitTypes: [],
  traitItems: [],
});

export const atomTraitTypes: Atom<TraitType[]> = atom((get) => {
  const _data = get(atomCompositeReadData);
  return _data.traitTypes;
});

export const atomTraitItems: Atom<TraitItem[]> = atom((get) => {
  const _data = get(atomCompositeReadData);
  return _data.traitItems;
});

export const atomTraitGroups: Atom<TraitGroup[]> = atom((get) => {
  const groups: TraitGroup[] = [];
  const _data = get(atomCompositeReadData);

  _data.traitTypes.forEach((_traitType: TraitType) => {
    const _traitItems = _data.traitItems.filter((_traitItem: TraitItem) => _traitItem.layer === _traitType.layer);

    if (_traitItems.length > 0) {
      groups.push({
        type: _traitType,
        items: _traitItems,
      });
    }
  });

  return groups;
});



const Title = () => {
  return (
    <Container className="py-12 sm:py-20">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">
          For Local Use Only
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Composite Layers for OTT Artwork
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
          pulvinar et feugiat blandit at. In mi viverra elit nunc.
        </p>
      </div>
    </Container>
  );
}


function useRead() {
  const { data, error, isLoading } = useSWR<CompositeReadResponse>(
    '/api/composite/read',
    (url) => axios.get(url).then((res) => res.data)
  );

  return {
    data,
    isLoading,
    isError: error,
  };
}

// const TraitNames = () => {
//   const [traitTypes,] = useAtom(atomTraitTypes);

//   return (
//     <Container className="py-12 sm:py-20">
//       <Table
//         id="tbl-trait-names"
//         isStriped
//         // removeWrapper
//         aria-label="Example static collection table"
//       >
//         <TableHeader>
//           <TableColumn>Layer</TableColumn>
//           <TableColumn>Group</TableColumn>
//           <TableColumn>Trait Name</TableColumn>
//           <TableColumn>Rel Dir</TableColumn>
//         </TableHeader>
//         <TableBody emptyContent={"No rows to display / loading..."}>
//           {traitTypes.map((traitType: TraitType) => (
//             <TableRow key={traitType.layer}>
//               <TableCell>{traitType.layer}</TableCell>
//               <TableCell>{traitType.group}</TableCell>
//               <TableCell>{traitType.name}</TableCell>
//               <TableCell>{traitType.relDir}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Container>
//   )
// }

const TraitValues = () => {
  const [traitGroups,] = useAtom(atomTraitGroups);

  return (
    <Container className="py-12 sm:py-20">
      <Accordion
        selectionMode="multiple"
      >
        {traitGroups.map((traitGroup: TraitGroup) => (
          <AccordionItem
            key={`tbl-trait-${traitGroup.type.name}-values`}
            title={`#${traitGroup.type.layer}: ${traitGroup.type.name}${traitGroup.type.group ? ` (${traitGroup.type.group})` : ``}`}
            subtitle={`${traitGroup.items.length} items`}
            aria-label="Accordion 1"
          >
            <Table
              id={`tbl-trait-${traitGroup.type.name}-items`}
              isStriped
              aria-label="Example static collection table"
            >
              <TableHeader>
                <TableColumn>
                  Preview
                </TableColumn>

                <TableColumn>
                  Layer
                </TableColumn>
                <TableColumn>
                  X
                </TableColumn>
                <TableColumn>
                  Y
                </TableColumn>
                <TableColumn>
                  Nonce
                </TableColumn>
                <TableColumn>
                  Sex
                </TableColumn>

                <TableColumn>
                  Trait Name
                </TableColumn>
                <TableColumn>
                  Trait Value
                </TableColumn>
                <TableColumn>
                  href
                </TableColumn>
              </TableHeader>
              <TableBody>
                {traitGroup.items.map((traitItem: TraitItem) => (
                  <TableRow key={traitItem.href}>
                    <TableCell>
                      <Image
                        width={100}
                        height={100}
                        alt="NextUI hero Image"
                        src={traitItem.href}
                        isZoomed
                      />
                    </TableCell>

                    <TableCell>
                      {traitItem.layer}
                    </TableCell>
                    <TableCell>
                      {traitItem.x}
                    </TableCell>
                    <TableCell>
                      {traitItem.y}
                    </TableCell>
                    <TableCell>
                      {traitItem.nonce}
                    </TableCell>
                    <TableCell>
                      {traitItem.sex === 'Male' && (
                        <Chip color="primary">{traitItem.sex}</Chip>
                      )}
                      {traitItem.sex === 'Famale' && (
                        <Chip color="danger">{traitItem.sex}</Chip>
                      )}
                    </TableCell>

                    <TableCell>
                      {traitItem.traitName}
                    </TableCell>
                    <TableCell>
                      {traitItem.traitValue}
                    </TableCell>
                    <TableCell>
                      {traitItem.href}
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  )
}



const exec = async (traitGroups_: TraitGroup[]) => {
  console.log('exec...');

  console.log(traitGroups_);




}


const Exec = () => {
  const [traitGroups,] = useAtom(atomTraitGroups);

  return (
    <Container className="py-12 sm:py-20">
      <Button color="primary" onPress={async () => await exec(traitGroups)}>
        Primary
      </Button>
    </Container>
  );
}


export default function Page() {
  const [, setCompositeReadData] = useAtom(atomCompositeReadData);

  const { data, isLoading, isError } = useRead();

  useEffect(() => {
    if (data) {
      setCompositeReadData(data);
    }
  }, [data, setCompositeReadData]);


  return (
    <>
      <Title />
      {/* <TraitNames /> */}
      <TraitValues />
      <Exec />
    </>
  )
}
