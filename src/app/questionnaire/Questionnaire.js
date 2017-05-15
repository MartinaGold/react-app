import React, {Component} from 'react';
import QuestionnaireRepository from './questionnaire-repository/QuestionnaireRepository';
import * as _ from 'lodash';

class Questionnaire extends Component {

    constructor(props) {
        super(props);
        this.favoriteActivities = QuestionnaireRepository.getFavoriteActivities();
        this.ageCategories = QuestionnaireRepository.getAgeCategories();
        this.defaultActivities = this.favoriteActivities.under18;

        this.state = {
            firstName: '',
            surname: '',
            gender: 'man',
            favoriteActivities: this.defaultActivities,
            ageCategories: this.ageCategories,
            ageCategory: this.ageCategories[0].value,
            activity: ''
        };
    }

    render() {
        return (
            <div className="questionnaire-container">
                <div>
                    <div className="col-md-offset-2 col-md-8 container questionnaire-form">
                        <button className="pull-right close-button"
                                onClick={this.props.handleChangeViewTo.bind(this, 'Home')}>
                            <span className="glyphicon glyphicon-remove"></span>
                        </button>
                        <h1 className="questionnaire-title">Dotazník</h1>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="row">
                                <div className="col-xs-offset-2 col-xs-8 col-md-offset-2 col-md-4 margin-top-xs">
                                    <div className="personal-data">
                                        <label className="pull-left" htmlFor="name">Jméno <span
                                            className="required-field">*</span></label>
                                        <input type="text" id="name" className="form-control"
                                               value={this.state.firstName}
                                               onChange={this.handleSetFirstName.bind(this)}/>
                                    </div>
                                </div>

                                <div className="col-xs-offset-2 col-xs-8 col-md-offset-0 col-md-4 margin-top-xs">
                                    <div className="personal-data">
                                        <label className="pull-left" htmlFor="surname">Příjmení <span
                                            className="required-field">*</span></label>
                                        <input type="text" id="surname" className="form-control"
                                               value={this.state.surname}
                                               onChange={this.handleSetSurname.bind(this)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div
                                    className="col-xs-offset-2 col-xs-8 col-md-offset-2 col-md-4 margin-top margin-top-xs">
                                    {this.renderSelectForAgeCategories()}
                                </div>
                                <div className="col-xs-8 col-xs-offset-2 col-md-offset-0 col-md-4
                                    margin-top text-left margin-top-xs">
                                    <div>
                                        <label>Pohlaví <span className="required-field">*</span></label>
                                        <div className="text-left radio gender-checkbox">
                                            <label htmlFor="gender-man" className="radio-inline">
                                                <input type="radio" name="inlineRadioOptions" id="gender-man"
                                                       value="man" checked={this.state.gender === 'man'}
                                                       onChange={this.handleSetGender.bind(this)}/>
                                                <span>Muž</span>
                                            </label>
                                            <label htmlFor="gender-woman" className="radio-inline">
                                                <input type="radio" name="inlineRadioOptions" id="gender-woman"
                                                       value="woman" checked={this.state.gender === 'woman'}
                                                       onChange={this.handleSetGender.bind(this)}/>
                                                <span>Žena</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-offset-2 col-md-8 col-xs-offset-2 col-xs-8
                            text-left margin-top margin-top-xs">
                                    {this.renderSelectForFavoriteActivities()}
                                </div>
                            </div>
                            <input type="submit" className="btn sending-button" disabled={this.isDisabled.call(this)}
                                    value="Odeslat formulář">
                            </input>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    handleSetFirstName(event) {
        this.setState({firstName: event.target.value});
    }

    handleSetSurname(event) {
        this.setState({surname: event.target.value});
    }

    handleSetGender(event) {
        this.setState({gender: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const answer = this.prepareAnswer();

        QuestionnaireRepository.submitAnswer(answer).then(() => {
            this.props.handleChangeViewTo('FinalMessage');
        }).catch(() => alert('Something is wrong!'));
    }

    prepareAnswer() {
        return {
            firstName: this.state.firstName,
            surname: this.state.surname,
            activity: this.state.activity,
            gender: this.state.gender,
            ageCategory: this.state.ageCategory
        }
    }

    renderSelectForAgeCategories() {
        return (
            <div className="text-left">
                <label>Věková kategorie <span className="required-field">*</span></label>
                <div className="age-categories">
                    <select className="form-control" onChange={this.changeAgeOption.bind(this)}>
                        {this.state.ageCategories.map((ageCategory, index) => {
                            return <option key={index} value={ageCategory.value}>{ageCategory.plaintext}</option>;
                        })}
                    </select>
                </div>
            </div>


        );
    }

    changeAgeOption(event) {
        const selectedFavoriteActivities = this.favoriteActivities[event.target.value];
        this.defaultActivities = selectedFavoriteActivities;
        this.setState({
            ageCategory: event.target.value,
            favoriteActivities: selectedFavoriteActivities
        });
    }

    renderSelectForFavoriteActivities() {
        return (
            <div>
                <label>Oblíbená činnost</label>
                <input type="text" list="whisperer-list" className="form-control" value={this.state.activity}
                       onChange={this.handleChangeActivity.bind(this)}/>
                {this.renderWhisperer()}
            </div>
        );
    }

    handleChangeActivity(event) {
        const searchedActivity = event.target.value;
        const result = _.filter(this.defaultActivities, (value) => {
            return value.toLowerCase().indexOf(searchedActivity.toLowerCase()) !== -1;
        });

        this.setState({
            activity: searchedActivity,
            favoriteActivities: result
        });
    }

    renderWhisperer() {
        return (
            <datalist id="whisperer-list" className="whisperer">
                {this.state.favoriteActivities.map((activity, index) => {
                    return <option key={index} onClick={this.setActivity.bind(this, activity)}>{activity}</option>;
                })}
            </datalist>

        )
    }

    setActivity(activity) {
        this.setState({activity});
    }

    isDisabled() {
        return !this.state.firstName.length || !this.state.surname.length || !this.state.gender.length;
    }

}

export default Questionnaire;