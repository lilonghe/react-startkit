import React,{ Component } from 'react';
import styles from "./index.styl";

export default class Test extends Component {
    render() {
        console.log(styles);
        return (
            <div>
                Hope you have fun.
                <p className={styles.title}>This is dynamic page.</p>
            </div>
        )
    }

}