import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { expect as chaiEx } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Input from '../Input';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
describe('Test Props', () => {
  beforeEach(() => {
    wrapper = shallow(<Input
      name="email"
      label="E-mail"
      type="email"
      placeholder="E-mail"
      rounded
      required
    />);
  });
  it('name = email ', () => {
    chaiEx(wrapper.prop('name')).to.equals('email');
  });
  it('label = E-mail ', () => {
    chaiEx(wrapper.prop('label')).to.equals('E-mail');
  });
  it('type = email ', () => {
    chaiEx(wrapper.prop('type')).to.equals('email');
  });
  it('placeholder = E-mail ', () => {
    chaiEx(wrapper.prop('placeholder')).to.equals('E-mail');
  });
  it('rounded = True ', () => {
    chaiEx(wrapper.prop('rounded')).to.ok;
  });
  it('required = True ', () => {
    chaiEx(wrapper.prop('required')).to.ok;
    expect(wrapper).toMatchSnapshot();
  });
});
