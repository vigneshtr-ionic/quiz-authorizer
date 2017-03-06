import React, { Component } from 'react';
import QuestionAdder from "./questionAdder";
import QuestionAuthorizer from "./questionAuthorizer";
import QuestionList from "./questionlist";

export default class UIRoot extends Component {
    constructor(props) {
        super(props);
        this.state = QuestionList.getAll();
    }
    // Adding a new question
    addNewQuestion() {
        let list = this.state.list;
        let length = list.length + 1;
        list = list.concat({
            id: length,
            question: "New Question " + length + " ?",
            choices: [{ id: 1, value: "" }, { id: 2, value: "" }]
        })
        let currentState = {
            list: list,
            currentQuestionIndex: this.state.currentQuestionIndex,
            isDelete: this.state.isDelete,
            isDeleteChoice: this.state.isDeleteChoice
        }
        this.setState(currentState);
        if(length == 1){
            setTimeout(function() {
                 document.getElementsByClassName("question-list")[0].childNodes[0].click();
            });
          
        }
        QuestionList.updateList(currentState);
    }
    //Adding a new choice option 
    addNewChoiceOption() {
        let list = this.state.list;
        let currentList = list[this.state.currentQuestionIndex]
        currentList.choices.push({ id: currentList.choices.length + 1, value: "" })
        let currentState = {
            list: list,
            currentQuestionIndex: this.state.currentQuestionIndex,
            isDelete: this.state.isDelete,
            isDeleteChoice: this.state.isDeleteChoice
        }
        this.setState(currentState)
        QuestionList.updateList(currentState);
    }
    //updating choice text to list
    updateOptions(optionIndex, e) {
        let list = this.state.list;
        let currentList = list[this.state.currentQuestionIndex]
        currentList.choices[optionIndex].value = e.target.value;
        let currentState = {
            list: list,
            currentQuestionIndex: this.state.currentQuestionIndex,
            isDelete: this.state.isDelete,
            isDeleteChoice: this.state.isDeleteChoice
        }
        this.setState(currentState);
        QuestionList.updateList(currentState);
    }
    //updating question text to list
    updateQuestion(e) {
        let list = this.state.list;
        let index = this.state.currentQuestionIndex;
        list[index].question = e.target.value;
        let currentState = {
            list: list,
            currentQuestionIndex: index,
            isDelete: this.state.isDelete,
            isDeleteChoice: this.state.isDeleteChoice
        }
        this.setState(currentState)
        QuestionList.updateList(currentState);
    }
    //uploading image file
    uploadFile(e){
         let list = this.state.list;
        let index = this.state.currentQuestionIndex;
        debugger
        let img = new Image();
         let reader = new FileReader();
         reader.onload = (e)=>{
         img.onload = (e) => {
               let canvas = document.createElement('canvas');
                let maxHeight = 1280;
                let maxWidth = 960;
                let actualHeight = img.height;
                let actualWidth = img.width;
                let imgRatio = actualWidth / actualHeight;
                let maxRatio = maxWidth / maxHeight;
                if (actualHeight > maxHeight || actualWidth > maxWidth) {
                    if (imgRatio < maxRatio) {
                        imgRatio = maxHeight / actualHeight;
                        actualWidth = imgRatio * actualWidth;
                        actualHeight = maxHeight;
                    }
                    else if (imgRatio > maxRatio) {
                        imgRatio = maxWidth / actualWidth;
                        actualHeight = imgRatio * actualHeight;
                        actualWidth = maxWidth;
                    } else {
                        actualHeight = maxHeight;
                        actualWidth = maxWidth;
                    }
                }
                canvas.width = actualWidth;
                canvas.height = actualHeight;
                let ctx = canvas.getContext("2d").drawImage(img, 0, 0, actualWidth, actualHeight); 
            list[index].image =  canvas.toDataURL("image/png");
            let currentState = {
                list: list,
                currentQuestionIndex: index,
                isDelete: this.state.isDelete,
                isDeleteChoice: this.state.isDeleteChoice
            }
            this.setState(currentState)
            QuestionList.updateList(currentState);
        }
        img.src = e.target.result;
         }
         reader.readAsDataURL(e.target.files[0]) 
    }
    //setting current question on click of left side pane
    setCurrentQuestion(index) {
        let list = this.state.list;
        let currentState = {
            list: list,
            currentQuestionIndex: index,
             isDelete: this.state.isDelete,
            isDeleteChoice: this.state.isDeleteChoice
        }
        this.setState(currentState)
         QuestionList.updateList(currentState);
    }
    // putting into delete mode on left pane
    deleteState() {
        let list = this.state.list;
        let currentState = {
            list: list,
            currentQuestionIndex: this.state.currentQuestionIndex,
            isDelete: true,
            isDeleteChoice: this.state.isDeleteChoice
        }
        this.setState(currentState);
    }
    //cancelling delete mode on left pane
    cancelDeleteState() {
        let list = this.state.list;
        let currentState = {
            list: list,
            currentQuestionIndex: this.state.currentQuestionIndex,
            isDelete: false,
            isDeleteChoice: this.state.isDeleteChoice
        }
        this.setState(currentState);
    }
    // putting delete mode for the choices
     deleteChoiceState() {
        let list = this.state.list;
        let currentState = {
            list: list,
            currentQuestionIndex: this.state.currentQuestionIndex,
            isDelete: this.state.isDelete,
            isDeleteChoice: true
        }
        this.setState(currentState);
    }
    //cancelling delete mode for the choices
    cancelDeleteChoiceState() { 
        let list = this.state.list;
        let currentState = {
            list: list,
            currentQuestionIndex: this.state.currentQuestionIndex,
            isDelete: this.state.isDelete,
            isDeleteChoice: false
        }
        this.setState(currentState);
    }

