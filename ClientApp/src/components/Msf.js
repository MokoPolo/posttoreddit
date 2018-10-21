import React, { Component } from "react";
import queryString from "querystring";
import { Card, Button, CardTitle, CardText, Row, Col, Alert } from "reactstrap";

export class Msf extends Component {
  displayName = Msf.name;

  constructor(props) {
    super(props);
    this.state = {
      postBtnDisabled: true,
      loginBtnDisabled: false,
      alertVisible: false,
      alertMessage: "",
      alertColor: "primary"
    };

    this.onDismiss = this.onDismiss.bind(this);
  }
  async componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);

    // If user logged into reddit then we have to capture token information
    if (parsed !== null && parsed.code) {
      try {
        const code = parsed.code;
        const authCode = "authorization_code";
        const data = {
          grant_type: authCode,
          code: code,
          redirect_uri: "http://www.hackandslash.net/msf"
        };

        const settings = {
          method: "POST",
          body: queryString.stringify(data),
          headers: {
            Authorization:
              "Basic cWFCd1JfLWtnb2NQcUE6U2xWN3RHYXJ4MlA0NXE2SFNNLXBNRm4yc0ZZ",
            "Content-Type": "application/x-www-form-urlencoded"
            //"User-Agent": "afs"
          }
        };

        const response = await fetch(
          `https://www.reddit.com/api/v1/access_token`,
          settings
        );
        if (!response.ok) {
          this.setState({
            alertVisible: true,
            alertMessage: `Error has occurred statuscode: ${response.status}`,
            alertColor: "danger"
          });
          //throw Error(response.statusText);
        } else {
          const json = await response.json();
          this.setState({
            accessToken: json.access_token,
            refreshToken: json.refresh_token,
            postBtnDisabled: false,
            loginBtnDisabled: true,
            alertMessage: "Login successful move to step 2",
            alertVisible: true
          });
        }
        // this.postComment();
      } catch (error) {
        console.log("error");
        console.log(error);
      }
    }
  }
  onDismiss() {
    this.setState({ alertVisible: false });
  }
  // Post comment to reddit api
  async postComment() {
    const parentId = "t3_8wd05c";
    const text =
      "%2A+Alliance+Name%3A+eXtreme+Force%0D%0A%0D%0A%2A+Description%3A+members+ranging+from+110-160k%2C+daily+participation%2C+chill+group+of+people+from+around+the+world.+%2A+Requirements%3A+120k%2B+ST+600+raid+tickets+daily%2C+daily+raid+participation.%0D%0A%0D%0A%2A+Contact+Details%3A+Spitfire_UK%239620+on+discord%0D%0A%0D%0A%2A+Additional+Notes%3A+T3+rewards+on+Ultimus+V+Raid.+T1%2F2+DP+En+Fuego+%26+Thanos+III+Raids";
    const settings = {
      method: "POST",
      headers: {
        Authorization: "bearer " + this.state.accessToken
      }
    };
    const response = await fetch(
      "https://oauth.reddit.com/api/comment?api_type=json&text=foobar&thing_id=" +
        parentId +
        "&text=" +
        text,
      settings
    );
    console.log(response);
    if (!response.ok) {
      this.setState({
        alertVisible: true,
        alertMessage: `Operation failed. Statuscode: ${response.status}`,
        alertColor: "danger"
      });
      //throw Error(response.status);
    } else {
      this.setState({
        alertVisible: true,
        alertMessage: "Operation was a success",
        alertColor: "success"
      });
    }
  }

  //async getPrefs() {
  //  try {
  //    const settings = {
  //      headers: {
  //        Authorization: "bearer " + this.state.accessToken
  //      }
  //    };
  //    const response = await fetch(
  //      `https://oauth.reddit.com/api/v1/me/prefs/`,
  //      settings
  //    );
  //    if (!response.ok) {
  //      throw Error(response.statusText);
  //    }
  //    const json = await response.json();

  //    console.log("showing response.json in getPrefs()");
  //    console.log(json);
  //  } catch (e) {
  //    console.log("error");
  //    console.log(e);
  //  }
  //}
  render() {
    return (
      <div>
        <Row>
          <Col sm="6">
            <Card body>
              <CardTitle>1. Log into reddit</CardTitle>
              <CardText>
                Authenticate with reddit so we can post to reddit in step 2.
              </CardText>
              <Button
                disabled={this.state.loginBtnDisabled}
                href="https://www.reddit.com/api/v1/authorize?client_id=qaBwR_-kgocPqA&response_type=code&state=djdfjdfjkaf&redirect_uri=http://www.hackandslash.net/msf&scope=submit&duration=permanent"
              >
                Log into reddit
              </Button>
            </Card>
          </Col>
          <Col sm="6">
            <Card body>
              <CardTitle>2. Post to reddit</CardTitle>
              <CardText>
                Post to the MSF alliance recruitment subreddit.
                <br />
              </CardText>
              <Button
                disabled={this.state.postBtnDisabled}
                onClick={() => this.postComment()}
              >
                Post now
              </Button>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Alert
              color={this.state.alertColor}
              isOpen={this.state.alertVisible}
              toggle={this.onDismiss}
            >
              {this.state.alertMessage}
            </Alert>
          </Col>
        </Row>
      </div>
      /* querystring ex msf?state=djdfjdfjkaf&code=5QJH8IIL6U2GLr2YKBrum9rpehM
            double check state
            use code to get bearer token */
    );
  }
}
