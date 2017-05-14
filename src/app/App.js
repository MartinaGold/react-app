import React, {Component} from 'react';
import Questionnaire from './questionnaire/Questionnaire';
import FinalMessage from './final-message/FinalMessage';
import Home from './home/Home';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentView: 'Home'
        };
    }

    render() {
        return (
            <div className="App">
                {this.getCurrentView()}
            </div>
        );
    }

    getCurrentView() {
        const View = this.getViewFor(this.state.currentView);
        return <View handleChangeViewTo={this.handleChangeViewTo.bind(this)}/>;
    }

    getViewFor(viewName) {
        const availableViews = {
            Questionnaire,
            Home,
            FinalMessage
        };
        return availableViews[viewName];
    }

    handleChangeViewTo(to) {
        this.setState({currentView: to});
    }

}

export default App;
