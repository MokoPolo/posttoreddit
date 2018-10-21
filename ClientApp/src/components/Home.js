import React, { Component } from "react";

export class Home extends Component {
  displayName = Home.name;
    async componentDidMount() {
        //const response = await fetch('https://www.omdbapi.com/?s=batman&y=&plot=short&r=json');

        //if (!response.ok) {
        //    alert('bad');
        //    //this.setState({
        //    //    alertVisible: true,
        //    //    alertMessage: `Error has occurred statuscode: ${response.status}`,
        //    //    alertColor: 'danger'
        //    //});
        //    //throw Error(response.statusText);
        //}
        //else {
        //    const movies = await response.json();
        //    alert('good');
        //    //this.setState({
        //    //    accessToken: json.access_token,
        //    //    refreshToken: json.refresh_token,
        //    //    postBtnDisabled: false,
        //    //    loginBtnDisabled: true,
        //    //    alertMessage: 'hi',
        //    //    alertVisible: true
        //    //});
        //}

        //alert("out of fetch");
    }

  render() {
    return (
      <div>
        <h1>home</h1>
      </div>
    );
  }
}
