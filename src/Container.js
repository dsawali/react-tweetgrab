import React, { Component } from 'react';

export default class Container extends Component {
    render() {
      return(
        <div className="display-row">
          <SearchBox />
          <OptionBox />
        </div>
      );
    }
  }
  
  class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({query: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        alert('Query is : ' + this.state.query);
    }

    render() {
      return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <input type="text" className="search-box" onChange={this.handleChange} value={this.state.value} />
            </form>
        </div>
      );
    }
  }
  class OptionBox extends Component {
    constructor(props) {
      super(props);
      this.state = {
        context: 'hashtag'
      };
      this.handleChange = this.handleChange.bind(this);
    //   this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({context: event.target.value}, () => {
            console.log(this.state.context);
        });
    }

    render() {
      return (
        <div>
          <select className="search-context" onChange={this.handleChange} value={this.state.value}>
            <option value="hashtag">hashtag</option>
            <option value="user">user</option>
            <option value="text">text</option>
          </select>
        </div>
      );
    }
  }
