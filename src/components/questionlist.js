 let QuestionList = {
     getAll: function() {
         return JSON.parse(localStorage.getItem('questions') || '{"list":[], "currentQuestionIndex":null}');
     },
     updateList: function(list) {
         localStorage.setItem("questions", JSON.stringify(list));
     }
 }

 export default QuestionList;