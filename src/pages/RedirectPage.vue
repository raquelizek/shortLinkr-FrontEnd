<template>
  <div
    class="flex w-full h-full flex-1 flex-col justify-center px-6 py-[10em] lg:px-8"
  >
    <h4
      class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
    >
      Deseja prosseguir?
    </h4>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="flex justify-center items-center flex-col gap-4">
        <button
          type="submit"
          @click="handleClicks"
          class="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <i class="fa-solid fa-chevron-right -ml-0.5 mr-1.5 h-3 w-4"></i>
          Prosseguir
        </button>
        <button
          type="submit"
          class="flex w-full justify-center items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          @click="redirectToDash"
        >
          <i class="fa-solid fa-chevron-left -ml-0.5 mr-1.5 h-3 w-4"></i>
          Voltar para início
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { api } from '@/lib/api'
import { ref, onMounted } from 'vue'

const router = useRouter()

const userAgent = window.navigator.userAgent

const id = ref('')
const link = ref('')

onMounted(async () => {
  try {
    const responseFromIpify = await api.get('https://api.ipify.org?format=json')

    const linkResponse = await api.get(
      `/link/get/${router.currentRoute.value.params.identifier}`
    )

    await handleData(responseFromIpify.data.ip, userAgent)

    link.value = linkResponse.data.link
  } catch (error) {
    console.error('Error:', error.response.data.message)
  }
})

async function handleData(userIp, userAgent) {
  try {
    const response = await api.post('/access/store', {
      ip: userIp,
      user_agent: userAgent
    })
    id.value = response.data.data.id
  } catch (error) {
    console.error('Error:', error.response.data.message)
  }
}

const handleClicks = async () => {
  try {
    const response = await api.patch(`/access/update/${id.value}`, {
      user_clicked: true
    })

    if (response?.data) {
      window.location.replace(link.value)
    }
  } catch (error) {
    console.error('Error:', error.response.data.message)
  }
}

const redirectToDash = () => {
  router.push('/')
}
</script>
