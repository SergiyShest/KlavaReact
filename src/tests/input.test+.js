import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
var sinon = require('sinon');

import klavaInput from '../components/klavaInput.jsx';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
var Example = 'Test pen';
var Inputed = 'Test p';

let errorCount = 0;
function errorCounter() {
    console.log('ErrorSended');
    errorCount++;
}
let nextCalled = false;
function next() {
    console.log('nextSended');
    nextCalled = true;
}

let nextChar = '';
function setNextChar(value) {
    console.log('NextChar=' + value);
    nextChar = value;
}

describe('klavaInput Snapshot', () => {
    it('should render correctly', () => {

        const wrapper = shallow(
            <klavaInput Example={Example} Inputed={Inputed} />
        );
     
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});

describe('klavaInput text', () => {
    it('should by correctly', () => {

        const wrapper = shallow(
            <klavaInput
                Example={Example}
                Inputed={Inputed}
                error={errorCounter}
                next={next}
                ok={setNextChar} />
        );
        const inst = wrapper.instance();
        wrapper.setProps({ Inputed: 'Test pE' });//set lact char err
        console.log(inst);
         //console.log(wrapper.find('#okText'));
        var okText = inst.state.okText;
        console.log(okText);
        //var erText = wrapper.find('#erText').text();
        //var notInptText = wrapper.find('#notInptText').text();

        //expect(okText).toBe('Test p');
        //expect(notInptText).toBe('E');
        //expect(erText).toBe('en');
    });
});


//describe('klavaInput Test Events', () => {


//    it('error should by sended ', () => {

//        const wrapper = shallow(
//            <klavaInput
//                Example={Example}
//                Inputed={Inputed}
//                error={errorCounter}
//                next={next}
//                ok={setNextChar} />
//        );
//        errorCount = 0;
//        wrapper.setProps({ Inputed: "Test pE" });//last char error

//        //process.nextTick(() => {
//        //    expect(errorCount).toBe(1);
//        //});
//        wrapper.setProps({ Inputed: "Test pEr" });//last 2 char error
//        //process.nextTick(() => {
//        //    expect(errorCount).toBe(1);
//        //});//errors count dont changed


//    });

//    it('next should by sended ', () => {

//        const wrapper = shallow(
//            <klavaInput
//                Example={Example}
//                Inputed={Inputed}
//                error={errorCounter}
//                next={next}
//                nextChar={setNextChar} />
//        );
//        nextCalled = false;
//        wrapper.setProps({ Inputed: 'Test pen' });//inputed to end
//        //process.nextTick(() => {
//        //    expect(nextCalled).toBe(true);
//        //});
//        console.log(nextChar);

//    });


//});