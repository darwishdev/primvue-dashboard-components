<script setup lang="ts">
import { ref } from "vue";
import PanelMenu from 'primevue/panelmenu';
const menuItems = ref([
    { key: '0', label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', to: { name: 'dashboard' } },
    {
        key: '0',
        label: 'users',
        icon: 'pi pi-fw pi-user',
        items: [
            {
                key: '0_0',
                label: 'Roles List',
                icon: 'pi pi-fw pi-list',
                to: { name: 'roles_list' }
            },
            {
                key: '0_0',
                label: 'Users List',
                icon: 'pi pi-fw pi-list',
                to: { name: 'users_list' }
            }
        ]
    },
]);


</script>

<template>
    <div class="app-menu">
        <PanelMenu :model="menuItems" />
    </div>
</template>
