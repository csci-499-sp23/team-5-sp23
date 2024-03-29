import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Navbar from './NavBar';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Router>
        <Navbar />
      </Router>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});