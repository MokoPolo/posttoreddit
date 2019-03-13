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
      alertColor: "primary",
      repostBtnDisabled: true,
      refreshToken: null,
      myDog: false
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount() {
    // If localstorage item exists use refresh token to get access token
    // set refresh token
    const storageRefreshToken = localStorage.getItem("refreshToken");
    this.setState({
      myDog: true
    });
    alert(this.state.myDog);
    if (storageRefreshToken) {
      this.setState({
        refreshToken: storageRefreshToken
      });
      this.getRefreshToken();
    } else {
      const parsed = queryString.parse(this.props.location.search);

      if (parsed !== null && parsed.code) {
        this.getAccessToken(parsed.code);
      } else {
        this.setState({
          postBtnDisabled: true,
          loginBtnDisabled: false,
          repostBtnDisabled: true
        });
      }
    }
  }

  async getAccessToken(accessCode) {
    try {
      const code = accessCode;
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
        const shit = json.refresh_token;
        //alert(json.access_token);
        //alert(shit);
        localStorage.setItem("refreshToken", shit);

        this.setState({
          accessToken: json.access_token,
          refreshToken: json.refresh_token,
          postBtnDisabled: false,
          loginBtnDisabled: true,
          alertMessage: "Login successful move to step 2",
          alertVisible: true
        });
      }
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  }

  async getRefreshToken() {
    try {
      const data = {
        grant_type: "refresh_token",
        refresh_token: this.state.refreshToken
      };

      const settings = {
        method: "POST",
        body: queryString.stringify(data),
        headers: {
          Authorization:
            "Basic cWFCd1JfLWtnb2NQcUE6U2xWN3RHYXJ4MlA0NXE2SFNNLXBNRm4yc0ZZ",
          "Content-Type": "application/x-www-form-urlencoded"
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

        // Message to login again
        // enable 1st button
      } else {
        const json = await response.json();
        this.setState({
          accessToken: json.access_token,
          postBtnDisabled: true,
          loginBtnDisabled: true
        });
        this.postComment();
      }
      // this.postComment();
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  }

  onDismiss() {
    this.setState({ alertVisible: false });
  }
  // Post comment to reddit api
  async postComment() {
    const parentId = "t3_9whek6";
    const text =
      "**Alliance%20Name**%3A%20eXtreme%20Force%0A%0A**Description**%3A%20A%20semi-competitive%20alliance%20that%20runs%20daily%20lvl%2065%2B%20Ultimus%20VI%20raids%20to%2060%25%20completion.%20It%E2%80%99s%20an%20organised%20raid%2C%20with%20Strike%20Teams%20and%20Lanes%20pre-identified%20for%20each%20member.%20All%20time-zones%20welcome.%0A%0A**Requirements**%3A%0A%0A**Account%20Level**%3A%2070%0A%0A**Collection%20Power**%3A%201M%2B%0A%0A**Strongest%20Team**%3A%20175K%2B%0A%0A**Minimum%20Damage%20Ultimus%2065%2B**%3A%202%20million%20%0A%0A**Minimum%20Damage%20other%20raids**%3A%202%20million%0A%0A**Donation%20daily%20minimum**%3A%2010k%0A%0A**Daily%20Activity%20is%20a%20must%20(in-game%20and%20Discord)**%0A%0A**How%20to%20Apply**%3A%20%20Msg%20Spitfire_UK%239620%20on%20Discord.%0A%0A**Additional%20Notes**%3A%20Thanos%20III%20T2%2C%20DP%20En%20Fuego%20T2%2C%20Alpha%20T1%2C%20Beta%20III%20T1";
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
      const currentdate = new Date();
      this.setState({
        alertVisible: true,
        alertMessage:
          "Posted to Reddit at " +
          currentdate.getHours() +
          ":" +
          currentdate.getMinutes(),
        alertColor: "success",
        postBtnDisabled: true,
        repostBtnDisabled: false
      });
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm="4">
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
          <Col sm="4">
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
          <Col sm="4">
            <Card body>
              <CardTitle>2. Repost to reddit</CardTitle>
              <CardText>
                Repost to the MSF alliance recruitment subreddit.
                <br />
              </CardText>
              <Button
                disabled={this.state.repostBtnDisabled}
                onClick={() => this.getRefreshToken()}
              >
                Repost now
              </Button>
              <Button
                onClick={() => alert(localStorage.getItem("refresh_token"))}
              >
                View cookie
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
