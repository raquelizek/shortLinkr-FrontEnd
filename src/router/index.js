import { createRouter, createWebHashHistory } from 'vue-router'

import DashboardPage from '../pages/master/DashboardPage'
import CreatePage from '../pages/forms/CreatePage'
import EditPage from '../pages/forms/EditPage'

const routes = [
  {
    name: 'Dashboard',
    path: '/',
    component: DashboardPage
  },
  {
    name: 'EditPage',
    path: '/edit',
    component: EditPage
  },
  {
    name: 'CreatePage',
    path: '/create',
    component: CreatePage
  }
]

const router = Router()

export default router

function Router() {
  const router = new createRouter({
    history: createWebHashHistory(),
    routes
  })
  return router
}
