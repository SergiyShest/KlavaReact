import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
var sinon = require('sinon');

import klavaInput from '../components/klavaInput.jsx';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
var Example = 'Test pen';
var Inputed = 'Test p';

describe('klavaInput Snapshot', () => {
    it('should render correctly', () => {

        const wrapper = shallow(
            <klavaInput Example={Example} Inputed={Inputed} />
        );
        console.log(wrapper);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});


describe('klavaInput Test Events', () => {
 let errorCount = 0;
    function errorCounter() {
            errorCount++;
        }
        let nextColled = false;
        function next() {
            nextColled=true;
        }

        let nextChar = '';
        function setNextChar(value) {
            nextChar = value;
        }

    it('error should by sended ', () => {

        const wrapper = shallow(
            <klavaInput
                Example={Example}
                Inputed={Inputed}
                error={errorCounter}
                next={next}
                ok={setNextChar} />
        );
        errorCount = 0;
        wrapper.setProps({ Inputed: "Test px" });//last char error
       // expect(errorCount).toBe(1);
        wrapper.setProps({ Inputed: "Test pxx" });//last 2 char error
        expect(errorCount).toBe(1);//errors dont changed
      //  console.log(wrapper);
     //   expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});