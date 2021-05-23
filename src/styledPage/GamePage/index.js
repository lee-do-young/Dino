import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { WebView } from 'react-native-webview';
// const myHtmlFile = require("./index.html");

const myHtmlFile = `<head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <title>Endless Background</title>

        <style>
            body {
                margin: 0;
                padding: 0;
                overflow: hidden;
            }
        </style>
    </head>

    <body>
        
    <script type="text/javascript" src="./main.js"></script></body>`;
// class MyWeb extends Component {
//   render() {
//     return (
//       <WebView source={myHtmlFile} />
//     );
//   }
// }



function GamePage({ navigation }){

  return <WebView source={{uri: 'http://dylee-test.woobi.co.kr/'}} />
}

export default GamePage;