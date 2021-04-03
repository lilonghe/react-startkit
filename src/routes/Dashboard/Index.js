import React from 'react';

import Cherry from '../../assets/cherry.svg';
import Circle from '../../assets/circle.svg';
import Pineapple from '../../assets/pineapple.png';

import data from './data.json';

const Index = () => {
    return <div>
        <img src={Cherry} />
        <img src={Circle} />
        <img src={Pineapple} />

        {data.length}
    </div>
}

export default Index;