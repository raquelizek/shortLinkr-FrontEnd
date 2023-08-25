<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Edite seu link
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        @submit="handleStore"
        :initial-values="initialData"
        class="space-y-6"
        action="#"
        method="POST"
      >
        <div>
          <div class="flex items-center justify-start">
            <label
              for=""
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Link</label
            >
          </div>
          <div class="mt-2">
            <input
              id="link"
              name="link"
              type="text"
              v-model="link"
              autocomplete=""
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <span>{{ errors.link }}</span>
          </div>
        </div>

        <div class="flex justify-center items-center flex-col gap-4">
          <button
            type="submit"
            class="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="handleUpdate"
          >
            <i class="fa-solid fa-pen -ml-0.5 mr-1.5 h-3 w-4"></i>
            Alterar URL
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
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { api } from '@/lib/api'

import { useForm } from 'vee-validate'
import { onMounted, reactive } from 'vue'

const router = useRouter()

const initialData = reactive({
  link: ''
})

const { handleSubmit, errors, useFieldModel } = useForm({
  initialValues: {
    link: initialData.link
  }
})

const link = useFieldModel('link')

const updateInitialData = async () => {
  try {
    const response = await api.get(
      `/link/${router.currentRoute.value.params.id}`
    )
    initialData.link = response.data.link
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => updateInitialData())

const handleUpdate = handleSubmit(async values => {
  await api.patch(`/link/update/${router.currentRoute.value.params.id}`, {
    link: values.link
  })

  router.push('/')
})

const redirectToDash = () => {
  router.push('/')
}
</script>

<style></style>
