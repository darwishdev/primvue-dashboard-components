<script  lang="ts">
import { parseFile } from '@/utils/helpers'
import { useRouter } from 'vue-router';
import FileUpload from 'primevue/fileupload'
import { inject, ref, defineComponent } from 'vue'
import { reset } from '@formkit/core'
import AccordionTab from 'primevue/accordiontab';
import Accordion from 'primevue/accordion';
import useCreateDialog from '@/composables/useCreateDialog';
import type { createDialogParms } from '@/composables/useCreateDialog';
import type { CrudOptions, CreateForm, FilterForm, DeleteRestoreHandler, ImportHandler } from '@/types'
import { getRouteVariation } from '@/utils/routeUtils';
export default defineComponent({
    props: {
        options: {
            type: Object as () => CrudOptions,
            required: true,
        },
        createForm: {
            type: Object as () => CreateForm,
            required: false,
        },
        filterForm: {
            type: Object as () => FilterForm,
            required: false,
        },
        deleteRestoreHandler: {
            type: Object as () => DeleteRestoreHandler<any>,
            required: false,
        },
        importHandler: {
            type: Object as () => ImportHandler<any, any>,
            required: false,
        },
    },
    components: {
        FileUpload,
        AccordionTab,
        Accordion,
    },
    setup(props, { emit }) {
        const uploading = ref(false)
        const router = useRouter()
        const useDialog = inject('useDialog') as Function
        const uploadedFiles = ref([]);
        const { push, currentRoute } = useRouter()

        let createDialog: any = undefined
        if (props.createForm) {
            const createDialogParms: createDialogParms = {
                onConfirmed: () => emit('onShowcreateDialog'),
                form: props.createForm,
                useDialog,
            }
            createDialog = useCreateDialog(createDialogParms);
        }

        const handleFilter = (filterObject: Object) => {
            console.log('filterObject', filterObject)
        }
        const handleClearFilters = () => {
            console.log('clear filtesr')
            reset('filter-form')
        }


        const create = () => {
            if (createDialog != undefined) {
                createDialog.openDialog()
            } else {
                const routeName = getRouteVariation(currentRoute.value.name as string, 'create');
                push({ name: routeName })
            }
        }
        const handleExport = () => {
            emit('export')
        }
        const handleDeletedFilter = (status: any) => {
            emit('showDeleted', status)
        }
        const handleImport = (event: any) => {
            // const file = event.files[0];
            // const reader = new FileReader();
            // uploading.value = true
            console.log(event)
            // reader.onload = () => {
            //     const result = reader.result;
            //     const extension = file.name.split('.').pop().toLowerCase();
            //     const data = parseFile(result, extension)
            //     emit('imported', data);
            //     console.log('data')
            //     console.log(data)
            //     if (props.importHandler) {
            //         console.log(data)
            //         reader.readAsBinaryString(file);
            //         props.importHandler.bulkCreate(data).then(res => {
            //             if (props.importHandler!.callBack) props.importHandler!.callBack(res)
            //             uploading.value = false
            //             uploadedFiles.value = []
            //         })
            //     }
            // };
        }
        const showFiltersForm = props.filterForm && props.filterForm.inputs.length > 0
        return {
            create,
            handleFilter,
            handleClearFilters,
            handleImport,
            handleExport,
            handleDeletedFilter,

            options: props.options,
            showFiltersForm,
            filterFormInputs: props.filterForm?.inputs,
            uploading
        }
    }

})

// const { push } = useRouter()
// const { routeName } = useRouteVariation('create');
// const uploadedFiles = ref([]);
// const showCreateForm = ref(false);
// const props = defineProps({
//     options: {
//         type: Object as () => CrudOptions,
//         required: true,
//     },
//     createForm: {
//         type: Object as () => CreateForm,
//         required: false,
//     },
//     filterForm: {
//         type: Object as () => FilterForm,
//         required: false,
//     },
//     deleteRestoreHandler: {
//         type: Object as () => DeleteRestoreHandler<any>,
//         required: false,
//     },
// });
// const emit = defineEmits(['showDeleted', 'export', 'imported'])
// const uploading = ref(false)

