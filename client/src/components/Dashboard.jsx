import React, { Component } from 'react';
import ContainersList from './ContainersList';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  };

　componentDidMount() {
  }

  render () {
    return (
      <div>
        <ContainersList />
      </div>
    );
  };
};