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
   
})

