<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">{{ $t('hello') }}</h1>
    <p class="mb-4">{{ $t('language') }}: {{ $i18n.locale }}</p>
    <div class="flex space-x-2 mb-4">
      <button @click="changeLanguage('en')" class="px-3 py-1 bg-blue-500 text-white rounded">EN 1</button>
      <button @click="changeLanguage('zh')" class="px-3 py-1 bg-green-500 text-white rounded">ZH 2</button>
    </div>
    <div class="mt-4">
      <input v-model="message" placeholder="Enter a message" class="border p-2 mr-2" />
      <button @click="sendMessage" class="px-3 py-1 bg-purple-500 text-white rounded">Send to Extension</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
// @ts-ignore
import { WebviewMessenger } from '@vue-webview/libs'

const { locale } = useI18n()
const message = ref('')

// Initialize messenger
const messenger = new WebviewMessenger()

const changeLanguage = (lang: string) => {
  locale.value = lang
}

const sendMessage = () => {
  if (message.value.trim()) {
    messenger.postMessage({
      command: 'info',
      data: message.value
    })
    message.value = ''
  }
}
</script>