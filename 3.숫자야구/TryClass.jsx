import React, { PureComponent } from 'react';

class TryClass extends PureComponent {
	render() {
		console.log('자식 컴포넌트 리렌더링 테스트');
		const { tryInfo } = this.props;

		return (
			<li>
				<b>{tryInfo.try}</b> - {tryInfo.result}
			</li>
		);
	}
}

export default TryClass;
