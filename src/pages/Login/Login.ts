import FormContainer, { ContainerData } from "@/components/Base/Forms/FormContainer";
import { Form } from "@/components/Base/Forms/FormMaker";
import { Field } from "@/components/Base/Forms/Types";
import LayoutModule from "@/store/modules/layout";
import UserModule from "@/store/modules/user";
import { notifyConfig } from "@/utils/default";
import { Validators } from "@/utils/validator";
import { getModule } from "@/utils/vuex-class";
import { QDialog } from "quasar";
import { serverAdress } from "src/utils/config.json";
import Vue from "vue";
import { Component, Ref } from "vue-property-decorator";
@Component({
  components: {
    FormContainer
  }
})
export default class Login extends Vue {
  store = getModule(LayoutModule, this.$store);
  user = getModule(UserModule, this.$store);
  @Ref("dialog") dialog: QDialog;
  showDialog = false;
  forgotTab = "one";
  container: ContainerData = {
    loading: false,
    class: {
      bodyClass: "py-2"
    },
    title: "Login"
  };

  forgetOneContainer: ContainerData = {
    loading: false,
  };
  forgetTwoContainer: ContainerData = {
    loading: false,
  };

  userStore = getModule(UserModule, this.$store);

  form = new Form({
    username: {
      component: Field.Input,
      label: "Username",
      icon: "face",
      class: "col-8 col-mob-12 my-1",
      rules: [Validators.required],
      name: "username"
    },
    password: {
      component: Field.Input,
      type: "password",
      label: "Password",
      icon: "vpn_key",
      class: "col-8 col-mob-12 my-1",
      rules: [Validators.required],
      name: "password"
    }
  });

  created() {
    this.store.hideFooter = true;
  }

  beforeDestroy() {
    this.store.hideFooter = false;
  }

  async submit() {
    const form = this.form.value
    this.container.loading = true;
    try {
      // `${serverAdress}/login` === serverAddress + "/login"
      await this.$axios.post(`${serverAdress}/login`, {
        username: form.username,
        password: form.password,
      })
      this.user.username = form.username
      this.$q.notify(notifyConfig.success); // success message box
      this.$router.push("/chatroom") // navigato to "/chatroom"
    }
    catch ({ response }) {
      // JSON.parse(str) => obj
      // JSON.stringify(obj) => str
      // console.log({ err }) /// {err: err}
      this.$q.notify({ type: "negative", message: response.data.error })
    }
    this.container.loading = false
  }

  show() {
    this.dialog.show();
  }

  hide() {
    this.dialog.hide();
  }

}
