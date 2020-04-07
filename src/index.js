import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, theme } from "@chakra-ui/core";
import App from './components/App/App';

const ThemedApp = () => <ThemeProvider theme={theme}> <App /> </ThemeProvider>;

ReactDOM.render(<ThemedApp />,document.getElementById('root'));