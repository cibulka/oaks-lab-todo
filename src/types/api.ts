export type Task = {
  group: number;
  label: string;
  id: number;
  blockers: number[];
};

export type Group = {
  label: string;
  id: number;
  blockers: number[];
};

export type Fact = {
  id: string;
  text: string;
  source: string;
  source_url: string;
};
