
<script setup lang="ts">
import { provide, ref, onMounted } from 'vue';
import Toast from 'primevue/toast';
import DynamicDialog from 'primevue/dynamicdialog';
import ProgressBar from 'primevue/progressbar';

const isLoading = ref(true)
const isProgressBarVisibile = ref(false)
provide('isProgressBarVisibile', isProgressBarVisibile)
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 2000);
})
</script>
<template>
  <ProgressBar v-if="isProgressBarVisibile" mode="indeterminate" class="progress"></ProgressBar>
  <div class="loading" v-if="isLoading"><img src="@/assets/loading.webp" /></div>
  <RouterView :key="$route.fullPath" />
  <dynamic-dialog />
  <toast>
    <template #message="slotProps">
      <div class="flex toast-inner flex-column align-items-center" style="flex: 1">
        <div class="text-center">
          <h1 class="font-bold text-4xl ">{{ slotProps.message.summary }}</h1>
          <p class="my-1">{{ slotProps.message.detail }}</p>
        </div>

      </div>
    </template>
  </toast>
</template>
