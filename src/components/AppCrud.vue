<script  lang="ts">
import { parseFile } from '@/utils/helpers'
import Menu from 'primevue/menu';
import { useRouter } from 'vue-router';
import FileUpload from 'primevue/fileupload'
import { inject, ref, defineComponent } from 'vue'
import type { Ref } from 'vue'
import { saveAs } from 'file-saver';

import { reset } from '@formkit/core'
import AccordionTab from 'primevue/accordiontab';
import Accordion from 'primevue/accordion';
import useCreateDialog from '@/composables/useCreateDialog';
import type { createDialogParms } from '@/composables/useCreateDialog';
import type { CrudOptions, CreateForm, FilterForm, DeleteRestoreHandler, ImportHandler } from '@/types'
import { getRouteVariation } from '@/utils/routeUtils';
import { optionsSymbol } from '@formkit/vue';
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
        Menu,

        Accordion,
    },
    setup(props, { emit }) {
        const useDialog = inject('useDialog') as Function
        const isProgressBarVisibile = inject('isProgressBarVisibile') as Ref<boolean>

        const { push, currentRoute } = useRouter()
        const showFiltersForm = props.filterForm && props.filterForm.inputs.length > 0
        const imprtExportMenu = ref();

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
            emit('filtered', filterObject)
        }
        const handleClearFilters = () => {
            console.log('clear filtesr')
            reset('filter-form')
            emit('filtersCleared')

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
        const handleImport = async (files: any, node: any) => {
            if (files.length == 0) return
            const fileInstace = files[0].file
            const extension = fileInstace.name.split('.').pop().toLowerCase();
            const fileContent = await fileInstace.arrayBuffer();
            const data = parseFile(fileContent, extension)
            emit('imported', data);
            if (!props.importHandler) {
                return
            }
            isProgressBarVisibile.value = true
            props.importHandler.bulkCreate(data).then(res => {
                if (props.importHandler!.callBack) props.importHandler!.callBack(res)
                node.reset()
                isProgressBarVisibile.value = false
            })
        }

        const imprtExportOptions = []

        if (typeof props.options.importTemplateLink != 'undefined') {
            imprtExportOptions.push(
                {
                    label: 'Download template',
                    icon: 'pi pi-download',
                    command: () => {
                        const fileName = props.options.importTemplateLink as string
                        saveAs(fileName);
                    }
                })
        }
        if (props.options.showExportButton) {
            imprtExportOptions.push(
                {
                    label: 'export',
                    icon: 'pi pi-upload',
                    command: handleExport
                })
        }
        const imprtExportMenuToggle = (event: any) => {
            imprtExportMenu.value.toggle(event);
        };
        return {
            create,
            handleFilter,
            handleClearFilters,
            handleImport,
            handleExport,
            handleDeletedFilter,
            imprtExportMenuToggle,
            isProgressBarVisibile,
            options: props.options,
            imprtExportMenu,
            imprtExportOptions,
            showFiltersForm,
            // showImportButton: typeof props.importHandler != 'undefined',
            filterFormInputs: props.filterForm?.inputs,
        }
    }

})

</script>

<template>
    <div class="bg-card p-4 border-round " :class="{ 'disabled': isProgressBarVisibile }">
        <div class="flex border-round justify-content-between align-items-center border-1 border-200 p-3 mb-3">
            <div class="mx-3" v-if="options.showCreateButton">
                <Button @click.prevent="create" label="New" severity="success" icon="pi pi-plus" />
                <slot name="header-left-buttons" />
            </div>
            <slot name="filters" />
            <Accordion v-if="!$slots['filters'] && showFiltersForm" class="list-filters">
                <AccordionTab>
                    <template #header>
                        <i class="pi pi-filter mr-3"></i>
                        <span>{{ $t('show_filters') }}</span>
                    </template>
                    <data-filter-form @filter="handleFilter" @clearFilters="handleClearFilters" :inputs="filterFormInputs"
                        :liveUpdate="false" />
                </AccordionTab>
            </Accordion>
            <div class="flex justify-content-end align-items-center p-2">
                <div class="options" v-if="options.importTemplateLink">
                    <Button type="button" icon="pi pi-save" :label="$t('options')" @click="imprtExportMenuToggle"
                        aria-haspopup="true" aria-controls="overlay_menu" />
                    <Menu ref="imprtExportMenu" id="import_export_menu" :model="imprtExportOptions" :popup="true">
                        <template #end>
                            <div class="px-3">
                                <FormKit type="file" :label="$t('import')" placeholder="import" name="license"
                                    accept=".csv,.xls,.xlsx" @input="handleImport" />
                            </div>
                        </template>
                    </Menu>
                </div>
                <div class="export" v-else-if="options.showExportButton">
                    <Button type="button" icon="pi pi-upload" :label="$t('export')" @click="handleExport"
                        aria-haspopup="true" aria-controls="overlay_menu" />
                </div>
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