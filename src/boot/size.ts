
import { boot } from "quasar/wrappers"
import Vue from "vue"

declare module "vue/types/vue" {
  interface Vue {
    $size: {
      mobile: boolean;
      web: boolean;
      tablet: boolean;
    };
  }
}

export class Breakpoint {
  constructor(thresholds: any) {
    this.thresholds = thresholds
    this.init()
  }

  state = new Vue({
    data: {
      web: true,
      tablet: false,
      mobile: false,
      height: 0,
      width: 0
    }
  })

  private thresholds: any = []

  private resizeTimeout = 100

  public init() {
    /* istanbul ignore if */
    if (typeof window === "undefined") { return }

    window.addEventListener(
      "resize",
      this.onResize.bind(this),
      { passive: true }
    )

    this.update()
  }

  private onResize() {
    clearTimeout(this.resizeTimeout)

    // Added debounce to match what
    // v-resize used to do but was
    // removed due to a memory leak
    // https://github.com/vuetifyjs/vuetify/pull/2997
    this.resizeTimeout = window.setTimeout(this.update.bind(this), 200)
  }

  /* eslint-disable-next-line max-statements */
  private update() {
    const height = this.getClientHeight()
    const width = this.getClientWidth()

    const web = width >= this.thresholds.web
    const tablet = width >= this.thresholds.tablet && !web
    const mobile = !web && !tablet

    this.state.height = height
    this.state.width = width
    this.state.web = web
    this.state.tablet = tablet
    this.state.mobile = mobile
  }

  // Cross-browser support as described in:
  // https://stackoverflow.com/questions/1248081
  private getClientWidth() {
    /* istanbul ignore if */
    if (typeof document === "undefined") { return 0 } // SSR
    return Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    )
  }

  private getClientHeight() {
    /* istanbul ignore if */
    if (typeof document === "undefined") { return 0 } // SSR
    return Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    )
  }
}

export default boot(({ Vue }) => {
  Vue.prototype.$size = new Breakpoint({
    web: 1280,
    tablet: 600,
    mobile: 0
  })
    .state;
});
