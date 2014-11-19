/**
 * @author Marcel Liebgott <marcel@mliebgott.de>
 * @since 1.00
 *
 * this jQuery plugin communcate with github.com and return some informations like user, repository, ...
 *
 * @require jQuery
 */
(function($){
	var commits = [];

	$.Github = {
		/**
		 * @author Marcel Liebgott <marcel@mliebgott.de>
		 * @since 1.00
		 *
		 * get github user
		 *
		 * @param {String} user name
		 * @param {String} repository name
		 * @param {String} brance
		 * @return {Array} commits
		 */
		getCommits: function(user, repo, branche = ''){
			var _branche = '';

			if(typeof branche !== "undefined" && branche !== null && branche !== ""){
				branche = '?sha=' + branche;
			}
			$.ajax({
				url: "https://api.github.com/repos/" + user + "/" + repo + "/commits" + branche, 
				dataType: 'jsonp',
				success: function(result){
					if(typeof result.data !== "undefined"){
						$.each(result.data, function(key, value){
console.log(value);
							var sha = value.sha;
							var url = value.html_url;
							
							$.each(value.commit, function(c_key, c_value){
								var date = c_value.date;
								var email = c_value.email;
								var name = c_value.name;

								var msg = c_value.message;

								var commit = {
									sha: sha,
									url: url,
									date: date,
									email: email,
									name: name,
									msg: msg
								};
					
								commits.push(commit);
							});
						});
					}

					console.log(commits);
				}
			});
		},
		
		/**
		 * @author Marcel Liebgott <marcel@mliebgott.de>
		 * @since 1.00
		 *
		 * get githib user
		 *
		 * @param {String} user name
		 * @return {Array} user
		 */
		getUser: function(user){
			$.ajax({
				url: "https://api.github.com/users/" + user,
				dataType: "jsonp",
				success: function(data){
					console.log(data);
				}
			});
		}
	}
})(jQuery);
