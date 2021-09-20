import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Authors from './components/Authors';
import BookAuthor from './components/BookAuthor';
import Books from './components/Books';
import Home from './components/Home'
import GlobalContext from './contexts/GlobalContext';

function App() {
  return (
    <GlobalContext>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/authors" component={Authors} />
          <Route exact path="/book-author" component={BookAuthor} />
        </Switch>
      </Router>
    </GlobalContext>
  );
}

export default App;
