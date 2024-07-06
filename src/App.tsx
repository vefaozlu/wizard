import "primeicons/primeicons.css"; // icons
import "primereact/resources/primereact.min.css"; // core css
import "primereact/resources/themes/saga-blue/theme.css"; // or any other theme
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.scss";

import { WizardContextProvider } from "./Components/Wizard/context/WizardContextProvider";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WizardContextProvider />} />
      </Routes>
    </Router>
  );
}

export default App;
