import { createCrudHook } from "../../../../hooks/createCrudHook.js";

import {
  fetchAllColorsAPI,
  createColorAPI,
  updateColorAPI,
  deleteColorAPI,
  fetchColorByIdAPI,
} from "../../../../services/api.color.js";

const useColorCrud = createCrudHook({
  name: "màu sắc",

  apis: {
    getAll: fetchAllColorsAPI,
    getById: fetchColorByIdAPI,
    create: createColorAPI,
    update: updateColorAPI,
    delete: deleteColorAPI,
  },
});

export const useColor = () => {
  const crud = useColorCrud();

  return {
    ...crud,
  };
};
