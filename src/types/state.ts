import { STATE } from '@/constants/state';

export type State = (typeof STATE)[keyof typeof STATE];
