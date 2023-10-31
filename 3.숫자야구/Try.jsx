import React, { memo } from 'react';

const Try = memo(({ tryInfo }) => {
	console.log('자식 컴포넌트 리렌더링 테스트');

	return (
		<li>
			<b>{tryInfo.try}</b> - {tryInfo.result}
		</li>
	);
});

// memo 사용시 개발자도구에서 컴포넌트 이름이 바뀌는것을 방지
Try.displayName = 'Try';

export default Try;
