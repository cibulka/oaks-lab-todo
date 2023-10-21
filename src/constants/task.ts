export const TASKS = [
  {
    label: 'Setup virtual office',
    group: 1,
    id: 1,
    blockers: [],
  },
  {
    label: 'Set mission & vision',
    group: 1,
    id: 2,
    blockers: [1],
  },
  {
    label: 'Select business name',
    group: 1,
    id: 3,
    blockers: [1, 2],
  },
  {
    label: 'Buy domains',
    group: 1,
    id: 4,
    blockers: [1, 2, 3],
  },
  {
    label: 'Create roadmap',
    group: 2,
    id: 5,
    blockers: [1, 2, 3, 4],
  },
  {
    label: 'Competitor analysis',
    group: 2,
    id: 6,
    blockers: [1, 2, 3, 4, 5],
  },
  {
    label: 'Release marketing website',
    group: 3,
    id: 7,
    blockers: [1, 2, 3, 4, 5, 6],
  },
  {
    label: 'Release MVP',
    group: 3,
    id: 8,
    blockers: [1, 2, 3, 4, 5, 6, 7],
  },
];

export const GROUPS = [
  {
    label: 'Foundation',
    id: 1,
    blockers: [],
  },
  {
    label: 'Discovery',
    id: 2,
    blockers: [1],
  },
  {
    label: 'Delivery',
    id: 3,
    blockers: [1, 2],
  },
];
