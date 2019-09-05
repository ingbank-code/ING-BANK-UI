import React,{Component} from 'react';
import { shallow } from 'enzyme';;

import CreateAccount from '../../Components/CreateAccount/CreateAccount';
import Favourite from '../../Components/Favourite/Favourite';
describe('when the login component is called',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper=shallow(<Favourite/>);
        console.log("inside before each state", wrapper.state())
    });
    it('should render the render method',()=>{
        expect(wrapper).toHaveLength(1);
    });
   
   
    // describe('When loading is true', () => {
    //     it('should have called handle submit function', () => {
    //       const comp = shallow(<Login loading={true} />);
    //         expect(comp.find('LoadingSpinner')).toHaveLength(1)
    //     });
    //   });
    // describe('When first button is cliked', () => {
    //     it('should have called handle submit function', () => {
    //       const comp = shallow(<Favourite />);
    //       const spy = jest.spyOn(comp.instance(), 'handleSubmit');
    //       comp.instance().forceUpdate();
    //       comp.find('#edit').simulate('click',{
    //         preventDefault: () => {
    //         },
    //         validate: ()=>{
    //             return true
    //         },
    //         getData: ()=>{
    //         }

    //        });
    //       expect(spy).toHaveBeenCalled();
    //     });
    //   });



})

