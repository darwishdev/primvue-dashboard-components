<script setup lang="ts">
import apiClient from '@/api/ApiMock';
import type { UsersListRequest, UsersListResponse } from '@/api/ApiTypes'
import { useDataFetcherList } from 'vue-data-fetcher'

import type {
  RoleDeleteRestoreRequest, UserCreateRequest, UserCreateResponse, UserUpdateRequest, UserUpdateResponse, UserFindRequest, UserFindResponse
} from '@/api/ApiTypes';
import type { CrudOptions , CreateForm , FilterForm ,UpdateForm, ImportHandler} from '@/types';
import type { FormKitOptions, FormSubmitHandler, FormKitInput, FormKitComponent,FormFindDataHandler } from 'formkit-builder/types'
import { errorHandler, sections, toastHandler } from './UserForm'

const { responseData, loading, error, fetchData } = useDataFetcherList<UsersListRequest, UsersListResponse>(apiClient.usersList, {} as UsersListRequest);

const createOptions: FormKitOptions = {
  title: "user_create",
  allowBulkDelete: false,
}
const createFormSubmitHandler: FormSubmitHandler<UserCreateRequest, UserCreateRequest, UserCreateResponse> = {
  submit: apiClient.userCreate,
  errorHandler,
}
const createForm: CreateForm = {
  sections: sections,
  options: createOptions,
  submitHandler: createFormSubmitHandler,
  toastHandler: toastHandler,
}

const options: CrudOptions = {
  title: "Users List",
  showCreateButton: true,
  feature: 'users',
  showExportButton: true,
  showDeletedFilter: true,
}

const imported = (data: any) => {
  console.log('importd')
  fetchData()
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

const filterForm: FilterForm = {
  inputs,
}


const updateFormSubmitHandler: FormSubmitHandler<UserUpdateRequest, UserUpdateRequest, UserUpdateResponse> = {
  submit: apiClient.userUpdate,
  errorHandler,
}
const updateFormFindHandler: FormFindDataHandler<UserFindRequest, UserFindResponse, any> = {
  findData: apiClient.userFind,
  findRequerPropertyName: 'userId',
}
const updateForm: UpdateForm = {
  sections: sections,
  options: createOptions,
  submitHandler: updateFormSubmitHandler,
  findHandler: updateFormFindHandler,
  toastHandler: toastHandler,
}
</script>
<template>
    <app-crud :options="options" :filterForm="filterForm" :createForm="createForm" class="roles"> 
        <template #data>
            <div v-if="loading">
                <h1>loading</h1>
            </div>
            <div v-else>
                <app-card :class="{ 'app-card-restore': false }"
                :updateForm="updateForm" :recordId="1" >
                <template #start>
                </template>
                <template #end>
                    <div class="flex flex-column text-center py-3">
                        <h1 class="my-1">{{ responseData!.users[0].userName }}</h1>
                            <h3 class="my-1">{{ responseData!.users[0].userEmail }}</h3>
                            <h4 class="mt-4">{{ responseData!.users[0].userPhone }}</h4>
                        </div>
                    </template>
                </app-card>  
            </div>
        </template>
    </app-crud>
</template>