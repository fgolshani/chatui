
import { QCheckbox, QRadio, QToggle } from "quasar";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    QRadio,
    QCheckbox,
    QToggle,
  }
})
export default class QSwitch extends Vue {
  onInput(value) {
    this.$emit("input", value);
  }

  get fieldInput() {
    const attributes = { ...this.$attrs }
    delete attributes.label
    return attributes
  }

  get componentInput() {
    const attributes = { ...this.$attrs }
    delete attributes.name
    attributes.color = this.$attrs.checkboxColor
    return attributes
  }

  clear() {
    this.onInput(false)
  }
}

