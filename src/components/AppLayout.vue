<script setup lang="ts">
import AppMenu from '../components/AppMenu.vue';
import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import { ref, onMounted, watch } from 'vue'
import type { Ref } from 'vue'
import Menu from 'primevue/menu';
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Avatar from 'primevue/avatar';
import Toolbar from 'primevue/toolbar';
import Breadcrumb from 'primevue/breadcrumb';

import type { MenuItem } from 'primevue/menuitem'
const isMenuOpened = ref(false)
const route = useRoute()
const home = ref({
    icon: 'pi pi-home',
    to: '/',
});
const i18n = useI18n()
const isRtl = ref(false)
const isSideBarVisible = ref(false)
const profileMenu = ref();



let breadCrumbs: Ref<MenuItem[]> = route.meta.breadCrumbs as Ref<MenuItem[]>
const profileItems = ref([
    { separator: true },
    { label: 'Profile', icon: 'pi pi-fw pi-user' },
    { label: 'Settings', icon: 'pi pi-fw pi-cog' },
    { separator: true }
]);
function toggleDesktopMenu() {
    isMenuOpened.value = !isMenuOpened.value
    localStorage.setItem('asideOpened', isMenuOpened.value.toString())
}
function toggleRtl() {
    isRtl.value = !isRtl.value;
    localStorage.setItem('isRtl', isRtl.value.toString())
    document.body.classList.toggle('rtl')
    i18n.locale.value = isRtl.value ? 'ar' : 'en'
}

function toggleProfileMenu(event: Event) {
    profileMenu.value.toggle(event)
}

watch(() => route.fullPath, () => {
    isSideBarVisible.value = false
})

onMounted(() => {
    if (localStorage.getItem('asideOpened') == 'true') {
        toggleDesktopMenu()
    }
    if (localStorage.getItem('isRtl') == 'true') {
        toggleRtl()
    }
})
</script>
<template>
    <div class="layout-wrapper" :class="{ 'layout-sidebar-active': isMenuOpened }">
        <aside class="desktop-menu">
            <div class="desktop-menu-header">
                <app-logo />
                <icon-btn :icon="isMenuOpened ? 'lock' : 'lock-open'" @click.prevent="toggleDesktopMenu" />
            </div>
            <app-menu />
        </aside>
        <Toolbar class="app-nav">
            <template #start>
                <icon-btn icon="bars" class="sidebar-toggler" @click.prevent="isSideBarVisible = !isSideBarVisible" />
                <app-logo />
                <Breadcrumb :home="home" v-if="route.meta.breadCrumbs" :model="breadCrumbs" />
            </template>

            <template #end>
                <icon-btn icon="globe" @click.prevent="toggleRtl" />
                <icon-btn icon="user" @click="toggleProfileMenu" />
                <Menu ref="profileMenu" id="overlay_menu" :model="profileItems" :popup="true">
                    <template #start>
                        <button
                            class="w-full p-link flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround">
                            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-2"
                                shape="circle" />
                            <div class="flex flex-column align">
                                <span class="font-bold">{{ $t('startsWith') }}</span>
                                <span class="text-sm">Agent</span>
                            </div>
                        </button>
                    </template>
                    <template #end>
                        <button
                            class="w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround">
                            <i class="pi pi-sign-out" />
                            <span class="ml-2">Log Out</span>
                        </button>
                    </template>
                </Menu>
            </template>
        </Toolbar>
        <div class="layout-main">
            <Breadcrumb :home="home" v-if="route.meta.breadCrumbs" :model="breadCrumbs" />
            <main class="page-content" :class="route.name">
                <RouterView />
            </main>
        </div>
        <Sidebar class="p-sidebar-sm" v-model:visible="isSideBarVisible" :position="isRtl ? 'right' : 'left'">
            <template #header>
                <app-logo />
            </template>
            <app-menu />
        </Sidebar>

    </div>
</template>
