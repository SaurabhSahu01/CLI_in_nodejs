#!/usr/bin/env node
const axios = require('axios');
const json = require('../package.json');
const program = require('commander');
const mod = require('./languages');

// command to translate the language 
program.command('translate').description('translate into the given language').action(() => {
  let lang = process.argv[3];
  let string = takeString();
  const encodedParams = new URLSearchParams();
  encodedParams.append("q", `${string}`);
  encodedParams.append("target", `${lang}`);
  encodedParams.append("source", "en");

  const options = {
    method: 'POST',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
      'X-RapidAPI-Key': '28d650c3f5mshbada86932d263d4p17604ajsncf6fc384286e'
    },
    data: encodedParams
  };
  let res = axios.request(options).then((response) => {
    let res = response.data;
    console.log(res.data.translations[0].translatedText);
  }).catch((error) => {
    console.log("There occured some error!");
  });
});

// command to show the available list of langugages
program.command('list').description('shows the list of all available languages').action(()=>{
    mod.showLang();
});

// function to take the string
function takeString(){
    let string = "";
    for(let i =4; i<process.argv.length;i++){
        string += process.argv[i];
    }
    return string;
}
program.parse(process.argv);
