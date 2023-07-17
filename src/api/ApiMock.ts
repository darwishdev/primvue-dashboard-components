import type { FormKitSelectOptions } from 'formkit-builder/types'

import type {
    RolesListResponse,
    RoleDeleteRestoreRequest,
    RoleCreateResponse, RoleCreateRequest, RoleBulkCreateRequest, RoleBulkCreateResponse, RoleUpdateRequest, RoleUpdateResponse, RoleFindRequest, RoleFindResponse,
    UserCreateResponse, ApiClient, UserCreateRequest, UserUpdateRequest, UserUpdateResponse, UserFindRequest, UserFindResponse
} from './ApiTypes'
export const userCreateRequest: UserCreateRequest = {
    userName: "admin",
    userPhone: "010202000200",
    userEmail: "admin@mln.com",
    userPassword: "123456789",
    userRoles: [1, 2, 3]
};
export const userCreateResponse: UserCreateResponse = {
    user: {
        userId: 1,
        userName: "admin",
        userPhone: "010202000200",
        userEmail: "admin@mln.com",
        userPassword: "123456789",
        userRoles: [1, 2, 3]
    }

};
export const userUpdateRequest: UserUpdateRequest = {
    userId: 1,
    userName: "admin2",
    userPhone: "010202000210",
    userEmail: "admin@mln.com",
    userPassword: "123456789",
    userRoles: [1, 2, 3, 4]



};
export const userUpdateResponse: UserUpdateResponse = {
    user: {
        userId: 1,
        userName: "admin2",
        userPhone: "010202000210",
        userEmail: "admin@mln.com",
        userPassword: "123456789",
        userRoles: [1, 2, 3, 4]

    }

};

export const userFindRequest: UserFindRequest = {
    userId: 1,



};
export const userFindResponse: UserFindResponse = {
    userId: 1,
    userName: "admin2",
    userPhone: "010202000210",
    userEmail: "admin@mln.com",
    userPassword: "123456789",
    userRoles: [1, 2, 3, 4]
};

export const roleCreateRequest: RoleCreateRequest = {
    roleName: "head chef",
    roleDescription: "head chef role",
    permissions: [1, 2, 3, 4, 5]
};
export const roleCreateResponse: RoleCreateResponse = {
    role: {
        roleId: 1,
        roleName: "head chef",
        roleDescription: "head chef role"
    }

};

export const roleBulkCreateRequest: RoleBulkCreateRequest = {
    roles: [
        {
            roleName: "head chef",
            roleDescription: "head chef role",
            permissions: [1, 2, 3, 4, 5]
        }
    ]
};

export const roleBulkCreateResponse: RoleBulkCreateResponse = {
    roles: [
        {
            roleId: 1,
            roleName: "head chef",
            roleDescription: "head chef role",
        },
    ],

}
export const roleUpdateRequest: RoleUpdateRequest = {
    roleId: 1,
    roleName: "head chef",
    roleDescription: "head chef role",
    permissions: [1, 2, 3, 4, 5]



};
export const roleUpdateResponse: RoleUpdateResponse = {
    role: {
        roleId: 1,
        roleName: "head chef",
        roleDescription: "head chef role",

    }

};

export const roleFindRequest: RoleFindRequest = {
    roleId: 1,



};
export const roleFindResponse: RoleFindResponse = {
    roleName: "head chef",
    roleDescription: "head chef role",
    permissions: [1, 2, 3, 4, 5],
    roleId: 1,
    roleUsers: 0,
    rolePermissions: 5
};

export const rolesInputOptions: FormKitSelectOptions[] = [
    { label: 'Admin', value: 1 },
    { label: 'Chef', value: 2 },
    { label: 'Cashier', value: 3 },
    { label: 'Waiter', value: 4 }
]


export const rolesListResponse: RolesListResponse = {
    roles: [
        {
            roleId: 1,
            roleName: "Admin",
            roleUsers: 10,
            rolePermissions: 20
        },
        {
            roleId: 2,
            roleName: "User",
            roleUsers: 50,
            rolePermissions: 30
        }
    ],
    deleteRoles: [
        {
            roleId: 3,
            roleName: "Guest",
            roleUsers: 5,
            rolePermissions: 10
        }
    ]
};
const apiClient: ApiClient = {
    userCreate: async (req: UserCreateRequest): Promise<UserCreateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return userCreateResponse;
    },
    userCreateWithErr: async (req: UserCreateRequest): Promise<UserCreateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        throw new Error("already_exists unique_constraint_users_user_name_key")
    },
    userCreateWithGlobalErr: async (req: UserCreateRequest): Promise<UserCreateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        throw new Error("internal internalServerError")
    },
    userUpdate: async (req: UserUpdateRequest): Promise<UserUpdateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return userUpdateResponse;
    },
    userUpdateWithErr: async (req: UserUpdateRequest): Promise<UserUpdateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        throw new Error("already_exists unique_constraint_users_user_name_key")
    },
    userUpdateWithGlobalErr: async (req: UserUpdateRequest): Promise<UserUpdateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        throw new Error("internal internalServerError")
    },
    userFind: async (req: UserFindRequest): Promise<UserFindResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return userFindResponse;
    },
    userFindWithErr: async (req: UserFindRequest): Promise<UserFindResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        throw new Error("error finding the user")
    },
    rolesList: async (): Promise<RolesListResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return rolesListResponse;
    },
    rolesListWithErr: async (): Promise<RolesListResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        throw new Error('Failed to fetch roles list');
    },
    roleDeleteRestore: async (req: RoleDeleteRestoreRequest): Promise<void> => {
        console.log(`${req.roleId} deleted`)
        await new Promise((resolve) => setTimeout(resolve, 1000));

    },
    roleCreate: async (req: RoleCreateRequest): Promise<RoleCreateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return roleCreateResponse;
    },
    roleBulkCreate: async (req: RoleBulkCreateRequest): Promise<RoleBulkCreateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        return roleBulkCreateResponse;
    },
    getRolesInput: async (): Promise<FormKitSelectOptions[]> => {
        await new Promise((resolve) => setTimeout(resolve, 100));
        return rolesInputOptions;
    },
    getRolesInputWithErr: async (): Promise<FormKitSelectOptions[]> => {
        await new Promise((resolve) => setTimeout(resolve, 100));
        throw new Error("error")
    },
    roleCreateWithErr: async (req: RoleCreateRequest): Promise<RoleCreateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        throw new Error("already_exists unique_constraint_roles_role_name_key")
    },
    roleCreateWithGlobalErr: async (req: RoleCreateRequest): Promise<RoleCreateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        throw new Error("internal internalServerError")
    },
    roleUpdate: async (req: RoleUpdateRequest): Promise<RoleUpdateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return roleUpdateResponse;
    },
    roleUpdateWithErr: async (req: RoleUpdateRequest): Promise<RoleUpdateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        throw new Error("already_exists unique_constraint_roles_role_name_key")
    },
    roleUpdateWithGlobalErr: async (req: RoleUpdateRequest): Promise<RoleUpdateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        throw new Error("internal internalServerError")
    },
    roleFind: async (req: RoleFindRequest): Promise<RoleFindResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return roleFindResponse;
    },
    roleFindWithErr: async (req: RoleFindRequest): Promise<RoleFindResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        throw new Error("error finding the role")
    }
};

export default apiClient;
