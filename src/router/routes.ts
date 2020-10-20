import { RouteConfig } from "vue-router"

const routes: RouteConfig[] = [
  {
    path: "/chatroom",
    component: () => import("pages/Index/Index.vue")
  },
  {
    path: "/",
    component: () => import("layouts/Base/Base.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Login/Login.vue")
      },
      {
        path: "register",
        component: () => import("pages/Register/Register.vue")
      },
    ]
  },
]

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("layouts/Base/Base.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Error/Error.vue")
      },
    ]
  })
}

export default routes
