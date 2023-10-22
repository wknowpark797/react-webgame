const path = require('path');

module.exports = {
	name: 'word-relay-setting',
	mode: 'development', // 실서비스: production
	devtool: 'eval',
	resolve: {
		extensions: ['.js', '.jsx'],
	},

	entry: {
		app: './client',
	}, // 입력

	module: {
		rules: [
			{
				test: /\.jsx?/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env', '@babel/preset-react'],
					plugins: ['@babel/plugin-proposal-class-properties'],
				},
			},
		],
	},

	output: {
		// __dirname: 현재 폴더 경로에 dist 생성
		path: path.join(__dirname, 'dist'),
		filename: 'app.js',
	}, // 출력
};

// 'webpack' 명령어로 실행
