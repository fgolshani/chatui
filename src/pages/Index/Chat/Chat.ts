
import { Component, Prop, Vue } from "vue-property-decorator";


export type ChatType = {
  date: string;
  message: string;
  name: string;
  id: string;
  isMine: boolean;
}

@Component({
  components: {}
})
export default class Chat extends Vue {
  @Prop() input: ChatType

}

