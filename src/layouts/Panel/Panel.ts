import BreadCrumbModule from "@/store/modules/breadCrumb";
import User from "@/store/modules/user";
import { getModule } from "@/utils/vuex-class";
import { Component, Vue } from "vue-property-decorator";
type LinkChild = Omit<Link, "child" | "icon">
type Link = {
  icon: string;
  title: string;
  link?: string;
  hide?: boolean;
  child?: LinkChild[];
}
@Component({
  components: {}
})
export default class Panel extends Vue {
  store = getModule(BreadCrumbModule, this.$store);
  user = getModule(User, this.$store);
  leftDrawerOpen = false;
  links: Link[] = [];

  created() {
    this.setBreadCrumb();
    this.setLinks()
    this.filterNoVisibleChild()
  }

  setBreadCrumb() {
    const list = [{
      title: "پنل",
      link: ""
    }];
    this.store.setBreadCrumb(list);
  }

  setLinks() {
    this.links = [
      {
        icon: "home",
        title: "منو",
        child: [
          {
            title: "آیتم اول",
            link: "/"
          }
        ]
      },
      {
        icon: "business_center",
        title: "آیتم",
      },
    ]
  }

  logOut() {
    this.user.logout();
    this.$router.push("/login")
  }

  filterNoVisibleChild() {
    this.links = this.links.filter((item) => {
      let result = true;
      if (item.child)
        result = !!item.child.filter((childItem) => !childItem.hide).length
      else
        result = !item.hide
      return result
    })
  }
}

