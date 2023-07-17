import type { FormKitSelectOptions } from 'formkit-builder/types'

export interface User {
    userId: number;
    userName: string;
    userPhone: string;
    userEmail: string;
    userPassword: string;
    userRoles: number[];
}

export interface UserCreateRequest {
    userName: string;
    userPhone: string;
    userEmail: string;
    userPassword: string;
    userRoles: number[];
}

export interface UserCreateResponse {
    user?: User;
}
export interface UsersListRequest { }

export interface UsersListResponse {
    users: UsersListRow[];
    deleteUsers: UsersListRow[];
 }


export interface UserUpdateRequest {
    userId: number;
    userName: string;
    userPhone: string;
    userEmail: string;
    userPassword: string;
    userRoles: number[];
}

export interface UserUpdateResponse {
    user?: User;
}


export interface UserFindRequest {
    userId: number;
}

export interface UserFindResponse {
    userId: number;
    userName: string;
    userPhone: string;
    userEmail: string;
    userPassword: string;
    userRoles: number[];
}

export interface RolesListRequest { }

export interface RolesListRow {
    roleId: number;
    roleName: string;
    roleUsers: number;
    rolePermissions: number;
}
export interface UsersListRow {
    userId: number;
    userName: string;
    userEmail: string;
    userPhone:  string;
}

export interface RolesListResponse {
    roles: RolesListRow[];
    deleteRoles: RolesListRow[];
}





export interface Role {
    roleId: number;
    roleName: string;
    roleDescription: string;
    createdAt?: Date;
    deletedAt?: Date;
}

export interface RoleCreateRequest {
    roleName: string;
    roleDescription: string;
    permissions: number[];
}

export interface RoleCreateResponse {
    role?: Role;
}



export interface RoleBulkCreateRequest {
    roles: RoleCreateRequest[]
}

export interface RoleBulkCreateResponse {
    roles?: Role[];
}

export interface RoleUpdateRequest {
    roleId: number;
    roleName: string;
    roleDescription: string;
    permissions: number[];
}

export interface RoleUpdateResponse {
    role?: Role;
}


export interface RoleFindRequest {
    roleId: number;
}

export interface RoleFindResponse {
    roleName: string;
    roleDescription: string;
    permissions: number[];
}

export interface RoleFindResponse {
    roleId: number;
    roleName: string;
    roleUsers: number;
    rolePermissions: number;
}
export interface RoleDeleteRestoreRequest {
    roleId: number;
}
export interface ApiClient {
    userCreate: (req: UserCreateRequest) => Promise<UserCreateResponse>
    usersList: () => Promise<UsersListResponse>
    userCreateWithErr: (req: UserCreateRequest) => Promise<UserCreateResponse>
    userCreateWithGlobalErr: (req: UserCreateRequest) => Promise<UserCreateResponse>
    userUpdate: (req: UserUpdateRequest) => Promise<UserUpdateResponse>
    userUpdateWithErr: (req: UserUpdateRequest) => Promise<UserUpdateResponse>
    userUpdateWithGlobalErr: (req: UserUpdateRequest) => Promise<UserUpdateResponse>
    userFind: (req: UserFindRequest) => Promise<UserFindResponse>
    userFindWithErr: (req: UserFindRequest) => Promise<UserFindResponse>
    rolesList: (request: RolesListRequest) => Promise<RolesListResponse>
    rolesListWithErr: (request: RolesListRequest) => Promise<RolesListResponse>
    roleDeleteRestore: (request: RoleDeleteRestoreRequest) => Promise<void>
    roleCreate: (req: RoleCreateRequest) => Promise<RoleCreateResponse>
    roleCreateWithErr: (req: RoleCreateRequest) => Promise<RoleCreateResponse>
    roleCreateWithGlobalErr: (req: RoleCreateRequest) => Promise<RoleCreateResponse>
    roleBulkCreate: (req: RoleBulkCreateRequest) => Promise<RoleBulkCreateResponse>
    roleUpdate: (req: RoleUpdateRequest) => Promise<RoleUpdateResponse>
    roleUpdateWithErr: (req: RoleUpdateRequest) => Promise<RoleUpdateResponse>
    roleUpdateWithGlobalErr: (req: RoleUpdateRequest) => Promise<RoleUpdateResponse>
    roleFind: (req: RoleFindRequest) => Promise<RoleFindResponse>
    roleFindWithErr: (req: RoleFindRequest) => Promise<RoleFindResponse>
    getRolesInput: () => Promise<FormKitSelectOptions[]>
    getRolesInputWithErr: () => Promise<FormKitSelectOptions[]>
}