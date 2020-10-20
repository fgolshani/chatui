/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingBar } from "quasar";
import { VueConstructor } from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

type RouterBootParams = {
  Vue: VueConstructor;
}

declare module "vue/types/vue" {
  interface VueConstructor {
    $router: VueRouter;
  }
}

export default function ({ Vue }: RouterBootParams) {
  Vue.use(VueRouter);
  const router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  // Showing Loading is only allowed on param or path change.
  router.beforeEach((to, from, next) => {
    if (to.path != from.path)
      LoadingBar.start()
    next()
  })
  router.afterEach((to, from) => {
    LoadingBar.stop()
  })

  Vue.$router = router
  return router;
}
