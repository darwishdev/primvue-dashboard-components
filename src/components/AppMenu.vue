<script setup lang="ts">
import { ref } from "vue";
import PanelMenu from 'primevue/panelmenu';
const { items } = JSON.parse(atob(localStorage.getItem('sideBar') as string))
</script>

<template>
    <div class="app-menu">
        <PanelMenu :model="items" />
        <!-- {{ menuItems }} -->
        <!-- {{ atob(menuItems) }} -->
    </div>
</template>
