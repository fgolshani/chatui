import { isString } from "util";
import { Component, Prop, Vue } from "vue-property-decorator";
import FormField from "./FormField";
import { FormInputType } from "./Types";

@Component({
	components: {
		FormField
	}
})
export default class FormMaker extends Vue {
	@Prop() form: Form<any>
}

type ValueItem<T> = Record<keyof T, any>

export class Form<T>{

	value: Partial<ValueItem<T>> = {}
	constructor(public fields: T & FormInputType.FieldItem) {
		this.reset();
	}

	reset() {
		for (const key in this.fields as T) {
			this.value[key] = this.fields[key].hasOwnProperty("initialValue") ? this.fields[key]["initialValue"] : null
		}
	}

	set(value: Partial<ValueItem<T>>) {
		this.reset()
		this.patch(value)
	}

	patch(value: Partial<ValueItem<T>>) {
		this.value = {
			...this.value,
			...value
		}
	}

	serialize() {
		const output = { ...this.value };
		for (const key in this.value) {
			const val = this.value[key]
			if (!isString(val)) {
				delete output[key]
			}
		}
		return output
	}
}
