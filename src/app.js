import React,{ Component } from 'react';
import { asyncComponent } from './AsyncComponent'

const Test = asyncComponent(() => import('./test'));

export default class App extends Component {
	render() {
		return (
			<div>
			This is app.
			<Test />
			</div>
		)
	}
}