import React from 'react';
import './App.css';
export class App extends React.Component{

   constructor(props){
       super(props)
       this.state = {
           sceneId:'11124936-31cf-4117-bd08-5ea86f509c19',
           exSize:.5,
           exTime:5000
       };
       this.changeScene = this.changeScene.bind(this);
       this.handleApi = this.handleApi.bind(this);
       }
    componentDidMount(){
       var that = this;

        that.clara = document.getElementById("clara-embed");

        that.claraApi = window.claraplayer(that.clara);

        that.claraApi.sceneIO.fetchAndUse(that.state.sceneId);


       // ***************************Script from Clara.io/docs***************************
        var mode = document.getElementById("mode");
        mode.options[0] = new Option('xyz', 'xyz');
        mode.options[1] = new Option('xy', 'xy');
        mode.options[2] = new Option('xz', 'xz');
        mode.options[3] = new Option('yz', 'yz');
        mode.options[4] = new Option('x', 'x');
        mode.options[5] = new Option('y', 'y');
        mode.options[6] = new Option('z', 'z');
        mode.onchange = function() {
            if (!play.getAttribute('disabled')) create.removeAttribute('disabled');
        };

        var create = document.getElementById('create');
        var play = document.getElementById('play');
        var back = document.getElementById('back');
        var autoExplode;


        that.claraApi.on('loaded', function() {
            create.onclick = createClip();

            play.onclick = playClip();
            play.setAttribute('disabled', true);
            back.onclick = backClip();
            back.setAttribute('disabled', true);
        });

        function createClip() {
            return function(ev) {
                create.setAttribute('disabled', true);
                play.removeAttribute('disabled');
                var explodeMode = mode.options[mode.selectedIndex].value;
                autoExplode = that.claraApi.player.createExplode(explodeMode,"Null",that.state.exSize,that.state.exTime);
                // autoExplode =self.api.player.parseExplodeMode(explodeMode, null, 1)
                return;
            };
        }
        function playClip() {
            return function(ev) {
                back.removeAttribute('disabled');
                play.setAttribute('disabled', true);
                autoExplode.then(result => {
                    that.claraApi.player.animateCameraTo(result.dstCamera, 3000);
                    return that.claraApi.animation.queueClip(result.explodeClipId, {
                        autoplay: true,
                    });
                });
            };
        }
        function backClip() {
            return function(ev) {
                play.removeAttribute('disabled');
                back.setAttribute('disabled', true);
                autoExplode.then(result => {
                    that.claraApi.player.animateCameraTo(result.srcCamera, 3000);
                    return that.claraApi.animation.queueClip(result.explodeClipId, {
                        playSpeed: -1,
                        autoplay: true,
                    });
                });
            };
        }
        // *****************************************************
       }

    render(){



        return(
            <div className="wrapper">

            <div className="largeDiv" id="clara-embed">
             </div>
                <div className="smallDiv">
            <div className="smallContainer"><input className="inpClass" value={this.state.sceneId}  onChange={this.changeScene} />

                <button onClick={this.handleApi}>API</button></div>

                    <div className="smallContainer"><select id="mode" ></select></div>
                    <div className="smallContainer"><button id="create"> Create Explode Clip </button></div>
                    <div className="smallContainer"><button id="play"> play </button></div>
                    <div className="smallContainer"><button id="back"> back </button></div>
                    <div className="smallContainer"><input onChange ={this.handleExSize.bind(this)} value={this.state.exSize} id="exsize" /> Exp Size</div>
                    <div className="smallContainer"><input id="extime" onChange ={this.handleExTime.bind(this)} value={this.state.exTime} /> Exp Time</div>


                </div>

            </div>

        )

    }


    handleApi(){
        this.claraApi.sceneIO.clearScene();

        this.claraApi.sceneIO.fetchAndUse(this.state.sceneId)
    }
    handleExSize(event){
        this.setState({exSize:event.target.value})
    }
    handleExTime(event){
        this.setState({exTime:event.target.value})
    }
    changeScene(event){
        this.setState({
            sceneId:event.target.value
        })



    }



}


