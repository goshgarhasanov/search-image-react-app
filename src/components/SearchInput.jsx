import React, { Component } from 'react';

class SearchInput extends Component {

    constructor(props) {
        super(props);
        this.state = { entry: '' }
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    onFormSubmit(event) {
        event.preventDefault();
        this.props.onSearchSubmit(this.state.entry);
    }

    render() {
        return (
            <div className="ui segment">
                <form className="ui form" onSubmit={this.onFormSubmit} >
                    <div className="field">
                        <div className="ui massive icon input">
                            <input type="text" placeholder="Search to ..." onChange={(e) => {
                                this.setState({ entry: e.target.value });
                            }} value={this.state.entry} />
                            <i className="search icon"></i>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default SearchInput;