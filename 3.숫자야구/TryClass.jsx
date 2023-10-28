import React, { Component } from 'react';

class TryClass extends Component {
	render() {
		return (
			<li>
				<b>{this.props.tryInfo.try}</b> - {this.props.tryInfo.result}
			</li>
		);
	}
}

export default TryClass;
