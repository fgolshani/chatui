
function integer(value) {
  if (!value) return null;
  const valid = new RegExp(/^-?(0|[1-9]\d*)$/).test(value)
  return valid || "عدد وارد کنید"
}

function validSSN(input: string) {
  let result = false;
  if (/^\d{10}$/.test(input)) {
    const check = parseInt(input[9]);
    let sum = 0;
    for (let i = 0; i < 9; ++i) {
      sum += parseInt(input[i]) * (10 - i);
    }
    sum %= 11;
    result = (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11)
  }

  return result || "کد ملی صحیح وارد کنید"
}

export const Validators = {
  required: (val) => (val !== null && val !== "" && val !== undefined) || "Required",
  date: (val) => val.includes("dddd/dd/dd") || "تاریخ نا معتبر است",
  integer,
  validSSN
}