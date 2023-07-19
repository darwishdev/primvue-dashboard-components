<script setup lang="ts">
import type { FormKitOptions, FormSubmitHandler } from 'formkit-builder/dist/types'
import type { LoginRequest, LoginResponse } from '@/api/ApiTypes';
import apiClient from '@/api/ApiMock';
import { errorHandler, redirectRoute, sections, toastHandler } from './LoginForm'
const options: FormKitOptions = {
    title: "",
    allowBulkDelete: false,
}
const submitHandler: FormSubmitHandler<LoginRequest, LoginRequest, LoginResponse> = {
    submit: apiClient.login,
    submitCallBack: (res: LoginResponse) => {
        localStorage.setItem('token', btoa(res.tokens.access_token))
        localStorage.setItem('permissions', btoa(JSON.stringify(res.userPermissions)))
        localStorage.setItem('sideBar', btoa(JSON.stringify(res.sideBar)))

    },
    errorHandler,
    redirectRoute,
}
</script>

<template>
    <data-create-form :sections="sections" :submitHandler="submitHandler" :toastHandler="toastHandler" :options="options" />
</template>