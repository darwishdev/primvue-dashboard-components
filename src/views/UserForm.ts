import i18n from "@/plugins/i18n"
import type { FormKitSection, FormKitToastHandler, FormKitError } from 'formkit-builder/types'
import apiClient from '@/api/ApiMock';


const { t } = i18n.global
export const errorHandler: Record<string, FormKitError> = {
    'unique_constraint_users_user_name_key': {
        userName: t('unique_constraint_users_user_name_key')
    },
    'unique_constraint_users_user_phone_key': {
        userPhone: t('unique_constraint_users_user_phone_key')
    },
    'unique_constraint_users_user_email_key': {
        userEmail: t('unique_constraint_users_user_email_key')
    },
    'phone_invalid': {
        userPhone: t('phone_invalid')
    }
}

export const redirectRoute: string = 'users_list'
export const sections: FormKitSection[] = [
    {
        'User Details': [
            {
                $formkit: 'text',
                outerClass: "col-6",
                name: 'userName',
                label: 'Name',
                placeholder: 'Name',
                validation: 'required|length:3',
            },
            {
                $formkit: 'text',
                outerClass: "col-6",
                name: 'userPhone',
                label: 'Phone',
                placeholder: 'Phone',
                validation: 'required',
            },
            {
                $formkit: 'email',
                outerClass: "col-12",
                name: 'userEmail',
                label: 'Email',
                placeholder: 'Email',
                validation: 'required|email',
            },
        ],
    },
    {
        passwords: [
            {
                $formkit: 'password',
                outerClass: "col-6",
                name: 'userPassword',
                label: 'Password',
                placeholder: 'Password',
                validation: 'required|length:8|alphanumeric',
            },
            {
                $formkit: 'password',
                outerClass: "col-6",
                name: 'userPassword_confirm',
                label: 'Confirm Password',
                placeholder: 'Re-enter password',
                validation: 'required|confirm',
                // "validation-label": "Password confirmation"
            },
        ],
    },
    {
        security: [
            {
                $formkit: 'taglist',
                outerClass: "col-12",
                closeOnSelect: false,
                name: 'roles',
                label: 'roles',
                placeholder: 'roles',
                options: apiClient.getRolesInput
                // validation: 'required',
            }
        ],
    },
]


export const toastHandler: FormKitToastHandler = {
    hideToast: false
}
