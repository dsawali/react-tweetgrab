import React, { Component } from 'react';

document.addEventListener("DOMContentLoaded", function (event) {
    window.twttr = (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
            t = window.twttr || {};
        if (d.getElementById(id)) return t;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function (f) {
            t._e.push(f);
        };

        return t;
    }(document, "script", "twitter-wjs"));
});

export default class Container extends Component {
    render() {
        return (
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
        this.setState({ query: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        // alert('Query is : ' + this.state.query);
        let searchData = { "searchData": this.state.query };
        fetch('/search', {
            method: 'POST',
            body: JSON.stringify(searchData),
            headers: { "Content-Type": "application/json" }
        }).then((response) => {
            return response.json();
        }).then((responseJson) => {
            const numberRegex = /^[0-9]*$/;
            let id = responseJson.id;
            if (id.match(numberRegex)) {
                createTweet(id);
            } else {
                alert(id);
            }
        });
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
    }

    handleChange(event) {
        this.setState({ context: event.target.value });
        let optionData = { "optionData": event.target.value };
        fetch('/option', {
            method: 'POST',
            body: JSON.stringify(optionData),
            headers: { "Content-Type": "application/json" }
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

function createTweet(id) {
    let wrapperClass = document.getElementById('tweet-wrapper');
    let containerId = 'tweet-' + (document.getElementsByClassName('tweet-container')).length;

    //Create new div element
    let tweetContainer = document.createElement('div');
    tweetContainer.class = 'tweet-container';
    tweetContainer.id = containerId;

    //To prepend
    wrapperClass.insertBefore(tweetContainer, wrapperClass.childNodes[0]);

    twttr.widgets.createTweet(id,
        document.getElementById(containerId),
        {
            width: '407px',
            align: 'center'
        });


}
