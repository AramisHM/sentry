/*eslint getsentry/jsx-needs-il8n:0*/
import DocumentTitle from 'react-document-title';
import React from 'react';

import ConfigStore from '../../stores/configStore';
import Footer from '../../components/footer';
import Header from '../../components/header';
import HookStore from '../../stores/hookStore';
import ListLink from '../../components/listLink';

const Admin = React.createClass({
  getInitialState() {
    // Allow injection via getsentry et all
    let hooksManage = [];
    HookStore.get('admin:sidebar:manage').forEach((cb) => {
      hooksManage.push(cb());
    });

    return {
      hooksManage: hooksManage,
    };
  },

  getTitle() {
    return 'Sentry Admin';
  },

  render() {
    let urlPrefix = ConfigStore.get('urlPrefix');

    return (
      <DocumentTitle title={this.getTitle()}>
        <div className="app">
          <Header />
          <div className="container">
            <div className="content">
              <div className="row">
                <div className="col-md-2">
                  <h6 className="nav-header">System</h6>
                  <ul className="nav nav-stacked">
                    <ListLink index={true} to="/manage/">Overview</ListLink>
                    <ListLink index={true} to="/manage/buffer/">Buffer</ListLink>
                    <li><a href={`${urlPrefix}/manage/queue/`}>Queue</a></li>
                    <li><a href={`${urlPrefix}/manage/status/environment/`}>Environment</a></li>
                    <li><a href={`${urlPrefix}/manage/status/packages/`}>Packages</a></li>
                    <li><a href={`${urlPrefix}/manage/status/mail/`}>Mail</a></li>
                    <ListLink to="/manage/settings/">Settings</ListLink>
                    <li><a href={`${urlPrefix}/manage/status/warnings/`}>Warnings</a></li>
                  </ul>

                  <h6 className="nav-header">Manage</h6>
                  <ul className="nav nav-stacked">
                    <ListLink to="/manage/organizations/">Organizations</ListLink>
                    <ListLink to="/manage/projects/">Projects</ListLink>
                    <ListLink to="/manage/users/">Users</ListLink>
                    {this.state.hooksManage}
                  </ul>
                </div>
                <div className="col-md-10">
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
});

export default Admin;
