import React from 'react';
import ReactDOM from 'react-dom';

import SeasonDisplay from './SeasonDisplay';
import Spinner from "./Spinner";

class App extends React.Component {

    //--> Doesn't belong to React but it belongs to javascript class, so anytime this class instance is created
    // constructor method will be called automatically before anything else called.
    //--> we are calling constructor function here because we are extending react component so this base-class(i.e. React component) has a constructor function of its own which goes through some amount of setup or has some code inside of it to setup real component for us, so when we define constructor function we are overridding base class method functions but we still wants all other methods get called in sequence we call this super method.
    constructor (props){
        super(props);
        this.state = { lat: null , errMsg: ''};
    }

    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition((pos)=>{this.setState({lat: pos.coords.latitude})},(err)=>{this.setState({errMsg:err.message})});
    }
    // React says we have to define render method!
    render(){

            if (this.state.errMsg && !this.state.lat) {
                return <div>Error: {this.state.errMsg}</div>
            }

            if (!this.state.errMsg && this.state.lat) {
                return  <SeasonDisplay lat={this.state.lat} />
            }

            return <Spinner/>
    }
}

ReactDOM.render(<App/>,document.querySelector('#root'));