
import { QDialog } from "quasar";
import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import FormContainer from "../../Forms/FormContainer";
import { Form } from "../../Forms/FormMaker";

@Component({
  components: {
    FormContainer
  }
})
export default class TableFilter extends Vue {
  @Prop() form: Form<any>
  @Ref() dialog: QDialog;

  show() {
    this.dialog.show()
  }

  hide() {
    this.dialog.hide()
  }

  submit() {
    this.$emit("ok", this.form.value)
  }
}

