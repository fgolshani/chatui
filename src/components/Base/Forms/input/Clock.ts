import { QTime } from "quasar";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: { QTime }
})
export default class Clock extends Vue {
  onInput(value) {
    this.$emit("input", value);
  }
}
