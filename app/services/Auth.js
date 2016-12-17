module.exports = {
	save: function(user){
		localStorage.setItem('user', JSON.stringify(user));
	},
	get: function(){
		if( typeof(window) !== "undefined" ){
			var user = localStorage.getItem('user');
			return JSON.parse(user);
		}
	},
	signedIn: function(){
		if(localStorage.getItem('user')) return true;
		else false
	},
	logout: function(){
		localStorage.removeItem('user');
	}

}
