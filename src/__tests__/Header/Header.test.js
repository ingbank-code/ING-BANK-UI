import React,{Component} from 'react';
import { shallow } from 'enzyme';;
import Header from '../../Components/Header/Header';
describe('when the login component is called',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper=shallow(<Header/>);
    });
    it('should render the render method',()=>{
        expect(wrapper).toHaveLength(1);
    });

    describe('when the onchange event is triggered on the select language',()=>{
        beforeEach(()=>{
            const select=wrapper.find('#select');
            select.simulate('change', { target: { id: "select", value: 'en' } });
            const spy = jest.spyOn(wrapper.instance(), 'selectLang');
            expect(spy).toHaveBeenCalled();
        });
    
    });
   
   
})

