<script setup lang="ts">
import apiClient from '@/api/ApiMock';
import type { RolesListResponse, RolesListRequest } from '@/api/ApiTypes'
import DataView from 'primevue/dataview';
import { useDataFetcherList } from 'vue-data-fetcher'
import { ref } from 'vue'
import type { FormFindDataHandler, FormKitOptions, FormSubmitHandler, FormKitInput, FormKitComponent } from 'formkit-builder/types'
import type {
  RoleDeleteRestoreRequest, RoleCreateRequest, RoleCreateResponse, RoleUpdateRequest, RoleUpdateResponse, RoleFindRequest, RoleFindResponse
} from '@/api/ApiTypes';
import LogoError from '@/assets/logo-error.svg'
import type { CreateForm, UpdateForm, CrudOptions, FilterForm } from '@/types';
import { exportCSV } from "@/utils/helpers"
import { errorHandler, sections, toastHandler } from './RoleForm'
import type { DeleteRestoreHandler } from '@/types'
const dataview = ref()

const createOptions: FormKitOptions = {
  title: "role_create",
  allowBulkDelete: false,
}
const createFormSubmitHandler: FormSubmitHandler<RoleCreateRequest, RoleCreateRequest, RoleCreateResponse> = {
  submit: apiClient.roleCreate,
  errorHandler,
}
const updateFormSubmitHandler: FormSubmitHandler<RoleUpdateRequest, RoleUpdateRequest, RoleUpdateResponse> = {
  submit: apiClient.roleUpdate,
  errorHandler,
}

const deleteRestoreHandler: DeleteRestoreHandler<RoleDeleteRestoreRequest> = {
  deleteRestore: apiClient.roleDeleteRestore,
  indentifierPropertyName: 'roleId',

}
const updateFormFindHandler: FormFindDataHandler<RoleFindRequest, RoleFindResponse, any> = {
  findData: apiClient.roleFind,
  findRequerPropertyName: 'roleId',
}
const createForm: CreateForm = {
  sections: sections,
  options: createOptions,
  submitHandler: createFormSubmitHandler,
  toastHandler: toastHandler,
}
const updateForm: UpdateForm = {
  sections: sections,
  options: createOptions,
  submitHandler: updateFormSubmitHandler,
  findHandler: updateFormFindHandler,
  toastHandler: toastHandler,
}
const options: CrudOptions = {
  title: "roles_list",
  showCreateButton: true,
  feature: 'roles',
  showImportButton: true,
  showExportButton: true,
  showDeletedFilter: true,
}
const showDeletedData = ref(false)
const { responseData, loading, error, fetchData } = useDataFetcherList<RolesListRequest, RolesListResponse>(apiClient.rolesList, {} as RolesListRequest);
function onDialogSubmitted(recordId: number) {
  const request: any = {
    roleId: recordId,
  }
}

const showDeletedHandler = (val: any) => {
  showDeletedData.value = val
}
const imported = (data: any) => {
  console.log('importd')
  console.log(data[1])
}
const exportCSVv = () => {

  const data = showDeletedData.value ? responseData.value?.deleteRoles as unknown[] : responseData.value?.roles as unknown[]
  exportCSV(data)
}


const inputs: Array<FormKitInput | FormKitComponent> = [
  {
    $formkit: 'dropdown',
    outerClass: "col-3",
    name: 'roleName',
    label: 'by_role',
    placeholder: 'Select Role',
    options: apiClient.getRolesInput
  },
  {
    $formkit: 'datepicker',
    outerClass: "col-3",
    name: 'createdAt',
    label: 'by_createion_date',
    placeholder: 'Select Date',
  },

  {
    $formkit: 'text',
    outerClass: "col-3",
    name: 'UserPhone',
    label: 'phone_number',
    placeholder: 'Type phone number',
  },
]

const filterForm: FilterForm = {
  inputs,
}
</script>

<template>
  <app-crud @imported="imported" @export="exportCSVv" :filterForm="filterForm" :createForm="createForm" :options="options"
    @showDeleted="showDeletedHandler" class="roles">
    <template #data>
      <div class="grid" v-if="loading">
        <app-card-loading class="col " v-for="i in 3" :key="i" />
      </div>
      <div v-else-if="error">
        <div class="error text-center">
          <logo-error class=" mt-4" />
          <h2 class="text-3xl"> {{ $t("list_error") }}</h2>
          <i class="pi pi-refresh text-3xl mt-4 cursor-pointer" @click="fetchData"></i>
        </div>
      </div>
      <data-view v-else-if="responseData" ref="dataview"
        :value="showDeletedData ? responseData!.deleteRoles : responseData!.roles" paginator layout="grid"
        dataKey="role_id" :rows="9">
        <template #grid="slotProps">
          <div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
            <app-card :deleteRestoreHandler="deleteRestoreHandler" :class="{ 'app-card-restore': showDeletedData }"
              :updateForm="updateForm" :recordId="slotProps.data.roleId" @onDialogSubmitted="onDialogSubmitted">
              <template #start>
                <div style="padding: 0.8rem;">
                  <h4>Permissions</h4>
                  <h3 class="font-bold">{{ slotProps.data.rolePermissions }}</h3>
                  <h4>Users</h4>
                  <h3 class="font-bold">{{ slotProps.data.roleUsers }}</h3>
                </div>
              </template>
              <template #end>
                <router-link :to="{ name: 'role_update', params: { id: slotProps.data.roleId } }"
                  :title="slotProps.data.roleName">{{ slotProps.data.roleName }}</router-link>
              </template>
            </app-card>
          </div>
        </template>
      </data-view>
    </template>
  </app-crud>
</template>