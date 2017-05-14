import React, {Component} from 'react';

class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <button className="btn-lg launching-button "
                        onClick={this.props.handleChangeViewTo.bind(this, 'Questionnaire')}>
                    Spustit dotazník
                </button>
            </div>
        )
    }
}

export default Home;