import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import ActivityCreate from "./components/ActivityCreate";
import Detail from "./components/Detail";
import Error404 from "./components/Error404";
import Admin from "./components/Admin";
function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/activitiesCreate' component={ActivityCreate} />
        <Route exact path='/countries/:id' component={Detail} />
        <Route exact path='/admin' component={Admin} />
        <Route path='*' component={Error404} />
      </Switch>
    </div>
  );
}

export default App;
