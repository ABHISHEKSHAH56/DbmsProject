// scroll bar
import 'simplebar/src/simplebar.css';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//for titile 
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from "react-redux";
import store from "../src/redux/store";
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
//
import App from './App';

import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import AuthProvider from './hooks/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};


ReactDOM.render(
  <Provider store={store}>
    <AlertProvider {...options} template={AlertTemplate}>
      <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
        <ThemeConfig>
          <ScrollToTop />
          <GlobalStyles />
          <BaseOptionChartStyle />
          <Routes>
            <Route path='/*' element={<App />} />
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
          </Routes>
        </ThemeConfig>         
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);
