import { QForm } from "quasar";
import Vue from "vue";
import { Component, Emit, Prop, Ref } from "vue-property-decorator";
import FormMaker, { Form } from "./FormMaker";


@Component({
  components: {
    FormMaker
  }
})
export default class FormContainer extends Vue {
  @Prop({ default: () => ({}) }) form: Form<any>;
  @Prop({ default: () => ({ class: {} }) }) container: ContainerData;
  @Ref("qForm") formRef: QForm;
  @Emit("submit")
  submit(formVal) {
    return formVal;
  }

  @Emit("reset")
  reset(data) {
    return data;
  }

  mounted() {
    this.container.ref = this.formRef
  }

  get containerConfig() {
    const newConfig = {
      ...this.container,
      class: {
        ...this.container.class,
        bodyClass: "p-2"
      }
    }
    return newConfig
  }
}

export type ContainerData = {
  title?: string;
  ref?: QForm;
  subLink?: Link[];
  loading?: boolean;
  noBuild?: boolean;
  class?: {
    headerClass?: string;
    bodyClass?: string;
    containerClass?: string;
  };
  container?: string;
  list?: {
    link: string;
  };
  delete?: {
    handler: () => any;
  };
};

type Link = {
  title: string;
  icon: string;
  link?: string;
  clickHandler?: () => void;
};
