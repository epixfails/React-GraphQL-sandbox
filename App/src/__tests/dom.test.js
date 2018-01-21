import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CategorySelect } from '~/components/InputForm/components/CategorySelect';

configure({ adapter: new Adapter() });

describe('<CategorySelect />', () => {
  it('should render CategorySelect', () => {
    const renderedComponent = shallow(
      <CategorySelect categories={[1, 2, 3]} />,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
