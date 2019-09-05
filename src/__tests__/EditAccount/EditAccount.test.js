import React,{Component} from 'react';
import { shallow } from 'enzyme';;

import CreateAccount from '../../Components/CreateAccount/CreateAccount';
import EditAccount from '../../Components/EditAccount/EditAccount';
describe('when the login component is called',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper=shallow(<EditAccount history={}/>);
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
    describe('When first button is cliked', () => {
        const comp = shallow(<EditAccount />);
        it('should have called handle submit function', () => {
          
          const spy = jest.spyOn(comp.instance(), 'handleEdit');
          comp.instance().forceUpdate();
          comp.find('#savebutton').simulate('click',{
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
        it('should have called handle submit function', () => {
            const spy = jest.spyOn(comp.instance(), 'handleDelete');
            comp.instance().forceUpdate();
            comp.find('#deletebutton').simulate('click',{
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

