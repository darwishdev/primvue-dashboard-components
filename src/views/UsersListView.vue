<script setup lang="ts">
import apiClient from '@/api/ApiMock';
import type { UsersListRequest, UsersListResponse } from '@/api/ApiTypes'
import DataView from 'primevue/dataview';
import { useDataFetcherList } from 'vue-data-fetcher'
import { ref,onMounted } from 'vue'
import type { FormFindDataHandler, FormKitOptions, FormSubmitHandler, FormKitInput, FormKitComponent } from 'formkit-builder/types'
import type {
  RoleDeleteRestoreRequest, UserCreateRequest, UserCreateResponse, UserUpdateRequest, UserUpdateResponse, UserFindRequest, UserFindResponse
} from '@/api/ApiTypes';
import LogoError from '@/assets/logo-error.svg'
import type { CreateForm, UpdateForm, CrudOptions, FilterForm, ImportHandler } from '@/types';
import { exportCSV } from "@/utils/helpers"
import { errorHandler, sections, toastHandler } from './UserForm'
import type { DeleteRestoreHandler } from '@/types'
const dataview = ref()

const createOptions: FormKitOptions = {
  title: "user_create",
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

// const deleteRestoreHandler: DeleteRestoreHandler<RoleDeleteRestoreRequest> = {
//   deleteRestore: apiClient.roleDeleteRestore,
//   indentifierPropertyName: 'roleId',
// }

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
  showExportButton: true,
  importTemplateLink: "https://static.exploremelon.com/mln_rms/import-templates/Roles.xlsx",
  showDeletedFilter: true,
}
const showDeletedData = ref(false)
const { responseData, loading, error, fetchData } = useDataFetcherList<UsersListRequest, UsersListResponse>(apiClient.usersList, {} as UsersListRequest);
let tempResponseData : UsersListResponse | null  = { users: [] , deleteUsers : []}

onMounted(() => {
  setTimeout(() => {
    tempResponseData = responseData.value
  }, 1000);
})

// function onDialogSubmitted(recordId: number) {
//   const request: any = {
//     roleId: recordId,

//   }
// }

const showDeletedHandler = (val: any) => {
  showDeletedData.value = val
}
const imported = (data: any) => {
  console.log('importd')
}
const exportCSVv = () => {
  const data = showDeletedData.value ? responseData.value?.deleteUsers as unknown[] : responseData.value?.users as unknown[]
  exportCSV(data)
}


const inputs: Array<FormKitInput | FormKitComponent> = [
  {
    $formkit: 'text',
    outerClass: "col-3",
    name: 'userEmail',
    label: 'by_email_address',
    placeholder: 'Enter email address',
  },
  {
    $formkit: 'text',
    outerClass: "col-3",
    name: 'userName',
    label: 'by_username',
    placeholder: 'enter username',
  },

  {
    $formkit: 'text',
    outerClass: "col-3",
    name: 'UserPhone',
    label: 'phone_number',
    placeholder: 'Type phone number',
  },
]

const filtered = (filterObject: any) => {
  console.log(filterObject);
  let key = filterObject.key
  let value = filterObject.value
  let filtered = responseData.value?.users.filter((user : any) => user[key] == value);
  responseData.value.users = filtered
  console.log(responseData.value);
}

const filtersCleared = () => {
  apiClient.usersList().then((result) => {
      responseData.value = result
  })
}

const filterForm: FilterForm = {
  inputs,
}

// const importHandler: ImportHandler<RoleBulkCreateRequest, RoleBulkCreateResponse> = {
//   bulkCreate: apiClient.roleBulkCreate,
// }
</script>

<template>
  <app-crud @imported="imported" @export="exportCSVv" :filterForm="filterForm"
    :createForm="createForm" :options="options" @filtered="filtered" @showDeleted="showDeletedHandler" @filtersCleared="filtersCleared" class="roles">
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
        dataKey="role_id" :rows="9">
        <template #grid="slotProps">
          <div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
            <app-card :class="{ 'app-card-restore': showDeletedData }"
              :updateForm="updateForm" :recordId="slotProps.data.roleId" >
              <template #start>
              </template>
              <template #end>
                  <div class="flex flex-column text-center py-3">
                    <h1 class="my-1">{{ slotProps.data.userName }}</h1>
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