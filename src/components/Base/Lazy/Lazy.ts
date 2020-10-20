
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
	components: {}
})
export default class Lazy extends Vue {
	@Prop({
		default: "",
		required: true
	}) src: string;

	shownSource = null;

	onIntersection() {
		this.shownSource = this.src
	}
}