    //delete item from list
    deleteFromList(index) {
        let list = this.state.list;
        list.splice(index, 1);
        let currentState = {
            list: list,
            currentQuestionIndex: index == this.state.currentQuestionIndex ? (index - 1) < 0 ? 0 : index - 1 : this.state.currentQuestionIndex,
            isDelete:list.length == 0? false : this.state.isDelete,
              isDeleteChoice: list.length == 0? false : this.state.isDeleteChoice
        }
        this.setState(currentState);
        QuestionList.updateList(currentState);
    }

    //delete item from choices
    deleteFromChoices(optionIndex, e) {
        let list = this.state.list;
        let currentList = list[this.state.currentQuestionIndex]
        currentList.choices.splice(optionIndex, 1);
        list[this.state.currentQuestionIndex] = currentList;
        let currentState = {
            list: list,
            currentQuestionIndex: this.state.currentQuestionIndex,
            isDelete: this.state.isDelete,
              isDeleteChoice: this.state.isDeleteChoice
        }
        this.setState(currentState);
        QuestionList.updateList(currentState);
    }
    // opening side panel on lower resolutions
    openSideMenu(e) {
        let leftPane = document.getElementById("leftPane");
        leftPane.style.transform = "translateX(0)"
        let delegate = function(e) {debugger
            if(e.target.nodeName.toLowerCase() != "button" && e.target.nodeName.toLowerCase() != "i"){
            leftPane.style.transform = "translateX(-100%)"
            document.removeEventListener("click", delegate);
            }
        }
        document.addEventListener("click", delegate);
    }
    render() {
        return <div className = "wrapper" >
            <div id = "leftPane"
        className = "col-md-4 col-lg-4 col-sm-4 col-xs-8 left-pane" > < QuestionAdder state = { this.state }
        parent = { this }
        addNewQuestion = { this.addNewQuestion }/></div >
        <div className = "col-md-8 col-lg-8 col-sm-8 col-xs-12 col-sm-offset-4 col-md-offset-4 col-lg-offset-4 right-pane" > < QuestionAuthorizer state = { this.state }
        parent = { this }/></div >
        </div>;
    }
};