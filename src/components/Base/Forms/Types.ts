import { QCheckbox, QDate, QField, QFile, QInput, QRadio, QSelect, QSlider, QTime, QToggle } from "quasar";

export type SelectItem = {
  value: any;
  label: string;
}

export enum Field {
  Select = "QSelect",
  Input = "QInput",
  Calendar = "QCalendar",
  File = "QFile",
  Quill = "Quill",
  Clock = "Clock",
  Switch = "QSwitch",
  Slider = "QSlider"
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace FormInputType {
  type JustMethodKeys<T> = ({ [P in keyof T]: T[P] extends Function ? P : never })[keyof T];
  type PickProp<T extends Vue> = Omit<T, keyof Vue | JustMethodKeys<T> | "value">

  type SelectField = PickProp<Omit<QSelect, "options">> & {
    component: Field.Select;
    options: SelectItem[];
  }

  type InputField = PickProp<QInput> & {
    component: Field.Input;
  }

  type FileField = PickProp<QFile> & {
    component: Field.File;
  }

  type RadioField = PickProp<QRadio> & {
    component: Field.Switch;
    type: "QSwitch";
  }

  type CheckboxField = PickProp<QCheckbox> & {
    component: Field.Switch;
    type: "QCheckbox";
  }

  type ToggleField = PickProp<QToggle> & {
    component: Field.Switch;
    type: "QToggle";
  }

  type SliderField = PickProp<QSlider> & {
    component: Field.Slider;
  }

  type ClockField = PickProp<QTime> & {
    component: Field.Clock;
  }

  type CalendarField = PickProp<QDate> & {
    component: Field.Calendar;
  }

  type QuillField = PickProp<QField> & {
    component: Field.Quill;
  }

  export type FieldItem = {
    [key: string]: SelectField | InputField | FileField |
    RadioField | CheckboxField | ToggleField | SliderField |
    ClockField | CalendarField | QuillField;
  }

}