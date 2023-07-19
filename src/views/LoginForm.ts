import i18n from "@/plugins/i18n"
import type { FormKitSection, FormKitToastHandler, FormKitError } from 'formkit-builder/dist/types'


const { t } = i18n.global
export const errorHandler: Record<string, FormKitError> = {
    'unique_constraint_roles_role_name_key': {
        roleName: 'unique_constraint_roles_role_name_key'
    }
}
export const redirectRoute: string = 'dashboard_view'
export const sections: FormKitSection[] = [
    {

        login: [
            {
                $formkit: 'text',
                outerClass: "col-12",
                name: 'userName',
                label: t('userNameLabel'),
                placeholder: t('userNamePlaceholder'),
                validation: 'required|length:3',

            },
            {
                $formkit: 'password',
                outerClass: "col-12",
                name: 'password',
                label: t('passwordLabel'),
                placeholder: t('passwordPlaceholder'),
                validation: 'required|length:6',

            },
        ],

    },
]

export const toastHandler: FormKitToastHandler = {
    hideToast: false
}
