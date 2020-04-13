import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, theme } from "@chakra-ui/core";
import AppWrapper from './components/App';

ReactDOM.render(
    <Router>
      <ThemeProvider theme={theme}>
        <AppWrapper />
      </ThemeProvider>
    </Router>,
  document.getElementById('root')
);