import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Shop from './Components/Shop/Shop';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Review from './Components/Review/Review';

function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/">
          <Shop></Shop>
        </Route>
        <Route path="/review">
          <Review></Review>
        </Route>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
