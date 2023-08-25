import { createRouter, createWebHistory } from 'vue-router'

import DashboardPage from '../pages/master/DashboardPage'
import CreatePage from '../pages/forms/CreatePage'
import EditPage from '../pages/forms/EditPage'
import RedirectPage from '../pages/RedirectPage'

const routes = [
  {
    name: 'Dashboard',
    path: '/',
    component: DashboardPage
  },
  {
    name: 'EditPage',
    path: '/edit/:id',
    component: EditPage
  },
  {
    name: 'CreatePage',
    path: '/create',
    component: CreatePage
  },
  {
    name: 'RedirectPage',
    path: '/visit/:identifier',
    component: RedirectPage
  }
]

const router = Router()

export default router

function Router() {
  const router = new createRouter({
    history: createWebHistory(),
    routes
  })
  return router
}
