const React = require('react');
const { useState, useRef } = React;

const Gugudan = () => {
	const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
	const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
	const [value, setValue] = useState('');
	const [result, setResult] = useState('');
	const inputRef = useRef(null);

	const onSubmit = (e) => {
		e.preventDefault();

		if (parseInt(value) === first * second) {
			setFirst(Math.ceil(Math.random() * 9));
			setSecond(Math.ceil(Math.random() * 9));
			setValue('');
			setResult((prevResult) => {
				return prevResult + ' 정답~!';
			});
			inputRef.current.focus();
		} else {
			setValue('');
			setResult('땡!');
			inputRef.current.focus();
		}
	};

	const onChange = (e) => {
		setValue(e.target.value);
	};

	return (
		<React.Fragment>
			<div>
				{first} 곱하기 {second}는?
			</div>

			<form onSubmit={onSubmit}>
				<input ref={inputRef} type='number' value={value} onChange={onChange} placeholder='정답 입력' />
				<button type='submit'>입력</button>
			</form>

			<div>{result}</div>
		</React.Fragment>
	);
};

module.exports = Gugudan;
