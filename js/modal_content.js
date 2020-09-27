function searchMovies() {
	$('.preloader-wrapper').addClass('active');

	$.ajax({
		url: 'https://www.omdbapi.com/',
		type: 'GET',
		dataType: 'JSON',
		data: {
			apikey: 'aa46ad84',
			s: $('#movies-title').val()
		},
		success: function(data) {
			$('#movies-list').empty();

			if (data.Response == 'True') {
				data.Search.forEach(function(item) {
					let poster = item.Poster;
					if (item.Poster == 'N/A') {
						poster = 'img/no_image_available.jpg';
					}

					$('#movies-list').append('<div class="col m4 s12"><div class="card"><div class="card-image"><img src="' + poster + '"><a class="btn-floating halfway-fab waves-effect waves-light brown darken-1 modal-trigger" data-target="movie-detail" data-id="' + item.imdbID + '"><i class="material-icons">add</i></a></div><div class="card-content"><span class="card-title">' + item.Title + '</span></div></div></div>');
				});
			} else {
      	$('#movies-list').append('<div class="content-center"><div class="alert">' + data.Error + '</div></div>');
			}

			$('#movies-title').val('');
			$('#movies-list').css('margin-top', '-9rem');
			$('.preloader-wrapper').removeClass('active');
		}
	});
}

$('#movies-search').on('click', function() {
	searchMovies();
});
$('#movies-title').on('keyup', function(event) {
	if (event.keyCode == 13) {
		searchMovies();
	}
});

$('#movies-list').on('click', '.modal-trigger', function() {
	$('#movie-detail .progress').removeClass('hide');
	$.ajax({
		url: 'https://www.omdbapi.com/',
		type: 'GET',
		dataType: 'JSON',
		data: {
			apikey: 'aa46ad84',
			plot: 'full',
			i: $(this).data('id')
		},
		success: function(data) {
			let poster = data.Poster;
			let plot = '';
			let tbody = '';

			if (data.Poster == 'N/A') {
				poster = 'img/no_image_available_circled.jpg';
			}
			if (data.Plot != 'N/A') {
				plot += '<p class="center">' + data.Plot + '</p>';
			}
			if (data.Actors != 'N/A') {
				tbody += '<tr><td>Actors</td><td>' + data.Actors + '</td></tr>';
			}
      if (data.Director != 'N/A') {
      	tbody += '<tr><td>Director</td><td>' + data.Director + '</td></tr>';
      }
      if (data.Genre != 'N/A') {
      	tbody += '<tr><td>Genre</td><td>' + data.Genre + '</td></tr>';
      }
      if (data.Language != 'N/A') {
      	tbody += '<tr><td>Language</td><td>' + data.Language + '</td></tr>';
      }
      if (data.Ratings.length != 0) {
      	tbody += '<tr><td>Ratings</td><td>' + data.Ratings[0].Value + '</td></tr>';
      }
      if (data.Released != 'N/A') {
      	tbody += '<tr><td>Released</td><td>' + data.Released + '</td></tr>';
      }
      if (data.Runtime != 'N/A') {
      	tbody += '<tr><td>Runtime</td><td>' + data.Runtime + '</td></tr>';
      }
      if (data.Writer != 'N/A') {
      	tbody += '<tr><td>Writer</td><td>' + data.Writer + '</td></tr>';
      }

			$('#movie-detail .modal-content').html('<h4 class="center">' + data.Title + '</h4><div class="row"><div class="content-center"><img src="' + poster + '" class="responsive-img"></div></div>' + plot + '<table class="striped centered"><tbody>' + tbody + '</tbody></table></div>');
			$('#movie-detail .progress').addClass('hide');
		}
	});
});