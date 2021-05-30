import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import GameFieldPage from './gameField/gameFieldPage';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';

import { StartGamePage } from './home';
import gameActions from './store/actions';


function App(props) {

  const history = createBrowserHistory();
  let routes;

  if (props.game) {
    routes = (
      <Switch>
        <Route exact path='/game'><GameFieldPage /></Route>
        <Route exact path='/start'><StartGamePage /></Route>
        <Redirect to="/game" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route exact path='/start'><StartGamePage /></Route>
        <Redirect to="/start" />
      </Switch>
    )
  }

  useEffect(() => {
    props.checkIsGameActive();
  }, [props]);

  return (
    <Router history={history}>
      <main>
        {routes}
      </main>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    game: state.gameId ? true : false
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkIsGameActive: () => dispatch(gameActions.checkIsGameActive()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);