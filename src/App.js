import React from 'react';

import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Navigation />
        <Footer />
      </div>
    );
  }
}

