<script  lang="ts">
import useDeleteRestoreDialog from '@/composables/useDeleteRestoreDialog';
import type { deleteRestoreDialogParms } from '@/composables/useDeleteRestoreDialog';
import useUpdateDialog from '@/composables/useUpdateDialog';
import type { updateDialogParms } from '@/composables/useUpdateDialog';
import type { UpdateForm, DeleteRestoreHandler } from '@/types'
import { inject } from 'vue'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { getRouteVariation } from '@/utils/routeUtils';

export default defineComponent({
    props: {
        recordId: {
            type: Number,
            required: true,
        },
        updateForm: {
            type: Object as PropType<UpdateForm>,
            required: false,
        },
        deleteRestoreHandler: {
            type: Object as PropType<DeleteRestoreHandler<any>>,
            required: false,
        },
    },
    setup(props, { emit }) {
        const { push, currentRoute } = useRouter()
        const useDialog = inject('useDialog') as Function
        let deleteRestoreDialog = undefined as any
        let updateDialog = undefined as any
        if (props.deleteRestoreHandler) {
            const deleteRestoreDialogParm: deleteRestoreDialogParms = {
                onConfirmed: () => emit('onDeleted', props.recordId),
                deleteRestoreHandler: props.deleteRestoreHandler,
                useDialog,
                recordId: props.recordId,

            }
            deleteRestoreDialog = useDeleteRestoreDialog(deleteRestoreDialogParm);
        }
        if (props.updateForm) {
            const updateDialogParms: updateDialogParms = {
                onConfirmed: () => emit('onShowUpdateDialog', props.recordId),
                form: props.updateForm,
                useDialog,

            }
            updateDialog = useUpdateDialog(updateDialogParms);
        }
        const update = () => {
            if (updateDialog != undefined) {
                updateDialog.openDialog()
            } else {
                const routeName = getRouteVariation(currentRoute.value.name as string, 'update');
                push({ name: routeName, params: { id: props.recordId } })
            }
        }
        const deleteRestore = () => {
            if (deleteRestoreDialog != undefined) {
                deleteRestoreDialog.openDialog()
            }
        }
        return {
            deleteRestore,
            update
        }
    }
})


</script>
<template>
    <div class="app-card flex border-round bg-card my-3">
        <!-- <ContentComponent /> -->
        <div class="start text-center">
            <slot name="start"></slot>
        </div>
        <div class="flex-grow-1 end flex align-items-center justify-content-center">
            <div class="absolute top-0 right-0 p-2">
                <icon-btn class="list-icon" icon="trash" @click="deleteRestore" />
                <a class="icon-btn list-icon" @click.prevent="update">
                    <i class="pi pi-pencil text-white"></i>
                </a>
                <icon-btn class="restore-icon" icon="refresh" @click="deleteRestore" />
            </div>
            <slot name="end"> </slot>
        </div>

    </div>
</template>

