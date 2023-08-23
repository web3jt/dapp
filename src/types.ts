export type TraitType = {
  layer: number,
  name: string,
  group: string,
  dir: string,
  relDir: string,
}

export type TraitItem = {
  layer: number,
  nonce: number | undefined,
  x: number | undefined,
  y: number | undefined,
  sex: string | undefined,
  traitName: string,
  traitValue: string,
  dir: string,
  href: string,
}

export type TraitGroup = {
  type: TraitType,
  items: TraitItem[],
}

export type CompositeReadResponse = {
  root_dir: string,
  work_dir: string,
  traitTypes: TraitType[],
  traitItems: TraitItem[],
}

