
// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//

const questions = [
  {
    type: "input",
    name: "componentName",
    message: "Name of the Component? 🔥",
    validate: (val)=>!!val,
  },
  {
    type: "input",
    name: "persianComponentName",
    message: "Entity Name in Persian? 🌐",
  },
  {
    type: "input",
    name: "componentListName",
    message: "Name of the List Component? 📋",
    initial: "List"
  },
  {
    type: "confirm",
    name: "hasList",
    message: "Need List Page Too? ❓",
    initial: true,
  }
]

const listQuestions = [
  {
    type: "confirm",
    name: "hasPagination",
    message: "Need Pagination for List? ❓",
    initial: true,
  }
]

module.exports = {
  prompt: ({ prompter, args }) => {
    return  prompter
    .prompt(questions)
    .then((answers) =>{
      const {hasList} = answers;
      const nextQuestions = [];
      if(hasList)
        nextQuestions.push(...listQuestions)

      return prompter.prompt(nextQuestions)
      .then(nextAnswers => Object.assign({hasPagination: false}, answers, nextAnswers))
    })
  } 
 
}
