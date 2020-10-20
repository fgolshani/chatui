
import { QDate, QPopupProxy } from "quasar";
import { Component, Ref, Vue } from "vue-property-decorator";
@Component({
  components: {
    QDate
  }
})
export default class QCalendar extends Vue {
  @Ref("qDateProxy") qDateProxy: QPopupProxy;
  onInput(value) {
    this.qDateProxy.hide();
    this.$emit("input", value)
  }
}

