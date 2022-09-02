import Dashboard from "./Components/Dashboard";
import { isAuthenticated } from './helpers/isAuthenticated'
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import { useState } from "react";
import Notfound from "./Components/Notfound/Notfound";
import { Switch, Route } from "react-router";
function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const changeLogin = () => {
    setLoggedIn(!loggedIn)
  }

  if (!isAuthenticated())
    return (
      <Switch>
        <Route exact path="/" component={AdminLogin} />
        <Route component={Notfound} />
      </Switch>
    )
  else return <Dashboard />


  // if (true)
  //   return (
  //     <Dashboard />
  //   );
  // else
  //   return (
  //     <AdminLogin changeLogin={changeLogin} />
  //   );
}

export default App;
