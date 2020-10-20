import { go, highlight } from "fuzzysort";
import { QSelect as QuasarSelect } from "quasar";
import { Component, Vue, Watch } from "vue-property-decorator";
import { SelectItem } from "../../Types";


@Component({
  components: {
    QuasarSelect
  }
})
export default class QSelect extends Vue {
  filteredOptions: SelectItem[] = [];

  get attrs() {
    const result: any = { ...this.$attrs }
    if (this.$attrs.isAutoComplete) {
      result["use-input"] = true;
      result["fill-input"] = true;
      if (!this.$attrs.multiple)
        result["hide-selected"] = true;
      result["input-debounce"] = 0;
      result.events["filter"] = this.filter.bind(this)
    }

    delete result["isAutoComplete"]
    delete result["options"]
    return result
  }

  @Watch("$attrs.options", {
    immediate: true,
  })
  onOptionListChange(newVal) {
    this.filteredOptions = newVal
  }


  onInput(value) {
    this.$emit("input", value);
  }

  filter(val, update, abort) {
    const options: SelectItem[] = this.$attrs.options as any;
    if (!options) return abort()
    update(
      () => {
        if (val === "")
          this.filteredOptions = options
        else {
          this.filteredOptions = go(val, options, {
            key: "label",
            allowTypo: true,
            limit: +this.$attrs.limitCount || 50
          })
            .map((item) => ({
              value: item.obj.value,
              label: highlight(item, `<b class="${this.$attrs.highlightClass}">`, "</b>")
            }))
        }
      },
      (ref: QuasarSelect) => {
        if (val !== "" && ref.options.length > 0) {
          ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
          ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
        }
      }
    )
  }

}

