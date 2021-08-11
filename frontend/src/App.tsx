import { BrowserRouter, Switch, Route } from "react-router-dom";
import ModulePage from "./pages/ModulePage";
import LandingPage from "./pages/LandingPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/platforms/:platformSlug/:moduleSlug' component={ModulePage} />
        <Route path='*' component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
