import React, { useState } from 'react';
import useInterval from './useInterval';

const rspCoords = {
	바위: '0',
	가위: '-142px',
	보: '-284px',
};

const scores = {
	바위: 0,
	가위: 1,
	보: -1,
};

const computerChoice = (imgCoord) => {
	return Object.entries(rspCoords).find(function (v) {
		return v[1] === imgCoord;
	})[0];
};

const Rsp = () => {
	const [result, setResult] = useState('');
	const [imgCoord, setImgCoord] = useState(rspCoords.바위); // 좌표
	const [score, setScore] = useState(0);
	const [isRunning, setIsRunning] = useState(true);

	/*
	const interval = useRef();
	useEffect(() => {
		interval.current = setInterval(changeHand, 100);

		return () => {
			clearInterval(interval.current);
		};
	}, [imgCoord]);
	// imgCoord가 바뀔 때마다 useEffect 실행
	// -> 매번 clearInterval을 하기 때문에 그냥 setTimeout을 하는 것과 동일
	*/

	const changeHand = () => {
		if (imgCoord === rspCoords.바위) {
			setImgCoord(rspCoords.가위);
		} else if (imgCoord === rspCoords.가위) {
			setImgCoord(rspCoords.보);
		} else if (imgCoord === rspCoords.보) {
			setImgCoord(rspCoords.바위);
		}
	};

	useInterval(changeHand, isRunning ? 100 : null);

	const onClickBtn = (choice) => () => {
		// 멈췄을 때 재클릭 방지
		if (isRunning) {
			setIsRunning(false);

			const myScore = scores[choice];
			const cpuScore = scores[computerChoice(imgCoord)];
			const diff = myScore - cpuScore;

			if (diff === 0) {
				setResult('비겼습니다!');
			} else if ([-1, 2].includes(diff)) {
				setResult('이겼습니다!');
				setScore((prevScore) => prevScore + 1);
			} else {
				setResult('졌습니다!');
				setScore((prevScore) => prevScore - 1);
			}

			setTimeout(() => {
				setIsRunning(true);
			}, 1000);
		}
	};

	return (
		<>
			<div
				id='computer'
				style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}
			></div>

			<div>
				<button id='rock' className='btn' onClick={onClickBtn('바위')}>
					바위
				</button>
				<button id='scissor' className='btn' onClick={onClickBtn('가위')}>
					가위
				</button>
				<button id='paper' className='btn' onClick={onClickBtn('보')}>
					보
				</button>
			</div>
			<div>{result}</div>
			<div>현재 {score}점</div>
		</>
	);
};

export default Rsp;
