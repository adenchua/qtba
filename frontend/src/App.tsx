import { BrowserRouter, Switch, Route } from "react-router-dom";
import ModulePage from "./pages/ModulePage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/:platformId/:moduleId' component={ModulePage} />
        <Route path='/' component={LandingPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
