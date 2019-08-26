import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
var sinon = require('sinon');

import Counter from '../components/counter';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });



// beforeEach(function () { clock = sinon.useFakeTimers(); });
// afterEach(function () { clock.restore(); });




// it('running test Counter', () => {


//     const wrapper = shallow(<Counter   InputedCharCount={0}  />);
// var inst= wrapper.instance()
//     testValues(wrapper, '0', '0');
//     wrapper.setProps({ InputedCharCount: 1 });
//     inst.render();
//    // testValues(wrapper, '0', '1');
//     clock.now+=2000;//add two second 
//     inst.render();
//     wrapper.setProps({ InputedCharCount: 2 });
    
//     testValues(wrapper, '0', '1');//two char in 2 sec equals 60 character in minute

//     wrapper.setProps({ InputedCharCount: 3 });
//     testValues(wrapper, '0', '2');//speed and inputedCharCount mast be set in 0 
//     inst.render();
//     currentSpeed = inst.GetSpeed();
//     expect(currentSpeed).toBe(60);//Event current speed sended

// });

// describe('Counter Snapshot', () => {
//     it('should render correctly', () => {

//         const wrapper = shallow(
//             <Counter InputedCharCount={0} />
//         );

//         expect(shallowToJson(wrapper)).toMatchSnapshot();
//     });
// });