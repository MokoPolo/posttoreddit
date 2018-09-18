import React, { Component } from 'react';
import queryString from 'querystring';
//import snooWrap from 'snoowrap';

export class Msf extends Component {
    displayName = Msf.name;

    async componentDidMount() {
        const parsed = queryString.parse(this.props.location.search);

        if (parsed !== null){
         try {
            const code = parsed.code;
            const authCode = "authorization_code";
            const data = {
                grant_type: authCode,
                code: code,
                redirect_uri: 'http://www.hackandslash.net/msf'
            };

            const settings = {
                method: 'POST',
                body: queryString.stringify(data),
                headers: {
                    Authorization: 'Basic cWFCd1JfLWtnb2NQcUE6U2xWN3RHYXJ4MlA0NXE2SFNNLXBNRm4yc0ZZ',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': 'afs'
                }
            };
            const response = await fetch(`https://www.reddit.com/api/v1/access_token`, settings);
            if (!response.ok){
                throw Error(response.statusText);
            }
            const json = await response.json();
             console.log("showing response.json");
             console.log(json);
             this.setState({ accessToken: json.access_token, refreshToken: json.refresh_token });

             this.getPrefs();
        }
         catch (error) {
             console.log("error");
            console.log(error);
        }
    }
    }   

    async getPrefs() {
        try {
            const settings = {
                headers: {
                    Authorization: 'bearer ' + this.state.accessToken
                }
            };
            const response = await fetch(`https://oauth.reddit.com/api/v1/me/prefs/`, settings);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();

            console.log("showing response.json in getPrefs()");
            console.log(json);
        } catch (e) {
            console.log("error");
            console.log(e);
        }
    }
    render() {
/*         console.log(snooWrap.get)
        const config = {
            client_id: 'qaBwR_-kgocPqA',
            client_secret: process.env.client_secret,
            username: process.env.username,
            password: process.env.password,
            user_agent: 'fsdf'
        };
        const authUrl = snooWrap.getAuthUrl(config) */
      return (
        <div>
          
          <a href="https://www.reddit.com/api/v1/authorize?
client_id=qaBwR_-kgocPqA&
response_type=code&
state=djdfjdfjkaf&
redirect_uri=http://www.hackandslash.net/msf&
scope=identity&
duration=permanent">1. Log into reddit</a>



{/* querystring ex msf?state=djdfjdfjkaf&code=5QJH8IIL6U2GLr2YKBrum9rpehM
double check state
use code to get bearer token */}
        </div>
      );
    }
  }