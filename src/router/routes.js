const routes = [
  {
    path: '/',
    component: () => import('layouts/MenuTabs.vue'),
    children: [
      { path: '', name: 'login', component: () => import('pages/Login.vue') },
      { path: 'profile', name: 'profile', component: () => import('pages/Profile.vue') },
      { path: 'flashcard', name: 'flashcard', component: () => import('pages/VerseList.vue') },
      { path: 'guide', name: 'guide', component: () => import('pages/Guide.vue') },
      { path: 'devotional', name: 'devotional', component: () => import('pages/Devotional.vue'), props: true },
      { path: 'feed', name: 'feed', component: () => import('pages/Feed.vue') },
      { path: 'prayerlist', name: 'prayerlist', component: () => import('pages/PrayerList.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Guide.vue')
  })
}

export default routes
