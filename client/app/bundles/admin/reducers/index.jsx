import sidebarReducer from './sidebarReducer';
import { $$initialState as $$sidebarState } from './sidebarReducer';

export default {
  $$sidebarStore: sidebarReducer
};

export const initialStates = {
  $$sidebarState
};
