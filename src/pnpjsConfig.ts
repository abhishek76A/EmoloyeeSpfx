import { SPFI, spfi } from '@pnp/sp';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export const getSP = (context: WebPartContext): SPFI => {
  return spfi().using(sp => sp.setup({
    spfxContext: context,
  }));
};