
import type { CreateForm } from '@/types'
import { h, resolveComponent, defineComponent } from 'vue'

export interface createDialogParms {
    onConfirmed?: Function,
    form: CreateForm,
    useDialog: Function,
    config?: {
        width?: string
        breakpoints?: Record<string, string>
    }
}
export default function useCreateDialog(params: createDialogParms) {
    const dialog = params.useDialog();
    const defaultWidth = "65vw"
    const defaultBreakPoint = {
        '960px': '75vw',
        '640px': '90vw',
    }
    const createFormComp = defineComponent({
        setup() {
            const comp = resolveComponent('data-create-form')
            return () => h(comp, {
                sections: params.form!.sections,
                toastHandler: params.form!.toastHandler,
                submitHandler: params.form!.submitHandler,
                options: params.form!.options

            })
        }
    })
    function openDialog() {
        const width = params.config && params.config.width ? params.config.width : defaultWidth
        const breakpoints = params.config && params.config.breakpoints ? params.config.breakpoints : defaultBreakPoint
        dialog.open(createFormComp, {
            props: {
                style: {
                    width
                },
                breakpoints,
                modal: true,
            },
            onClose: (options: any) => {
                const data = options!.data;
                if (data) {
                    if (data.confirmed && params.onConfirmed) params.onConfirmed();
                }
            }
        });

    }

    return {
        openDialog,
    };
}
