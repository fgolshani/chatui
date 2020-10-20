import { Module, Mutation, VuexModule } from "@/utils/vuex-class";

@Module({
  name: "BreadCrumb",
  namespaced: true,
  stateFactory: true
})

export default class BreadCrumbModule extends VuexModule {
  documentSidenav = {
    left: false,
    right: false,
    isActive: false
  }

  list = [];

  @Mutation
  setBreadCrumb(list) {
    this.list = list
  }
}
