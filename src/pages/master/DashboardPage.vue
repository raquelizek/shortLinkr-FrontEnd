<template>
  <div class="min-h-full">
    <header class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div class="bg-white py-24 sm:py-4">
          <div
            class="mx-auto max-w-7xl px-6 lg:px-8 flex items-center flex-col"
          >
            <div class="mx-auto max-w-2xl lg:mx-0 flex justify-start mb-8">
              <p
                class="text-1xl font-bold tracking-tight text-indigo-600 sm:text-2xl"
              >
                <i class="fa-solid fa-chart-line"></i>
                Estatísticas de acessos
              </p>
            </div>
            <dl
              class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3"
            >
              <div class="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt class="text-1xl text-gray-600 mt-[-6px]">Total links</dt>
                <dd
                  class="order-first text-2xl font-semibold tracking-tight text-gray-900 sm:text-1xl"
                >
                  {{ access.countLinks ?? 0 }}
                </dd>
              </div>
              <div class="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt class="text-1xl text-gray-600 mt-[-6px]">Total acessos</dt>
                <dd
                  class="order-first text-2xl font-semibold tracking-tight text-gray-900 sm:text-1xl"
                >
                  {{ access.countAccess ?? 0 }}
                </dd>
              </div>
              <div class="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt class="text-1xl text-gray-600 mt-[-6px]">Total clicks</dt>
                <dd
                  class="order-first text-2xl font-semibold tracking-tight text-gray-900 sm:text-1xl"
                >
                  {{ access.countClicks ?? 0 }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </header>
    <hr class="mx-auto max-w-5xl border-gray-300 shadow" />
    <main>
      <div class="flex flex-col mx-auto max-w-5xl py-6 sm:px-6 lg:px-8">
        <div class="mt-5 mb-5 flex lg:mt-0">
          <span class="hidden sm:block">
            <button
              type="button"
              class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              @click="redirectToCreate"
            >
              <i class="fa-solid fa-plus -ml-0.5 mr-1.5 h-4 w-4"></i>
              Criar Link
            </button>
          </span>
        </div>
        <div class="flex items-center justify-between">
          <div class="mt-2 relative">
            <i
              class="fa-solid fa-magnifying-glass absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
            ></i>
            <input
              id=""
              name=""
              type=""
              autocomplete=""
              required=""
              placeholder="Pesquisar..."
              class="pl-10 block w-[40em] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <span class="hidden sm:block">
              <button
                type="button"
                class="inline-flex items-center rounded-md bg-indigo-600 px-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <i class="fa-solid fa-arrow-down-short-wide mr-1.5 h-4 w-4"></i>
                Filtrar
              </button>
            </span>
          </div>
        </div>
        <ul
          class="mt-5 divide-y divide-gray-100 border border-solid border-gray-200 rounded p-4 shadow-md max-h-[600px] overflow-y-auto"
        >
          <li
            v-for="item in data"
            :key="item.link"
            class="flex py-5 justify-between"
          >
            <div class="flex min-w-0 gap-x-4">
              <div class="min-w-0 flex-auto">
                <p
                  class="text-sm font-semibold leading-6 text-gray-900 text-left truncate"
                >
                  {{ item.link }}
                </p>
                <p
                  class="mt-1 truncate text-xs leading-5 text-gray-500 text-left"
                >
                  {{ item.encurted_link }}
                </p>
              </div>
            </div>

            <div class="mt-5 flex lg:ml-4 lg:mt-0">
              <span class="hidden sm:block">
                <button
                  type="button"
                  class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  @click="redirectToEdit(item.id)"
                >
                  <i
                    class="fa-solid fa-pen-to-square -ml-0.5 mr-1.5 h-4 w-4"
                  ></i>
                  Editar
                </button>
              </span>

              <span class="sm:ml-3">
                <button
                  type="button"
                  class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  @click="redirectToUrl(item.identifier)"
                >
                  <i
                    class="fa-solid fa-chevron-right -ml-0.5 mr-1.5 h-4 w-4"
                  ></i>
                  Acessar
                </button>
              </span>

              <span class="sm:ml-3">
                <button
                  type="button"
                  class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  @click="deleteItem(item.id)"
                >
                  <i class="fa-solid fa-trash-can -ml-0.5 mr-1.5 h-4 w-4"></i>

                  Excluir
                </button>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </main>
    <EditLinkComponent />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { api } from '@/lib/api'
const router = useRouter()

const data = ref([])

const access = ref({})

onMounted(async () => {
  const response = await api.get('/link/list')
  data.value = response.data

  const responseAccess = await api.get('/access')
  access.value = responseAccess.data.data
})

const redirectToCreate = () => {
  router.push('/create')
}

const redirectToEdit = itemId => {
  router.push(`/edit/${itemId}`)
}

const redirectToUrl = identifier => {
  router.push(`/visit/${identifier}`)
}

const deleteItem = async itemId => {
  try {
    await api.delete(`/link/delete/${itemId}`)
    const response = await api.get('/link/list')
    data.value = response.data
  } catch (error) {
    console.error('Erro ao excluir o link:', error)
  }
}
</script>

<style></style>
