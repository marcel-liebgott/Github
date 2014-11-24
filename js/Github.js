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
		getCommits: function(user, repo, branche){
			var _branche = '';

			if(typeof branche !== "undefined" && branche !== null && branche !== ""){
				_branche = '?sha=' + branche;
			}else{
				_branche = '';
			}

			$.ajax({
				url: "https://api.github.com/repos/" + user + "/" + repo + "/commits" + _branche, 
				success: function(result){
					if(typeof result !== "undefined"){
						$.each(result, function(key, value){
							$('#repo_name').html(repo);
							$('#commit').append("<li><span id='key'>Sha: </span>" + value.sha + "</li>");
							$('#commit').append("<li><span id='key'>Datum: </span>" + value.commit.author.date + "</li>");
							$('#commit').append("<li><span id='key'>URL: </span>" + value.html_url + "</li>");
							$('#commit').append("<li><span id='key'>E-Mail:</span>" + value.commit.author.email + "</li>");
							$('#commit').append("<li><span id='key'>Name: </span>" + value.commit.author.name + "</li>");
							$('#commit').append("<li><span id='key'>Nachricht: </span>" + value.commit.message + "</li>");
						});
					}
				}
			});
		},

		getRepositories: function(user){
			$.ajax({
				url:  'https://api.github.com/users/' + user + '/repos',
				success: function(result){
					var html = "";

					$.each(result, function(key, value){
						html += "<a id='repo' href='" + value.html_url + "' title='" + value.name + "'>" + value.name + "</a>";
					});

					$('#repos').html(html);
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
		 */
		getUser: function(user){
			$.ajax({
				url: "https://api.github.com/users/" + user,
				success: function(data){
					$('#user_avatar').attr('src', data.avatar_url);
					$('#user_login').html(data.login);
					$('#user_url').attr('href', data.html_url);
					$('#user_info').html("Follower: " + data.followers + "<br>Following: " + data.following + "<br>Repositories: " + data.public_repos);
				}
			});
		}
	};
})(jQuery);
