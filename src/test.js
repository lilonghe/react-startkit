import React,{ Component } from 'react';
import styles from "./test.styl";
export default class Test extends Component {
	render() {
		console.log(styles);
		return (
			<div>
			
				<p className={styles.title}>This is dynamic page.</p>
			</div>
		)
	}

}