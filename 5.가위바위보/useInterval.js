import { useRef, useEffect } from 'react';

/*
  [ 사용법 ]
  const [isRunning, setRunning] = useState(true);
  useInterval(() => {
    // 내용이 1초마다 반복되어 실행
    // delay가 null일 경우 실행 중지
  }, isRunning ? 1000 : null);
*/

function useInterval(callback, delay) {
	const savedCallback = useRef();

	useEffect(() => {
		savedCallback.current = callback;
	});

	useEffect(() => {
		// 미묘한 타이밍 delay 문제 발생 방지
		// callback이 바뀌어도 새로 setInterval이 안되지만 최신 callback 참조 가능 (useRef)
		function tick() {
			savedCallback.current();
		}

		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);

	return savedCallback.current;
}

export default useInterval;
