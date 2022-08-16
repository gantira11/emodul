import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import IndexAdmin from '../views/admin/AdminView.vue'
import IndexMahasiswa from '../views/mahasiswa/MahasiswaView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/admin/',
    component: IndexAdmin,
    children: [
      {
        name: 'dashboard',
        path: 'dashboard',
        component: () => import('../views/admin/Dashboard.vue'),
          meta: { auth: true, adminAuth: true, mahasiswaAuth: false }

      },
      {
        name: 'emoduls',
        path: 'emoduls',
        component: () => import('../views/admin/Emodul.vue'),
          meta: { auth: true, adminAuth: true, mahasiswaAuth: false }
      },
      {
        name: 'users',
        path: 'users',
        component: () => import('../views/admin/User.vue'),
          meta: { auth: true, adminAuth: true, mahasiswaAuth: false }
      },
      {
        name: 'matakuliah',
        path: 'matakuliah',
        component: () => import('../views/admin/Matakuliah.vue'),
          meta: { auth: true, adminAuth: true, mahasiswaAuth: false }
      },
      {
        name: 'prodi',
        path: 'prodi',
        component: () => import('../views/admin/Prodi.vue'),
          meta: { auth: true, adminAuth: true, mahasiswaAuth: false }
      }
    ],
    meta: { auth: true, adminAuth: true, mahasiswaAuth: false }
  },
  {
    path: '/mahasiswa/',
    component: IndexMahasiswa,
    children: [
      {
        name: 'profile',
        path: 'profile',
        component: () => import('../views/mahasiswa/Profile.vue'),
          meta: { auth: true, adminAuth: false, mahasiswaAuth: true }
      },
      {
        name: 'bookmark',
        path: 'bookmark',
        component: () => import('../views/mahasiswa/Bookmark.vue'),
      },
      {
        name: 'program-studi',
        path: 'program-studi',
        component: () => import('../views/mahasiswa/Prodi.vue'),
          meta: { auth: true, adminAuth: false, mahasiswaAuth: true }
      },
      {
        path: 'program-studi/:slug',
        component: () => import('../views/mahasiswa/Matkul.vue'),
          meta: { auth: true, adminAuth: false, mahasiswaAuth: true }
      },
      {
        path: 'program-studi/:slugProdi/:slug',
        component: () => import('../views/mahasiswa/Emodul.vue'),
          meta: { auth: true, adminAuth: false, mahasiswaAuth: true }
      },
      {
        path: 'program-studi/:slugProdi/:slugMatkul/:slug',
        component: () => import('../views/mahasiswa/DetailEmodul.vue'),
          meta: { auth: true, adminAuth: false, mahasiswaAuth: true }
      },
      {
        path: 'program-studi/:slugProdi/:slugMatkul/:slugModule/:slug',
        component: () => import('../views/mahasiswa/ViewModule.vue'),
          meta: { auth: true, adminAuth: false, mahasiswaAuth: true }
      },
      {
        name: 'detail',
        path: ':slug',
        component: () => import('../views/mahasiswa/DetailEmodul.vue'),
      },
      {
        path: ':slugEmodul/:slug',
        component: () => import('../views/mahasiswa/ViewModule.vue'),
      }
    ],
      meta: { auth: true, adminAuth: false, mahasiswaAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  if(to.meta.auth) {
    const authUser = JSON.parse(localStorage.getItem('dataUser'));
    if(!authUser || !authUser.token) {
      next({name: 'login'})
    } else if(to.meta.adminAuth) {
      if(authUser.user.role.role === 'Admin') {
        next()
      } else {
        next({name: 'program-studi'})
      }
    } else if(to.meta.mahasiswaAuth) {
      if(authUser.user.role.role === 'Mahasiswa') {
        next()
      } else {
        next({name: 'dashboard'})
      }
    }
  } else {
    next()
  }
})

export default router
