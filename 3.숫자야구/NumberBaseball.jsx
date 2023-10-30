import React, { useState } from 'react';
import Try from './Try';

const getNumbers = () => {
	const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // 서로 다른 숫자 4개 랜덤 뽑기
	const array = [];

	for (let i = 0; i < 4; i++) {
		const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
		array.push(chosen);
	}

	return array;
};

const NumberBaseball = () => {
	const [result, setResult] = useState('');
	const [value, setValue] = useState('');
	const [answer, setAnswer] = useState(getNumbers);
	const [tries, setTries] = useState([]);

	const onSubmitForm = (e) => {
		e.preventDefault();

		if (value === answer.join('')) {
			// 정답
			setResult('홈런~!');
			setTries((prevTries) => {
				return [...prevTries, { try: value, result: '홈런~!' }];
			});
			alert('게임을 다시 시작합니다.');
			setValue('');
			setAnswer(getNumbers());
			setTries([]);
		} else {
			// 오답
			const answerArray = value.split('').map((val) => parseInt(val)); // 배열 변환
			let strike = 0;
			let ball = 0;

			if (tries.length >= 9) {
				// 10번 이상 오답일 때
				setResult(`10번 이상 틀려서 실패! 정답은 ${answer.join(',')} 였습니다!`);
				alert('게임을 다시 시작합니다.');
				setValue('');
				setAnswer(getNumbers());
				setTries([]);
			} else {
				// 스트라이크, 볼 처리 로직
				for (let i = 0; i < 4; i++) {
					if (answerArray[i] === answer[i]) {
						strike++;
					} else if (answer.includes(answerArray[i])) {
						ball++;
					}
				}
				setValue('');
				setTries((prevTries) => {
					return [...prevTries, { try: value, result: `${strike} 스트라이크, ${ball} 볼 입니다.` }];
				});
			}
		}
	};

	const onChangeInput = (e) => {
		setValue(e.target.value);
	};

	return (
		<>
			<h1>{result}</h1>
			<form onSubmit={onSubmitForm}>
				<input maxLength={4} value={value} onChange={onChangeInput} />
			</form>

			<div>{tries.length}번 시도하셨습니다.</div>

			<ul>
				{tries.map((val, idx) => {
					return <Try key={`${idx + 1}차 시도:`} tryInfo={val} index={idx} />;
				})}
			</ul>
		</>
	);
};

export default NumberBaseball;