// const createNewRecord = () => {
//     if (!props.createForm) {
//         push({ name: routeName })
//         return
//     }
//     if (typeof props.createForm.submitHandler.submitCallBack == 'undefined') {
//         props.createForm.submitHandler.submitCallBack = () => {
//             showCreateForm.value = false
//         }
//     }
//     showCreateForm.value = true
// }

// const handleFilter = (filterObject: Object) => {
//     // console.log('filterObject')
//     // console.log(filterObject)
// }
// const handleClearFilters = () => {
//     console.log('clear filtesr')
//     reset('filter-form')
//     filterf.value = {}
//     // console.log(filter)
// }

// function parseExcel(result: any) {
//     const workbook = read(result, { type: 'binary' });
//     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//     const data = utils.sheet_to_json(worksheet, { header: 1 });

//     emit('imported', data);
// }
// const importFile = async (event: any) => {
//     console.log(event)
//     const file = event.files[0];
//     const reader = new FileReader();
//     let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

//     reader.readAsDataURL(blob);

//     reader.onloadend = function () {
//         const base64data = reader.result;
//     };
// };

// function handleFileUpload(event: any) {
//     const file = event.files[0];

//     const reader = new FileReader();
//     uploading.value = true
//     reader.onload = () => {
//         const result = reader.result;
//         const extension = file.name.split('.').pop().toLowerCase();

//         if (extension === 'csv') {
//             parseCSV(result);
//         } else if (extension === 'xlsx' || extension === 'xls') {
//             parseExcel(result);
//         }
//     };
//     uploading.value = false
//     uploadedFiles.value = []
//     reader.readAsBinaryString(file);
// }

// function parseCSV(result: any) {
//     const lines = result.split('\n');
//     const data = [];

//     for (let i = 1; i < lines.length; i++) {
//         const fields = lines[i].split(',');
//         // Process and store each field as needed
//         data.push(fields);
//     }

//     emit('imported', data);
// }

// const menu = ref(null);
// const toggle = (event: any) => {
//     const val = menu.value as any
//     val.toggle(event);
// };

// const filterf = ref()
</script>

<template>
    <div class="bg-card p-4 border-round">
        <div class="flex border-round justify-content-between align-items-center border-1 border-200 p-3 mb-3">
            <div class="mx-3" v-if="options.showCreateButton">
                <Button @click.prevent="create" label="New" severity="success" icon="pi pi-plus" />
                <slot name="header-left-buttons" />
            </div>
            <Accordion class="list-filters">
                <AccordionTab>
                    <template #header>
                        <i class="pi pi-filter mr-3"></i>
                        <span>{{ $t('show_filters') }}</span>
                    </template>
                    <data-filter-form v-if="showFiltersForm" @filter="handleFilter" @clearFilters="handleClearFilters"
                        :inputs="filterFormInputs" :liveUpdate="false" />
                </AccordionTab>
            </Accordion>
            <div class="flex justify-content-end align-items-center p-2">
                <div class="list-wrapper-upload ">
                    <h2 v-if="uploading">uploading...</h2>
                    <FileUpload :chooseLabel="$t('import')" class="btn-upload" custom-upload v-model="uploadedFiles"
                        accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                        @uploader="handleImport">
                    </FileUpload>
                </div>

                <Button v-if="options.showExportButton" @click="handleExport" :label="$t('export')" severity="help"
                    icon="pi pi-upload" />
                <slot name="header-right-buttons" />
            </div>
        </div>
        <div class="flex justify-content-between align-items-center border-y-1 border-200 py-3">
            <h2 v-if="!$slots['header-title']">{{ options.title }}</h2>
            <slot name="header-title" />

            <div class="flex justify-content-end align-items-center p-2">
                <form-kit v-if="!$slots['header-filters'] && options.showDeletedFilter" :classes="{ outer: 'm-0', }"
                    @input="handleDeletedFilter" type="toggle" name="toggle" :label="$t('show_deleted')" />
                <slot name="header-filters" />
            </div>
        </div>
        <!-- <div class="w-10 m-auto h-1rem" style="background-color: rgba(255, 255, 255, 0.15);"></div> -->
        <slot name="data" />

    </div>
</template>