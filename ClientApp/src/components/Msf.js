import React, { Component } from 'react';
import queryString from 'querystring';

export class Msf extends Component {
    displayName = Msf.name;

    async componentDidMount() {
        console.log(this.props.location.search);
        const parsed = queryString.parse(this.props.location.search);
        console.log(parsed);

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
                body: JSON.stringify(data),
                headers: {
                    Authorization: 'Basic cWFCd1JfLWtnb2NQcUE6U2xWN3RHYXJ4MlA0NXE2SFNNLXBNRm4yc0ZZ'
                }
            };
            console.log("going in");
            const response = await fetch(`https://www.reddit.com/api/v1/access_token`, settings);
            if (!response.ok){
                throw Error(response.statusText);
            }
            const json = await response.json();
             console.log("showing response.json");
             console.log(json);
            this.setState({ data: json });
        }
         catch (error) {
             console.log("error");
            console.log(error);
        }
    }
  }   
    render() {
      return (
        <div>
          
          <a href="https://www.reddit.com/api/v1/authorize?
client_id=qaBwR_-kgocPqA&
response_type=code&
state=djdfjdfjkaf&
redirect_uri=http://www.hackandslash.net/msf&
scope=identity&
duration=temporary">1. Log into reddit</a>



{/* querystring ex msf?state=djdfjdfjkaf&code=5QJH8IIL6U2GLr2YKBrum9rpehM
double check state
use code to get bearer token */}
        </div>
      );
    }
  }