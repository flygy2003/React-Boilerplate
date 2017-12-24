import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from 'react-router-dom'
import Layout from "./components/Layout.jsx";
import './stylsheet.scss'

const app = document.getElementById('app');

ReactDOM.render(
  <Router>
    <Layout/>
  </Router>,
  app
);
