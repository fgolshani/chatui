
import FormContainer from "@/components/Base/Forms/FormContainer";
import TableContainer from "@/components/Base/TableContainer/TableContainer";
import User from "@/store/modules/user";
import { getModule } from "@/utils/vuex-class";
import { QInput } from "quasar";
import io from "socket.io-client";
import { serverAdress } from "src/utils/config.json";
import { Component, Ref, Vue } from "vue-property-decorator";
import Chat, { ChatType } from "./Chat/Chat";

type Room = {
  id: string | number;
  name: string;
  avatar: string;
}

@Component({
  components: {
    FormContainer,
    TableContainer,
    Chat
  }
})
export default class Index extends Vue {
  @Ref("input") input: QInput
  user = getModule(User, this.$store)
  leftDrawerOpen = false
  search = ""
  message = ""
  socket: SocketIOClient.Socket = null;
  currentConversationIndex = 0
  rooms: Room[] = []

  chatList: ChatType[] = []

  get currentConversation() {
    return this.rooms[this.currentConversationIndex]
  }

  get style() {
    return {
      height: this.$q.screen.height + "px"
    }
  }

  sendMessage() {
    const message = this.input.value
    this.socket.emit("chatMessage", message)
  }

  joinRoom(room: Room) {
    this.socket.emit("joinRoom", {
      username: this.user.username,
      room: room.name
    })
  }

  async mounted() {
    try {
      const roomData = (await this.$axios.get(`${serverAdress}/room`)).data
      this.rooms = roomData.map((item) => ({
        id: item.id,
        name: item.name,
        avatar: "/statics/images/chat.png"
      }))
    }
    catch (err) { }

    this.socket?.close()
    this.socket = io.connect(`${serverAdress}`);
    this.socket.on("connect", () => console.log("connected"))
    this.socket.on("previousMessages", (data) => {
      const formattedData = data.map(item => ({
        date: item.time,
        id: item.id,
        isMine: this.user.username == item.username,
        message: item.text,
        name: item.username || "Unknown"
      }))
      this.chatList.push(...formattedData) // this.chatList.push(data[0], data[1], ... data[n-1])
    })
    this.socket.on("message", (data) => this.chatList.push({
      date: data.time,
      id: data.id,
      isMine: this.user.username == data.username,
      message: data.text,
      name: data.username
    }))
  }

}