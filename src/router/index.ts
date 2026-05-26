import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/AppLayout.vue'),
      children: [
        {
          path: '',
          name: 'preview',
          component: () => import('../views/PreviewView.vue'),
        },
        {
          path: 'editor',
          name: 'editor',
          component: () => import('../views/EditorView.vue'),
        },
        {
          path: 'jd-radar',
          name: 'jd-radar',
          component: () => import('../views/JdRadarView.vue'),
        },
      ],
    },
  ],
})

export default router
