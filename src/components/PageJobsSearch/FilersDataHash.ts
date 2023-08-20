import { origins, categories } from "@/constants/ui.constants";

const filtersDataHash = {
  categories: {
    label: "دسته بندی",
    constant: categories,
  },
  origins: {
    label: "منبع آگهی",
    constant: origins,
  },
};

export type FilterDataHashType = typeof filtersDataHash;

export default filtersDataHash;
