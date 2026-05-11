import { createCrudHook } from "../../../../hooks/createCrudHook";

import {
  fetchAllRolesAPI,
  createRoleAPI,
  updateRoleAPI,
  deleteRoleAPI,
} from "../../../../services/api.role";

const useRoleCrud = createCrudHook({
  name: "Vai trò",
  apis: {
    getAll: fetchAllRolesAPI,
    create: createRoleAPI,
    update: updateRoleAPI,
    delete: deleteRoleAPI,
  },
});

export const useRole = () => {
  return useRoleCrud();
};
