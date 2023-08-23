import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import type { CompositeReadResponse, TraitType, TraitItem } from '@/types';
import { root } from 'postcss';

const ROOT_DIR = path.resolve(__dirname, '../../../../../..');

const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const WORK_DIR = path.join(PUBLIC_DIR, 'local', 'ott');

const parseTraitType = (traitTypeDir: string): TraitType => {
  const _arrN = traitTypeDir.split('__');
  const _arrP = _arrN[0].split('_');

  const _group: string = (_arrP.length > 1) ? _arrP[1] : '';

  const _traitType: TraitType = {
    layer: parseInt(_arrP[0]),
    name: _arrN[1],
    group: _group,
    dir: '',
    relDir: '',
  }

  return _traitType;
}

const parseTraitItem = (filename_: string): TraitItem => {
  const _basename: string = path.basename(filename_, '.png').replace(/[_]{2,}/, '__');

  // elements __ trait value
  const _arrN = _basename.split('__');

  // elements string
  const _els = _arrN[0];

  // sex
  let _sex: string | undefined = undefined;
  if (_els.endsWith('_M')) {
    _sex = 'Male';
  } else if (_els.endsWith('_F')) {
    _sex = 'Famale';
  }

  // elements array
  const _arrE = _els.split('_');

  // x.y
  const _arrXY = _arrE[1].split('.');

  // return
  const _traitItem: TraitItem = {
    layer: parseInt(_arrE[0]),
    nonce: (_arrE.length > 2) ? parseInt(_arrE[2]) : undefined,
    x: parseInt(_arrXY[0]) > 0 ? parseInt(_arrXY[0]) : undefined,
    y: (_arrXY.length > 1) ? parseInt(_arrXY[1]) : undefined,
    sex: _sex,
    traitName: '',
    traitValue: (_arrN.length > 1) ? _arrN[1].replace(/[_+]/, ' ') : '',
    dir: '',
    href: '',
  }

  return _traitItem;
};

const getTraitItems = (dir_: string, items_: TraitItem[] = []): TraitItem[] => {
  fs.readdirSync(dir_).forEach((_path) => {
    const _p2file = path.join(dir_, _path);
    if (_path.startsWith('_') || _path.startsWith('.')) return;

    if (fs.lstatSync(_p2file).isDirectory()) {
      items_.concat(getTraitItems(_p2file, items_));
    }
    else if (fs.lstatSync(_p2file).isFile()) {
      if (path.extname(_p2file) !== '.png') return;

      const _item: TraitItem = parseTraitItem(_path);
      _item.dir = _p2file;
      _item.href = _p2file.replace(PUBLIC_DIR, '');
      items_.push(_item);
    }
  });

  return items_;
};


export async function GET(request: Request) {
  let _json: CompositeReadResponse = {
    root_dir: ROOT_DIR,
    work_dir: WORK_DIR,
    traitTypes: [],
    traitItems: [],
  }


  const _traitTypes = fs.readdirSync(WORK_DIR);

  _traitTypes.forEach((_path) => {
    const _p2dir = path.join(WORK_DIR, _path);
    if (!fs.lstatSync(_p2dir).isDirectory()) return;
    if (_path.startsWith('_') || _path.startsWith('.')) return;

    // trait type
    const _traitType: TraitType = parseTraitType(_path);
    _traitType.dir = _p2dir;
    _traitType.relDir = _p2dir.replace(PUBLIC_DIR, '');
    _json.traitTypes.push(_traitType);

    // trait item
    const _traitItems = getTraitItems(_p2dir);
    _json.traitItems = _json.traitItems.concat(_traitItems);
  });


  _json.traitItems.forEach((_item) => {
    const _layer = _item.layer;

    // filter by layer
    const _traitTypes = _json.traitTypes.filter((_traitType) => {
      return _traitType.layer === _layer;
    });

    if (_traitTypes.length === 0) return;

    // trait type
    const _traitType = _traitTypes[0];

    // trait name
    _item.traitName = _traitType.name;
  });






  return NextResponse.json(_json, { status: 200 })

  // return new Response(WORK_DIR);
}
