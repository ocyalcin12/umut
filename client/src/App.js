import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from './components/Layout';
import NavigationBar from './components/NavigationBar';
import DocumentsList from './components/DocumentsList';
import Companies from './components/Companies';
import DocumentTypes from './components/DocumentTypes';
import EditCompany from './components/EditCompany';
import AddDocument from './components/AddDocument';
import EditDocument from './components/EditDocument';

class App extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <Layout>
          <Router>
            <Switch>
              <Route exact path="/" component={DocumentsList} />
              <Route path="/companies" component={Companies} />
              <Route path="/documentTypes" component={DocumentTypes} />
              <Route path="/editCompany/:id" component={EditCompany} />
              <Route path="/addDocument/" component={AddDocument} />
              <Route path="/editDocument/:id" component={EditDocument} />
            </Switch>
          </Router>
        </Layout>
      </div>
    );
  }
}

export default App;
