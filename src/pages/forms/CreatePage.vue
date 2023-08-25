<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Register seu link
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleStore">
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
              type="url"
              v-model="link"
              autocomplete="link"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <span>{{ errors.link }}</span>
          </div>
        </div>

        <div class="">
          <div class="flex items-center justify-start">
            <label
              for=""
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Identificador (opcional)</label
            >
          </div>
          <div class="mt-2">
            <input
              id="identifier"
              name="identifier"
              type="text"
              v-model="identifier"
              autocomplete=""
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <span>{{ errors.identifier }}</span>
          </div>
        </div>

        <div class="flex justify-center items-center flex-col gap-4">
          <button
            type="submit"
            class="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <i class="fa-solid fa-check -ml-0.5 mr-1.5 h-3 w-4"></i>
            Registar link
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

import { toFormValidator } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z as zod } from 'zod'

const validationSchema = toFormValidator(
  zod.object({
    link: zod
      .string({
        required_error: 'Campo obrigatório'
      })
      .url('URL inválida')
  })
)

const { handleSubmit, errors, useFieldModel } = useForm({
  validationSchema,
  initialValues: {
    link: '',
    identifier: '',
    encurted_link: ''
  }
})

const link = useFieldModel('link')
const identifier = useFieldModel('identifier')

const handleStore = handleSubmit(async values => {
  try {
    const response = await api.post('/link/store', {
      link: values.link,
      identifier: values.identifier,
      encurted_link: values.encurted_link
    })

    console.log(response, 'Link criado com sucesso')

    router.push('/')
  } catch (error) {
    console.error('Error:', error.response.data.message)
  }
})

const router = useRouter()

const redirectToDash = () => {
  router.push('/')
}
</script>

<style></style>
