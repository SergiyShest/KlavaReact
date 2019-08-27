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

let currentSpeed = null;
function updateResult(value) {
    currentSpeed = value;
}


var clock;

//test values speed and inputedCharCount
function testValues(wrapper, speed, count) {
    var textSpeed = wrapper.find('#speed').text().match(/\d+/)[0].toString();
    var textCount = wrapper.find('#inputedCharCount').text().match(/\d+/)[0].toString();
    expect(textSpeed.toString()).toBe(speed.toString());
    expect(textCount.toString()).toBe(count.toString());

}

beforeEach(function () { clock = sinon.useFakeTimers(); });
afterEach(function () { clock.restore(); });



// it('Complex test Counter', () => {


//     const wrapper = shallow(<Counter InputedCharCount={0}  />);
//     const inst = wrapper.instance();
//     testValues(wrapper, '0', '0');
//     wrapper.setProps({ InputedCharCount: 1 });
//     testValues(wrapper, '0', '1');
//     clock.now+=2000;//add two second 
//     wrapper.setProps({ InputedCharCount: 2 });
//     testValues(wrapper, '60', '2');//two char in 2 sec equals 60 character in minute
//     inst.Stop();
//     wrapper.setProps({ InputedCharCount: 3 });
//      clock.now+=2000;//add two second 
//     testValues(wrapper, '60', '3');//now counter stoped 

//    var currentSpeed = inst.GetSpeed();
//     expect(currentSpeed).toBe(60);//Fixed current speed 

//     inst.Start();
//     wrapper.setProps({ InputedCharCount: 0 });
//     wrapper.setProps({ InputedCharCount: 1 });
//     testValues(wrapper, '0', '1');
//     clock.now += 1000;//add  second 
//     wrapper.setProps({ InputedCharCount: 2 });
//     testValues(wrapper, '120', '2');//two char in 2 sec equals 60 character in minute

// });

it('running test Counter', () => {
    const wrapper = shallow(<Counter   InputedCharCount={0}  />);
    var inst= wrapper.instance()
    testValues(wrapper, '0', '0');
    wrapper.setProps({ InputedCharCount: 1 });
   // testValues(wrapper, '0', '1');
    clock.now+=2000;//add two second 
    wrapper.setProps({ InputedCharCount: 2 });
    testValues(wrapper, '0', '1');//two char in 2 sec equals 60 character in minute
    clock.now+=2000;
    wrapper.setProps({ InputedCharCount: 3 });
    testValues(wrapper, '0', '2');//speed and inputedCharCount mast be set in 0 
    currentSpeed = inst.GetSpeed();
    expect(currentSpeed).toBe(60);//Event current speed sended

});

describe('Counter Snapshot', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <Counter InputedCharCount={0} />
        );
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});