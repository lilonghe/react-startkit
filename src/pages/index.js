import React,{ Component } from 'react';
import styles from "./index.styl";
import styles2 from './index.css';
import style3 from '../index.styl';

export default class Test extends Component {
    render() {
        return (
            <div>
               
                <p className={styles.title}>Hello World!</p>
                <p className={styles2.title}>WOW</p>
                <p className={style3.age}>22</p>
            </div>
        );
    }

}