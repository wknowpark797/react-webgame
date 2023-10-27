import React, { Component } from 'react';

class TryClass extends Component {
	render() {
		return (
			<li>
				<b>{this.props.item.fruit}</b> - {this.props.item.taste}
			</li>
		);
	}
}

export default TryClass;
