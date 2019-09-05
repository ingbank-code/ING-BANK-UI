import React,{Component} from 'react';
import { shallow } from 'enzyme';;
import Login from '../../Components/Login/Login'
import { resolve } from 'q';
describe('when the login component is called',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper=shallow(<Login loading={false}/>);
        console.log("inside before each state", wrapper.state())
    });
    it('should render the render method',()=>{
        expect(wrapper).toHaveLength(1);
    });
   
    describe ('when the onChange event is not triggered on the customerIdfield',()=>{
        it('should have an empty state',()=>{
            console.log("state inside login",wrapper.state())
            expect(wrapper.state().customerId).toEqual('');
        });
    });
    describe('when the onchange event is triggered on the emailId field',()=>{
        beforeEach(()=>{
            const customerId=wrapper.find('#customerId');
            customerId.simulate('change', { target: { id: "customerId", value: '12345' } });
        });
        it('should update the state',()=>{
            console.log(wrapper.state())
            expect(wrapper.state().customerId).toEqual('12345');
        });
    });
   
    // describe('When loading is true', () => {
    //     it('should have called handle submit function', () => {
    //       const comp = shallow(<Login loading={true} />);
    //         expect(comp.find('LoadingSpinner')).toHaveLength(1)
    //     });
    //   });
    describe('When first button is cliked', () => {
        it('should have called handle submit function', () => {
          const comp = shallow(<Login />);
          const spy = jest.spyOn(comp.instance(), 'handleSubmit');
          comp.instance().forceUpdate();
          comp.find('#submit').simulate('click',{
            preventDefault: () => {
            },
            validate: ()=>{
                return true
            },
            getData: ()=>{
            }

           });
          expect(spy).toHaveBeenCalled();
        });
      });



})

