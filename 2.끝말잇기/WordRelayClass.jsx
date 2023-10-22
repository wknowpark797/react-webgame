const React = require('react');
const { Component } = React;

class WordRelayClass extends Component {
	state = {
		text: 'Hello webpack',
	};

	render() {
		return <div>{this.state.text}</div>;
	}
}

module.exports = WordRelayClass;
