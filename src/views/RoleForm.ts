import i18n from "@/plugins/i18n"
import type { FormKitSection, FormKitToastHandler, FormKitError } from 'formkit-builder/types'
import apiClient from '@/api/ApiMock';


const { t } = i18n.global
export const errorHandler: Record<string, FormKitError> = {
    'unique_constraint_roles_role_name_key': {
        roleName: 'unique_constraint_roles_role_name_key'
    }
}
export const redirectRoute: string = 'roles_list'
export const sections: FormKitSection[] = [
    {
        roleInfo: [
            {
                $formkit: 'text',
                outerClass: "col-4",
                name: 'roleName',
                label: t('roleNameLabel'),
                placeholder: t('roleNamePlaceholder'),
                validation: 'required|length:3',

            },
            {
                $formkit: 'textarea',
                outerClass: "col-8",
                name: 'roleDescription',
                label: t('roleDescriptionLabel'),
                placeholder: t('roleDescriptionPlaceholder'),
                validation: '',
            },
            {
                $formkit: 'taglist',
                outerClass: "col-12",
                closeOnSelect: false,
                name: 'userRoles',
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
