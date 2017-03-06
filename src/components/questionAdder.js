import React, { Component } from 'react';
import QuestionList from "./questionlist";

export default class QuestionAdder extends Component {
     constructor(props){ 
        super(props);  
    } 
   
    render () {
        return <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
           
            {
                this.props.parent.state.list.length == 0 &&
                <h4> There are no questions added yet. </h4>
                
            }
            { 
                 this.props.parent.state.list.length > 0 &&
                 <div className="wrapper">
                     <div className="heading">Select your questions </div>
                      <ol id="questionList"  className="list"> 
                 { 
                    this.props.state.list.map((item, index) =>{
                        return  <li className={(this.props.state.currentQuestionIndex == index ? 'selected question-list'  : 'question-list')}  key={index}>
                            <span onClick={this.props.parent.setCurrentQuestion.bind(this.props.parent, index)}>{item.question}</span>
                            {
                                this.props.state.isDelete &&
                                <i onClick={this.props.parent.deleteFromList.bind(this.props.parent, index)} className="glyphicon glyphicon-remove"></i>
                            }
                            </li>
                    })  
                 }
                 </ol>
                 </div>
            }
            <div className="buttons">
                <button className="btn btn-primary" onClick={this.props.addNewQuestion.bind(this.props.parent)}>Add</button>

                { !this.props.state.isDelete && this.props.state.list.length > 0 &&
                <button className="btn btn-primary" onClick={this.props.parent.deleteState.bind(this.props.parent)}>Delete</button>
                }
                {this.props.state.isDelete &&
                <button className="btn btn-primary" onClick={this.props.parent.cancelDeleteState.bind(this.props.parent)}>Cancel</button>
                }
            </div>
            </div>;
    }

}