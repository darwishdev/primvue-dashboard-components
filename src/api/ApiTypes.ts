import type {
    FileUploadRequest, FileUploadResponse, FileRemoveRequest
} from 'formkit-builder/types'
import type { FormKitSelectOptions } from 'formkit-builder/dist/types'
export interface Permission {
    permission_id: number
    permission_name: string
    permission_function: string
    permission_description: string
}

export interface PermissionsListRow {
    group: string;

    permissions: Permission[];

}
export interface PermissionsListResponse {
    permissions: PermissionsListRow[],
    permissionsIds: number[]

}
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


export interface LoginRequest {
    userName: string;
    userPassword: string;
}

export interface LoginResponse {
    user: {
        userName: string
        userPhone: string
        userEmail: string
    },
    userPermissions: string[]
    tokens: {
        access_token: string
        refresh_token: string
    },
    sideBar: {
        items: any[]
    }
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
    permissionsList: () => Promise<PermissionsListResponse>
    login: (req: LoginRequest) => Promise<LoginResponse>
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
    fileRemove: (req: FileRemoveRequest) => Promise<void>
    fileUpload: (req: FileUploadRequest) => Promise<FileUploadResponse>
    getRolesInput: () => Promise<FormKitSelectOptions[]>
    getRolesInputWithErr: () => Promise<FormKitSelectOptions[]>
}