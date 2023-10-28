import React, { Component } from 'react';

class TryClass extends Component {
	render() {
		const { tryInfo } = this.props;

		return (
			<li>
				<b>{tryInfo.try}</b> - {tryInfo.result}
			</li>
		);
	}
}

export default TryClass;
