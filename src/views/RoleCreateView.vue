<script setup lang="ts">
import type { FormKitOptions, FormSubmitHandler } from 'formkit-builder/dist/types'
import type { RoleCreateRequest, RoleCreateResponse } from '@/api/ApiTypes';
import apiClient from '@/api/ApiMock';
import { errorHandler, redirectRoute, sections, toastHandler } from './RoleForm'
const options: FormKitOptions = {
  title: "role_create",
  allowBulkDelete: false,
}
const submitHandler: FormSubmitHandler<RoleCreateRequest, RoleCreateRequest, RoleCreateResponse> = {
  submit: apiClient.roleCreate,
  errorHandler,
  redirectRoute,
}
</script>

<template>
  <data-create-form :sections="sections" :submitHandler="submitHandler" :toastHandler="toastHandler" :options="options" />
</template>