
import { QFile as QuasarFile } from "quasar";
import { isString } from "util";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    QuasarFile
  }
})
export default class QFile extends Vue {
  isEmptyFile = false;
  imageUrl = null
  fileName = ""
  reader = new FileReader();

  isModalOpen = false;

  created() {
    this.reader.addEventListener("load", (ev) => this.readFile(ev))
  }

  onInput(value) {
    this.$emit("input", value);
  }

  previewImage() {
    if (this.imageUrl)
      this.isModalOpen = true;
  }

  get transformedValue() {

    if (this.$attrs.value) {
      if (isString(this.$attrs.value)) {
        this.imageUrl = this.$attrs.value;
        this.fileName = this.$attrs.value.split("/").pop()
        this.isEmptyFile = true;
        this.$emit("input", null)
        return null
      }
      else {
        this.reader.readAsDataURL(this.$attrs.value)
        this.fileName = ""
        this.isEmptyFile = false;
        return this.$attrs.value;
      }
    }
    else if (this.isEmptyFile) {
      return new File([], this.fileName)
    }
    return this.$attrs.value
  }


  readFile({ target }: ProgressEvent<FileReader>) {
    this.imageUrl = target.result
  }
}

