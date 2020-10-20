
import LayoutModule from "@/store/modules/layout";
import { getModule } from "@/utils/vuex-class";
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

@Component
export default class Base extends Vue {
	layout = getModule(LayoutModule, this.$store);
	openTrigger = false;
	links = [
		{
			icon: "apps",
			title: "صفحه اصلی",
			to: "/"
		},
	];

	@Watch("$size.web")
	forceClose() {
		if (this.$size.web) {
			this.close();
		}
	}

	open() {
		this.openTrigger = true;
	}

	close() {
		this.openTrigger = false;
	}
}
