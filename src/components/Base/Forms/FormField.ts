import { QInput } from "quasar";
import { isFunction, isString } from "util";
import { Component, Prop, Vue } from "vue-property-decorator";
import Clock from "./input/Clock";
import QCalendar from "./input/QCalendar";
import QFile from "./input/QFile/QFile";
import QSelect from "./input/QSelect/QSelect";
import Quill from "./input/Quill/Quill.component";
import QSwitch from "./input/Switch/Switch";
import { Field } from "./Types";

const toEnglish = (value: string | number) => {
	let outputString = "";
	const valueCpy = value.toString();
	for (let index = 0; valueCpy && index < valueCpy.length; index++) {
		switch (valueCpy[index]) {
			case "۰": outputString += "0"; break;
			case "۱": outputString += "1"; break;
			case "۲": outputString += "2"; break;
			case "۳": outputString += "3"; break;
			case "۴": outputString += "4"; break;
			case "۵": outputString += "5"; break;
			case "۶": outputString += "6"; break;
			case "۷": outputString += "7"; break;
			case "۸": outputString += "8"; break;
			case "۹": outputString += "9"; break;
			default: outputString += valueCpy[index];
		}
	}
	return outputString;
}

@Component({
	components: {
		QCalendar,
		Clock,
		Quill,
		QSelect,
		QSwitch,
		QFile,
		QInput
	}
})
export default class FormField extends Vue {
	isHandMade = false;
	@Prop({ required: true }) field;
	@Prop({ required: true }) value;

	created() {
		const component = this.field.component;
		this.isHandMade = !!this.handMadeComponentList.find(
			item => item == component
		);
	}

	mounted() {
		this.$set(this.field, "ref", this.$refs["ref"])
	}

	childAvoidanceList = ["component", "value", "passwordToggle"];

	handMadeComponentList = [
		Field.Calendar,
		Field.Clock,
		Field.Switch,
		Field.File,
		Field.Select,
		Field.Quill];

	defaultValues = {
		common: {
			dense: true,
			filled: true,
			events: {},
		},

		default: {
			QCalendar: {
				calendar: "persian"
			},
			QSelect: {
				isAutoComplete: true,
				"map-options": true,
				"emit-value": true,
				"use-chips": field => field.multiple ? true : false,
			},
			QInput: {
				autogrow: field => (field.type == "textarea" ? true : false),
				passwordToggle: field => (field.type == "password" ? true : false)
			},
			QSwitch: {
				type: "q-checkbox",
			}
		},

		extend: {
			QCalendar: {
				rules: ["date"]
			},
			Clock: {
				rules: ["time"]
			}
		}
	};

	get childProp() {
		this.setDefaulProps(this.field);
		const output = { ...this.field };
		const filterList = [...this.childAvoidanceList];
		if (!this.isHandMade) filterList.push("events");
		this.removeAdditionalFields(output, filterList);
		return output;
	}

	get childEvent() {
		if (this.isHandMade) return {};
		return this.field.events;
	}

	onValChanged(value) {
		let eventVal = value
		if (isString(value))
			eventVal = toEnglish(value)
		this.$emit("input", eventVal);
	}

	removeAdditionalFields(fieldData, filterList) {
		for (const key of filterList) delete fieldData[key];
	}

	setDefaulProps(props: object) {
		const commonPropMap = this.defaultValues.common;
		for (const key in commonPropMap)
			props[key] = props.hasOwnProperty(key) ? props[key] : commonPropMap[key];

		const defaultProp = this.defaultValues.default[this.field.component] || [];
		for (const key in defaultProp)
			props[key] =
				props.hasOwnProperty(key) ? props[key] :
					(isFunction(defaultProp[key])
						? defaultProp[key](props)
						: defaultProp[key]);

		const extendPropMap = this.defaultValues.extend[this.field.component] || [];
		for (const key in extendPropMap) {
			if (props[key]) props[key] = [...extendPropMap[key], ...props[key]];
			else props[key] = extendPropMap[key];
		}
	}
}