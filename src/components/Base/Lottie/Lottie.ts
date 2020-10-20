
import Lottier, { AnimationConfigWithData, AnimationConfigWithPath, AnimationItem } from "lottie-web";
import { Component, Prop, Vue } from "vue-property-decorator";
export type LottieInput = Partial<AnimationConfigWithPath | AnimationConfigWithData>
@Component({
  components: {}
})
export default class Lottie extends Vue {
  @Prop({
    default: {}
  }) options: LottieInput;
  @Prop() height: number;
  @Prop() width: number;

  anim: AnimationItem = null;

  get style() {
    return {
      width: this.width ? `${this.width}px` : "100%",
      height: this.height ? `${this.height}px` : "100%",
      overflow: "hidden",
      margin: "0 auto"
    }
  }

  mounted() {
    if (this.anim) this.anim.destroy()
    this.anim = Lottier.loadAnimation({
      container: this.$refs.lavContainer as Element,
      renderer: "svg",
      ...this.options
    });
    this.$emit("animCreated", this.anim)
  }

  beforeDestroy() {
    this.anim.destroy()
  }
}

