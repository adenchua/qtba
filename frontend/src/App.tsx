import { BrowserRouter, Switch, Route } from "react-router-dom";

import ModulePageWrapper from "./pages/ModulePageWrapper";
import LandingPage from "./pages/LandingPage";
import ErrorPage from "./pages/ErrorPage";
import PlatformSettingsPage from "./pages/PlatformSettingsPage";
import PlatformsContextProvider from "./components/PlatformsContextProvider";

function App() {
  return (
    <PlatformsContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/platform-settings' component={PlatformSettingsPage} />
          <Route path='/platforms/:platformSlug/:moduleSlug' component={ModulePageWrapper} />
          <Route path='*' component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    </PlatformsContextProvider>
  );
}

export default App;
