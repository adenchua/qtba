import { BrowserRouter, Switch, Route } from "react-router-dom";
import CapabilityPage from "./pages/CapabilityPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/:platformId/:capabilityId' component={CapabilityPage} />
        <Route path='/' component={LandingPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
