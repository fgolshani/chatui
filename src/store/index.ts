import { VueConstructor } from "vue";
import Vuex, { Store } from "vuex";
import BreadCrumb from "./modules/breadCrumb";
import Layout from "./modules/layout";
import User from "./modules/user";
// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

type StoreBootParams = {
  Vue: VueConstructor;
}

declare module "vue/types/vue" {
  interface VueConstructor {
    $store: Store<any>;
  }
}

export default function ({ Vue }: StoreBootParams) {
  Vue.use(Vuex);

  const store = new Vuex.Store({
    modules: {
      Layout,
      User,
      BreadCrumb,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    // strict: !!process.env.DEV
  });
  Vue.$store = store
  return store;
}
