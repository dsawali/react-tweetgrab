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
    constructor(props){
        super(props);
        this.state = {
            option: 'hashtag'
        }
        this.getOption = this.getOption.bind(this);
        this.sendQuery = this.sendQuery.bind(this);
    }

    getOption(event){
        this.setState({ option: event.target.value });
    }

    sendQuery(queryTest){
        const queryData = { "searchData": queryTest, "optionData": this.state.option };
        fetch('/search', {
            method: 'POST',
            body: JSON.stringify(queryData),
            headers: { "Content-Type": "application/json" }
        }).then((response) => {
            return response.json();
        }).then((responseJson) => {
            const numberRegex = /^[0-9]*$/;
            const id = responseJson.id;
            if (id.match(numberRegex)) {
                createTweet(id);
            } else {
                alert(id);
            }
        });
    }

    render() {
        return (
            <div className="display-row">
                <SearchBox sendQuery={this.sendQuery}/>
                <OptionBox getOption={this.getOption}/>
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
        this.handleEvent = this.handleEvent.bind(this);
    }

    handleEvent(event){
        switch(event.type){
            case "change":
                return this.setState({ query: event.target.value });
            case "submit":
                event.preventDefault();
                return this.props.sendQuery(this.state.query);
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleEvent}>
                    <input type="text" className="search-box" onChange={this.handleEvent} value={this.state.value} />
                </form>
            </div>
        );
    }
}
class OptionBox extends Component {
    render() {
        return (
            <div>
                <select className="search-context" onChange={this.props.getOption}>
                    <option value="hashtag">hashtag</option>
                    <option value="user">user</option>
                    <option value="text">text</option>
                </select>
            </div>
        );
    }
}

function createTweet(id) {
    const wrapperClass = document.getElementById('tweet-wrapper');
    const containerId = 'tweet-' + (document.getElementsByClassName('tweet-container')).length;

    //Create new div element
    const tweetContainer = document.createElement('div');
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
