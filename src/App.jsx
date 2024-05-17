// App.js
import { Provider } from "react-redux";
import store from "./store/configure-store";
import Dashboard from "./components/Dashboard";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function App() {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="App">
          <Dashboard />
        </div>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
