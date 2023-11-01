import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
	const [state, setState] = useState('waiting'); // 배경색 상태 - waiting(파란색), ready(빨간색), now(초록색)
	const [message, setMessage] = useState('클릭해서 시작하세요.');
	const [result, setResult] = useState([]);
	const timeout = useRef(null);
	const startTime = useRef(0);
	const endTime = useRef(0);

	const onClickScreen = () => {
		if (state === 'waiting') {
			timeout.current = setTimeout(() => {
				setState('now');
				setMessage('지금! 클릭!');
				startTime.current = new Date();
			}, Math.floor(Math.random() * 1000) + 2000); // 2초 ~ 3초 랜덤

			setState('ready');
			setMessage('초록색이 되면 클릭하세요.');
		} else if (state === 'ready') {
			// 성급하게 클릭
			clearTimeout(timeout.current);

			setState('waiting');
			setMessage('너무 성급합니다. 초록색이 된 후에 클릭하세요.');
		} else if (state === 'now') {
			// 반응속도 체크
			endTime.current = new Date();

			setState('waiting');
			setMessage('클릭해서 시작하세요.');
			setResult((prevResult) => {
				return [...prevResult, endTime.current - startTime.current];
			});
		}
	};

	const onReset = () => {
		setResult([]);
	};

	const renderAverage = () => {
		// jsx에서 태그없음 = false, undefined, null
		return result.length === 0 ? null : (
			<>
				<div>
					평균 시간:
					{result.reduce((a, c) => a + c) / result.length}ms
				</div>
				<button onClick={onReset}>리셋</button>
			</>
		);
	};

	return (
		<>
			<div id='screen' className={state} onClick={onClickScreen}>
				{message}
			</div>
			{renderAverage()}
		</>
	);
};

export default ResponseCheck;
