import React from 'react';
import { render, screen } from '@testing-library/react';
//import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import { AppContextProvider } from "./store/context-reducer";
import { BrowserRouter } from "react-router-dom";
import App from './App';

const AppIndex = () => (
  <AppContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppContextProvider>
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppIndex />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('renders login page', () => {
  render(<AppIndex />);
  const linkElement = screen.getByText(/Sisäänkirjautuminen/i);
  expect(linkElement).toBeInTheDocument();
});

/*it('renders correctly', () => {
  const tree = renderer.create(<AppIndex />).toJSON();
  expect(tree).toMatchSnapshot();
});*/
