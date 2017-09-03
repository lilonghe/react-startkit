import React,{ Component } from 'react';
import asyncComponent from './utils/asyncComponent';

const IndexPage = asyncComponent(() => import(/* webpackChunkName: "index_page" */'./pages/index'));

export default class App extends Component {
	render() {
		return (
			<div>
				<IndexPage />
			</div>
		)
	}
}