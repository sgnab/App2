import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component{


    componentDidMount(){

    }

    constructor(props){
        super(props)
        this.state={
            sceneId:'7701d932-3b4f-46c4-aead-9f9840027462'
        }

        this.clara = document.getElementById("root");

        this.api = window.claraplayer(this.clara);
        this.api.sceneIO.fetchAndUse(this.sceneId)

    }

    changeScene(event){
        this.setState({

            sceneId:event.target.value
        })

        this.api.sceneIO.clearScene();

    }

    handleApi(){
        this.api.sceneIO.fetchAndUse(this.state.sceneId)
    }



    render(){


        return(

            <div id="root" >

             <input value={this.state.sceneId}  onChange={this.changeScene.bind(this)} />
                <button onClick={this.handleApi.bind(this)}>Submit</button>



            </div>


        )

    }

}


export default App;
