// import { useDialog } from 'primevue/usedialog';
import { inject } from 'vue';
import { markRaw } from 'vue';
import type { UpdateForm } from '@/types'
import { h, resolveComponent, defineComponent } from 'vue'
// import AppDialogContent from '@/components/AppDialogContent.vue';
// import AppDialogFooter from '@/components/AppDialogFooter.vue';

export interface updateDialogParms {
    onConfirmed?: Function,
    useDialog: Function,
    form: UpdateForm,
    config?: {
        width?: string
        breakpoints?: Record<string, string>
    }
}
export default function useUpdateDialog(params: updateDialogParms) {
    const dialog = params.useDialog();
    const defaultWidth = "65vw"
    const defaultBreakPoint = {
        '960px': '75vw',
        '640px': '90vw',
    }
    const UpdateFormComp = defineComponent({
        setup() {
            const comp = resolveComponent('data-Update-form')
            return () => h(comp, {
                sections: params.form!.sections,
                toastHandler: params.form!.toastHandler,
                submitHandler: params.form!.submitHandler,
                findDataHandler: params.form!.findHandler,
                options: params.form!.options

            })
        }
    })
    function openDialog() {
        const width = params.config && params.config.width ? params.config.width : defaultWidth
        const breakpoints = params.config && params.config.breakpoints ? params.config.breakpoints : defaultBreakPoint
        dialog.open(UpdateFormComp, {
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
