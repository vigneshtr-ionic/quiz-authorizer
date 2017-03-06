import React, { Component } from 'react';
import QuestionList from "./questionlist";

export default class QuestionAuthorizer extends Component {
     constructor(props){ 
        super(props);  
    }  
    render () {
        return <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 right-wrapper">
             <span onClick={this.props.parent.openSideMenu.bind()} className="glyphicon glyphicon-menu-hamburger menu-handle"></span>
            {
                this.props.state.list.length == 0 &&
                <h4> There are no questions added yet. </h4>
                
            }
            { this.props.state.currentQuestionIndex != null && this.props.state.list.length > 0 &&
                 <div className="wrapper"> 
                     <div className="heading"> Design question {this.props.state.currentQuestionIndex + 1} </div>
                     <div className="col-md-12 col-lg-12 col-sm-12 question-container">
                           <label className="col-md-2 col-lg-2 col-sm-3 col-xs-4">Question</label>
                           <input className="col-md-10 col-lg-10 col-sm-9 col-xs-8" type ="text" onChange={this.props.parent.updateQuestion.bind(this.props.parent)} value={this.props.state.list[this.props.state.currentQuestionIndex].question} />
                     </div>
                     {
                         this.props.state.list[this.props.state.currentQuestionIndex].image &&
                         <div className="col-md-12 img-wrapper">
                          <img src ={this.props.state.list[this.props.state.currentQuestionIndex].image}/>
                          </div>
                     }
                    
                     <div className="buttons">
                         <label className="btn btn-primary btn-file">
                           {
                               this.props.state.list[this.props.state.currentQuestionIndex].image &&
                                <span> Change Image</span>
                           } 
                           {
                              ! this.props.state.list[this.props.state.currentQuestionIndex].image &&
                                <span> Add Image</span>
                           } <input type="file" accept="image/*" onChange={this.props.parent.uploadFile.bind(this.props.parent)}/>
                        </label> 
                    </div>
                    <div className="options-container col-md-12 col-lg-12 col-sm-12">
                        { 
                            
                            this.props.state.list[this.props.state.currentQuestionIndex].choices.map((item , index)=>{
                                return   <div className ="col-md-12 col-lg-12 col-sm-12 col-xs-12" key={index}>
                                    <label className="col-md-2 col-sm-3 col-lg-2 col-xs-4">Option {index + 1}</label>
                                    <input  className="col-md-10 col-sm-9 col-lg-10 col-xs-8" type ="text" value={item.value} onChange={this.props.parent.updateOptions.bind(this.props.parent, index)}  />
                                    {
                                    this.props.state.isDeleteChoice &&
                                    <span onClick={this.props.parent.deleteFromChoices.bind(this.props.parent,index)} className="glyphicon glyphicon-remove remove"></span>
                                    }
                                </div>
                            })
                        }
                    </div>
                      <div className="buttons">
                            {
                                this.props.state.list[this.props.state.currentQuestionIndex].choices.length < 6 &&
                                    <button className="btn btn-primary" onClick={this.props.parent.addNewChoiceOption.bind(this.props.parent)}>Add</button>
                            }
                      { !this.props.state.isDeleteChoice &&
                    <button className="btn btn-primary" onClick={this.props.parent.deleteChoiceState.bind(this.props.parent)}>Delete</button>
                    }
                    {this.props.state.isDeleteChoice &&
                    <button className="btn btn-primary" onClick={this.props.parent.cancelDeleteChoiceState.bind(this.props.parent)}>Cancel</button>
                    }
                     </div>
                 </div> 
              
            } 
             </div>;
    }

}