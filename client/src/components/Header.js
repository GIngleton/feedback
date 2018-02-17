import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  //renderContent determines what content to display in the ul depending on the auth state (logged in/out, pending)
  renderContent() {
    // this.props.auth can only be one of 3 values: null, true, false
    // user model is available in this.props.auth
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="2" style={{ margin: ' 0 10px' }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="3">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }

  render() {
    return (
      <nav className="indigo accent-2">
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo"
          >
            Feedback
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
    // 'Link' tag allows navigation to a different route rendered by react-router
    // if user is logged in (auth object present), navigate to: /surveys , if logged out, navigate to: /
    // to={this.props.user ? '/surveys' : '/'} : evaluates whether expression is truthy and decides accordingly
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
