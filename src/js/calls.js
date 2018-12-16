import { url } from './constants'
const searchQuery=function (query="a",callback=function(){},onFail=function(){}) {
  	return getCall(
  		`${url.search}?query=${query}&api_key=f3aad5a3c8dd51bc4dc3eda6ecbb6467`,
  		callback,
  		onFail,
  	)
}

const getCall=function(url,callback=function(){},onFail=function(){}){
	const xhttp = new XMLHttpRequest();
  	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4) {
    		if(this.status == 200){
      			try {
	      			callback(JSON.parse(this.responseText));
      			}
      			catch(e){
      				onFail(this.responseText);
      			}
    		}
    		else{
      			onFail(this.responseText);
    		}
    	}
  	};
  	xhttp.open("GET", url, true);
  	xhttp.send();	
}
export {
	searchQuery,
}