import { render, screen } from '@testing-library/react';
import App from './App';
import { shallow } from 'enzyme'

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

test('renders title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Last 5 callers/i);
  expect(linkElement).toBeInTheDocument();
});

// There would be more tests here to ensure UI looks appropriately when there's data available
// and when there's no data available to show