import { Module, Mutation, VuexModule } from "@/utils/vuex-class";

type DocumentSides = "left" | "right"
@Module({
  name: "Layout",
  namespaced: true,
  stateFactory: true
})
export default class LayoutModule extends VuexModule {
  documentSidenav = {
    left: false,
    right: false,
    isActive: false
  }

  hideFooter = false;

  @Mutation
  toggleDocumentSideNav(side?: DocumentSides) {
    if (side)
      this.documentSidenav[side] = !this.documentSidenav[side]
    else {
      this.documentSidenav.left = !this.documentSidenav.left
      this.documentSidenav.right = !this.documentSidenav.right
    }
  }
}
