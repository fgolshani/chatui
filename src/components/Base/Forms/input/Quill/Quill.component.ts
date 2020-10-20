import { QuillOptionsStatic } from "quill";
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";



@Component({})
export default class QuillComponent extends Vue {
	editor = null;
	options: QuillOptionsStatic = {
		modules: {
			syntax: true,
			blotFormatter: {},
			toolbar: [
				[{ "header": 1 }, { "header": 2 }],               // custom button values
				["image", { "direction": "rtl" }, { "align": [] }],                         // text direction
				[{ "list": "ordered" }, { "list": "bullet" }],
				[{ "color": [] }, { "background": [] }],          // dropdown with defaults from theme
				["bold", "italic", "underline"],        // toggled buttons
				["blockquote", "code-block"],
				[{ "script": "sub" }, { "script": "super" }],      // superscript/subscript
				[{ "indent": "-1" }, { "indent": "+1" }],          // outdent/indent
				["clean"]                                         // remove formatting button
			]
		},
		theme: "snow"
	};

	async mounted() {
		const HiLi = await import("highlight.js")
		const Quill = (await import("quill")).default
		const Blot = await import("quill-blot-formatter");
		Quill.register("modules/blotFormatter", Blot.default);

		HiLi.configure({   // optionally configure hljs
			languages: ["javascript", "ruby", "python"]
		});
		const Syntax = Quill.import("modules/syntax"); // get the module
		Syntax.DEFAULTS = {
			highlight: (text) => HiLi.highlightAuto(text).value,
			interval: 500 // change interval if desired
		};
		this.editor = new Quill(this.$refs["editor"], this.options)
		this.editor.on("text-change", () => {
			this.$emit("input", this.editor.root.innerHTML);
		})
	}

	@Watch("$attrs.value", {
		immediate: true,
	})
	onValChanged(newVal) {
		if (this.editor) {
			if (newVal != this.editor.root.innerHTML) {
				this.editor.root.innerHTML = this.$attrs["value"]
				const callback = this.$attrs.events["input"];
				if (callback)
					callback(newVal)
			}
		}
	}

	beforeDestroy() {
		this.editor.off("text-change")
	}
}
