import { confirmSettings } from "@/utils/default";
import Vue from "vue";
import { Component, Prop, PropSync } from "vue-property-decorator";
import { Form } from "../Forms/FormMaker";
import TableFilter from "./TableFilter/TableFilter";

type TableConfigField<T> = {
	key: string;
	label: string;
	style?: string;
	"row-key"?: string;
	classes?: string;
	headerStyle?: string;
	headerClasses?: string;
	sortable?: boolean;
	required?: boolean;
	align?: "left" | "right" | "center";
	valueGetter?: (row: T) => any;
	sort?: (a, b, rowA?: T, rowB?: T) => number;
	formater?: (val: string, row: T) => any;
}
export type TableConfig<T = any> = {
	columns?: TableConfigField<T>[];
	pagination?: {
		page: number;
		rowsPerPage: number;
		rowsNumber?: number;
	};
	loading: boolean;
	data: any[];
	events: Record<string, any>;
} & Record<string, any>

@Component({
	components: {
		TableFilter
	}
})
export default class TableContainer extends Vue {
	@Prop({ default: () => ({}) }) container: TableData;
	@Prop({ default: () => ({}) }) columns: TableConfig["columns"]
	@Prop({ default: () => ({}) }) events: object
	@PropSync("selected") _selected;
	@PropSync("pagination") _pagination;

	get trnsformedColumns() {

		return this.columns.map((item) => ({
			name: item.key,
			align: item.align || "left",
			format: item.formater,
			field: item.valueGetter || item.key,
			"row-key": item["row-key"] || "id",
			//using same key-value pairs.
			label: item.label,
			style: item.style,
			classes: item.classes,
			headerStyle: item.headerStyle,
			headerClasses: item.headerClasses,
			sortable: item.sortable,
			required: item.required,
			sort: item.sort,
		}))
	}

	get childEvents() {
		const events = { ...this.events };
		delete events["filter"];
		return events;
	}

	get disabled() {
		return !(this._selected?.length && !this.container.delete.disable)
	}

	get containerOptions(): TableData {
		const newContainer = { ...this.container };
		if (newContainer.add !== null) {
			newContainer.add = {
				link: "."
			}
		}
		return newContainer
	}

	created() {
		this.$on("filter", (value) => {
			const filterCB = this.events["filter"]
			if (filterCB)
				filterCB(value)
		})
	}


	openDialog() {
		this.$q.dialog(confirmSettings)
			.onOk(() => this.container.delete.handler())
	}

	openFilterDialog() {
		const ref = this.$q.dialog({
			component: TableFilter,
			form: this.container.filterForm,
			parent: this,
			position: "top"
		})
			.onOk((value) => {
				ref.hide();
				this.$emit("filter", value)
			})
	}
}

type Link = {
	title: string;
	icon: string;
	link?: string;
	clickHandler?: () => void;
};

export type TableData<T = any> = {
	filterForm?: Form<T>;
	title?: string;
	subLink?: Link[];
	add?: {
		link: string;
	};
	delete?: {
		disable?: boolean;
		handler?: () => any;
	};
};
