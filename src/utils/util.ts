import moment from "jalali-moment";
import { createDecorator } from "vue-class-component";
export class UniqueIDGenerator {
	generatedList = [];

	clear() {
		this.generatedList = []
	}

	new() {
		let id = this.generate()
		while (this.generatedList.includes(id)) {
			id = this.generate()
		}
		this.generatedList.push(id)
		return id
	}

	private generate(length = 3) {
		let result = "";
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
}

export function createDate(date) {
	return moment(date, "jYYYY/jMM/jDD")
		.locale("en")
		.format("YYYY-MM-DD")
}


type Unpromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never;
type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType[number];
type NonVoidable<T> = T extends void ? never : T;
export type EntityDetector<T extends () => Promise<any>> = ArrayElement<
	NonVoidable<Unpromise<ReturnType<T>>>["queryList"]
>;


export const Meta = createDecorator((options, key) => {
	if (options.methods[key])
		options["meta"] = options.methods[key]
});