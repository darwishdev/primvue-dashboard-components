<script setup lang="ts">
import apiClient from '@/api/ApiMock';
import type { UsersListRequest, UsersListResponse } from '@/api/ApiTypes'
import DataView from 'primevue/dataview';
import { useDataFetcherList } from 'vue-data-fetcher'
import { ref } from 'vue'
import type { FormFindDataHandler, FormKitOptions, FormSubmitHandler, FormKitInput, FormKitComponent } from 'formkit-builder/types'
import type {
  RoleDeleteRestoreRequest, UserCreateRequest, UserCreateResponse, UserUpdateRequest, UserUpdateResponse, UserFindRequest, UserFindResponse
} from '@/api/ApiTypes';
import LogoError from '@/assets/logo-error.svg'
import type { CreateForm, UpdateForm, CrudOptions, FilterForm } from '@/types';
import { exportCSV } from "@/utils/helpers"
import { errorHandler, sections, toastHandler } from './UserForm'
import type { DeleteRestoreHandler } from '@/types'
const dataview = ref()

const createOptions: FormKitOptions = {
  title: "User_create",
  allowBulkDelete: false,
}
const createFormSubmitHandler: FormSubmitHandler<UserCreateRequest, UserCreateRequest, UserCreateResponse> = {
  submit: apiClient.userCreate,
  errorHandler,
}
const updateFormSubmitHandler: FormSubmitHandler<UserUpdateRequest, UserUpdateRequest, UserUpdateResponse> = {
  submit: apiClient.userUpdate,
  errorHandler,
}

const deleteRestoreHandler: DeleteRestoreHandler<RoleDeleteRestoreRequest> = {
  deleteRestore: apiClient.roleDeleteRestore,
  indentifierPropertyName: 'roleId',
}
const updateFormFindHandler: FormFindDataHandler<UserFindRequest, UserFindResponse, any> = {
  findData: apiClient.userFind,
  findRequerPropertyName: 'userId',
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
  title: "users_list",
  showCreateButton: true,
  feature: 'users',
  showImportButton: true,
  showExportButton: true,
  showDeletedFilter: true,
}
const showDeletedData = ref(false)
const { responseData, loading, error, fetchData } = useDataFetcherList<UsersListRequest, UsersListResponse>(apiClient.usersList, {} as UsersListRequest);
// function onDialogSubmitted(recordId: number) {
//   const request: any = {
//     userId: recordId,
//   }
// }

const showDeletedHandler = (val: any) => {
  showDeletedData.value = val
}
const imported = (data: any) => {
  console.log('importd')
  console.log(data[1])
}
const exportCSVv = () => {
  const data = showDeletedData.value ? responseData.value?.deleteUsers as unknown[] : responseData.value?.users as unknown[]
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
    $formkit: 'text',
    outerClass: "col-3",
    name: 'userName',
    label: 'by_user_name',
    placeholder: 'enter user name',
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
        :value="showDeletedData ? responseData!.deleteUsers : responseData!.users" paginator layout="grid"
        dataKey="user_id" :rows="9">
        <template #grid="slotProps">
          <div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
            <app-card :deleteRestoreHandler="deleteRestoreHandler" :class="{ 'app-card-restore': showDeletedData }"
              :updateForm="updateForm" :recordId="slotProps.data.userId">
              <template #start>
              </template>
              <template #end>
                <div class="flex flex-column text-center py-3">
                  <h3 class="my-1">{{ slotProps.data.userName }}</h3>
                  <h3 class="my-1">{{ slotProps.data.userEmail }}</h3>
                  <h4 class="mt-4">{{ slotProps.data.userPhone }}</h4>
                </div>                
              </template>
            </app-card>
          </div>
        </template>
      </data-view>
    </template>
  </app-crud>
</template>