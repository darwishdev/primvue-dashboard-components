
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Toast from 'primevue/toast';
import DynamicDialog from 'primevue/dynamicdialog';
const loading = ref(true)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 2000);
})
</script>
<template>
  <div class="loading" v-if="loading"><img src="@/assets/loading.webp" /></div>
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
