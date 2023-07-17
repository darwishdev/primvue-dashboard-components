import type {
    FormFindDataHandler, FormKitSection, FormKitOptions, FormSubmitHandler, FormKitToastHandler, FormKitInput, FormKitComponent
} from "formkit-builder/types"

export type CrudOptions = {
    title: string
    feature: string
    importTemplateLink?: string
    showExportButton: boolean
    showCreateButton: boolean
    showDeletedFilter: boolean
}


export type CreateForm = {
    sections: FormKitSection[]
    options: FormKitOptions,
    submitHandler: FormSubmitHandler<any, any, any>
    toastHandler?: FormKitToastHandler
}

export type FilterForm = {
    inputs: FormKitInput[] | FormKitComponent[]
    callBack?: () => any;
}
export type UpdateForm = {
    sections: FormKitSection[]
    options: FormKitOptions
    findHandler: FormFindDataHandler
    submitHandler: FormSubmitHandler<any, any, any>
    toastHandler?: FormKitToastHandler
}

export interface DeleteRestoreHandler<Req> {
    deleteRestore: (req: Req) => void
    callBack?: () => any;
    indentifierPropertyName?: string;
    errorHandler?: Record<string, string>
    toastHandler?: FormKitToastHandler
}

export interface ImportHandler<Req, Resp> {
    bulkCreate: (req: Req) => Promise<Resp>
    callBack?: (resp: Resp) => any;
    errorHandler?: Record<string, string>
    toastHandler?: FormKitToastHandler
}