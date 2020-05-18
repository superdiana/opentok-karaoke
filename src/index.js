import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { CSSReset, ThemeProvider, theme } from "@chakra-ui/core";
import App from './components/App';
import FirebaseProvider from './contexts/firebase';
import "../node_modules/video-react/dist/video-react.css";

ReactDOM.render(
  <FirebaseProvider>
    <Router>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <App />
      </ThemeProvider>
    </Router>
  </FirebaseProvider>,
  document.getElementById('root')
);