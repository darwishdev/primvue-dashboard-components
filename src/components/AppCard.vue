<script setup lang="ts">


const props = defineProps({
    // 'recordId' identify the id of the row we want to delete,restore or update so we can use it in all cases
    recordId: {
        type: Number,
        required: true,
    }
})
const emit = defineEmits<{
    (e: 'onDialogSubmitted', recordId: number): void
}>()
// const { openDialog } = useAppDialog(() => emit('onDialogSubmitted', props.recordId));

</script>
<template>
    <div class="app-card flex border-round bg-card my-3">
        <div class="start text-center">
            <slot name="start"></slot>
        </div>
        <div class="flex-grow-1 end flex align-items-center justify-content-center">
            <div class="absolute top-0 right-0 p-2">
                <icon-btn class="list-icon" icon="trash" />
                <!-- <router-link class="icon-btn list-icon">
                    <i class="pi pi-pencil text-white"></i>
                </router-link> -->
                <icon-btn class="restore-icon" icon="refresh" />
            </div>
            <slot name="end"> </slot>
        </div>
    </div>
</template>

