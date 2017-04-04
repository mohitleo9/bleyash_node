import React from 'react';
import AutoSuggestBase from 'react-autosuggest';

class AutoSuggest extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      suggestions: []
    };
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
  }
  onSuggestionsFetchRequested({ value }){
    const input = value;
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
      className: 'form-control'
    };
    return (
      <AutoSuggestBase
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
};

AutoSuggest.propTypes = {
  value: React.PropTypes.any.isRequired,
  onChange: React.PropTypes.func.isRequired,
  getSuggestions: React.PropTypes.func,
};

export default AutoSuggest;

