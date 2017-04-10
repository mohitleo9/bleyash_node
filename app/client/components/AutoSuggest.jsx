import React from 'react';
import AutoSuggestBase from 'react-autosuggest';
import lodash from 'lodash';
import '../assets/css/AutoSuggestion.css';

class AutoSuggest extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      suggestions: [],
    };
    this.isAsync = this.props.getSuggestions && lodash.isFunction(this.props.getSuggestions);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
  }
  getAsyncSuggestions({input}){
    // getSuggestions should look like (input, callback)
    // and callback should be called with (err, suggestions)
    let cb = (err, result) => {
      if (err){
        throw err;
      }
      this.setState({suggestions: result.suggestions});
    };
    this.props.getSuggestions(input, cb);
  }
  getSyncSuggestions({input}){
    const suggestions = this.props.allSuggestions.filter((suggestion) => suggestion.value.toLowerCase().includes(input.toLowerCase()));
    this.setState({suggestions});
  }
  onSuggestionsFetchRequested({ value }){
    const input = value;
    if (this.isAsync){
      this.getAsyncSuggestions({input});
    }
    else {
      this.getSyncSuggestions({input});
    }
  }
  onSuggestionsClearRequested(){
    this.setState({
      suggestions: []
    });
  }
  getSuggestionValue(suggestion){
    return suggestion.value;
  }
  renderSuggestion(suggestion){
    return (
      <span> {suggestion.value} </span>
    );
  }
  render(){
    const inputProps = {
      value: this.props.value,
      onChange: this.props.onChange,
      className: 'form-control',
      placeholder: this.props.placeholder,
    };
    return (
      <AutoSuggestBase
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={this.props.onSuggestionSelected}
      />
    );
  }
};

AutoSuggest.propTypes = {
  value: React.PropTypes.any.isRequired,
  onChange: React.PropTypes.func.isRequired,
  getSuggestions: React.PropTypes.func,
  allSuggestions: React.PropTypes.array,
  placeholder: React.PropTypes.string,
};

export default AutoSuggest;

