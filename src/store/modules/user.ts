import { Action, Module, Mutation, VuexModule } from "@/utils/vuex-class";
import { ReplaySubject } from "rxjs";
import { take } from "rxjs/operators";

type UserRole = "admin" | "regular"
@Module({
  name: "User",
  namespaced: true,
  stateFactory: true,
})
export default class User extends VuexModule {
  userInfo = null;
  isLogged = false;
  username = "";
  loading = false;
  role: UserRole = null;
  isReady$ = new ReplaySubject(1)

  @Action({ rawError: true })
  login(token) {
    localStorage.setItem("token", token)
  }

  @Action({ rawError: true })
  logout() {
    this.clear()
  }

  @Action({ rawError: true })
  isReady() {
    return this.isReady$.pipe(take(1))
      .toPromise()
  }

  @Action({ rawError: true })
  async setUser() {

  }

  @Mutation
  clear() {
    localStorage.removeItem("token");
    this.isLogged = false;
    this.role = null
    this.loading = false;
    this.isReady$.next();
  }

}
