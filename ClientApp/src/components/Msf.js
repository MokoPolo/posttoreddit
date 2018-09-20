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

             // this.getPrefs();
             this.postComment();
        }
         catch (error) {
             console.log("error");
            console.log(error);
        }
        }
    }   

    
    async postComment () {
        const parentId = 't3_8wd05c';
        const text = '%2A+Alliance+Name%3A+eXtreme+Force%0D%0A%0D%0A%2A+Description%3A+members+ranging+from+90-150k%2C+daily+participation%2C+chill+group+of+people+from+around+the+world.+%2A+Requirements%3A+90k%2B+ST+600+raid+tickets+daily%2C+daily+raid+participation.%0D%0A%0D%0A%2A+Contact+Details%3A+Spitfire_UK%239620+on+discord%0D%0A%0D%0A%2A+Additional+Notes%3A+T3+rewards+on+Ultimus+V+Raid.+T1%2F2+DP+En+Fuego+%26+Thanos+III+Raids';
        const settings = {
            method: 'POST',
            headers: {
                Authorization: 'bearer ' + this.state.accessToken
            }
        };
        console.log('about to call fetch on ' + 'https://oauth.reddit.com/api/comment?api_type=json&thing_id=' + parentId + '&text=' + text);
        const response = await fetch('https://oauth.reddit.com/api/comment?api_type=json&text=foobar&thing_id=' + parentId + '&text=' + text, settings);

/*
headers : {
                  'User-Agent' : 'fooBot/0.1 by USERNAME',
                }
                */
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
scope=submit&
duration=permanent">1. Log into reddit</a>



{/* querystring ex msf?state=djdfjdfjkaf&code=5QJH8IIL6U2GLr2YKBrum9rpehM
double check state
use code to get bearer token */}
        </div>
      );
    }
  }