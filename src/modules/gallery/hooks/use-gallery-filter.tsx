import { parseAsInteger, useQueryStates } from "nuqs";
import { DEFAULT_PAGE } from "../constants";

// if input is empty clears URL to default ""
// E.g. http://localhost:3000/agents?search=test
//  =>  http://localhost:3000/agents
export const useGalleryFilters = () =>
  useQueryStates({
    page: parseAsInteger
      .withDefault(DEFAULT_PAGE)
      .withOptions({ clearOnDefault: true }),
  });
