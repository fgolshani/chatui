import FormContainer, { ContainerData } from "@/components/Base/Forms/FormContainer";
import { Form } from "@/components/Base/Forms/FormMaker";
import { Field } from "@/components/Base/Forms/Types";
import LayoutModule from "@/store/modules/layout";
import UserModule from "@/store/modules/user";
import { notifyConfig } from "@/utils/default";
import { Meta } from "@/utils/util";
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
export default class Register extends Vue {
  store = getModule(LayoutModule, this.$store);
  user = getModule(UserModule, this.$store);
  @Ref("dialog") dialog: QDialog;
  confirm = false;

  @Meta meta() {
    return {
      title: "Sign Up Page"
    };
  }

  container: ContainerData = {
    loading: false,
    class: {
      bodyClass: "py-3"
    }
  };
  loginContainer: ContainerData = {
    loading: false
  };
  userStore = getModule(UserModule, this.$store);

  form = new Form({
    name: {
      icon: "person",
      component: Field.Input,
      label: "Name",
      class: "col-12",
      rules: [Validators.required]
    },
    username: {
      icon: "person",
      component: Field.Input,
      label: "Username",
      class: "col-6 col-mob-12",
      rules: [Validators.required]
    },
    password: {
      icon: "vpn_key",
      component: Field.Input,
      type: "password",
      label: "Password",
      class: "col-6 col-mob-12",
      rules: [Validators.required]
    },
  });

  async submit() {
    const form = this.form.value
    this.container.loading = true;
    try {
      await this.$axios.post(`${serverAdress}/user`, {
        name: form.name,
        username: form.username,
        password: form.password,
      })
      this.$q.notify(notifyConfig.success);
      this.$router.push("/")
    }
    catch ({ response }) {
      this.$q.notify({ type: "negative", message: response.data.error })
    }
    this.container.loading = false
  }

  created() {
    this.store.hideFooter = true;
  }

  beforeDestroy() {
    this.store.hideFooter = false;
  }
}
