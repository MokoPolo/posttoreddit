import React, { Component } from 'react';
import * as qs from 'query-string';

export class Msf extends Component {
    displayName = Msf.name


    async componentDidMount() {
        console.log(location.search);
        const parsed = qs.parse(location.search);
        console.log(parsed);

        if (parsed !== null){
        try {
            const response = await fetch(`https://www.reddit.com/api/v1/access_token`);
            if (!response.ok){
                throw Error(response.statusText);
            }
            const json = await response.json();
            this.setState({ data: json });
        }
        catch (error){
            console.log(error);
        }
    }
    }   
    render() {
        console.log(this.props.location);
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