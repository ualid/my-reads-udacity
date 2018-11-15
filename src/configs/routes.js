import { Route, Link } from 'react-router-dom';
import App from '../App';
import Search from '../components/Search';

const routes = (
    <Route path='/' component={App}>
         <IndexRoute component={App}/>
         <Route path='/search' component={Search} />
    </Route>
);

export default routes;