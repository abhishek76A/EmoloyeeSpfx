import { spfi, SPFI } from '@pnp/sp';
import { SPFx as spfx } from '@pnp/nodejs'; // Correct import
import { WebPartContext } from '@microsoft/sp-webpart-base';

export const getSP = (context: WebPartContext): SPFI => {
  return spfi().using(spfx(context));
};
