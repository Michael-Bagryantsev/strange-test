(function($) {
	$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		return !results ? false : results[1] || false;
	}

	var idStr = $.urlParam('id');
	if (idStr !== false) {
		var ids = idStr.split(',');
		$(ids).each(function(i, id) {
			$.getJSON("https://noembed.com/embed?url=https://www.youtube.com/watch?v=" + id, function( data ) {
				var $div = $('<div/>')
				$div.data('id', id);
				$div.data('title', data.title);
				$div.addClass('image');
				$div.html(getImageHtml(id, data.title));
				$('body').append($div);
			});
		});	
	}

	$('body').on('click', 'div.image', function() {
		$('div.video').each(function(i, obj) {
			$(obj).html(getImageHtml($(obj).data('id'), $(obj).data('title')));
			$(obj).removeClass('video');
			$(obj).addClass('image');
		});
		$(this).height($(this).find('img').height());
		$(this).html(getVideoHtml($(this).data('id'), $(this)));
		$(this).removeClass('image');
		$(this).addClass('video');
	});

	$(window).on('resize', function() {
		$('iframe').each(function(i, obj) {
			$(obj).width($(obj).parent().width() - 40);
		});
	});

	function getImageHtml(id, title) {
		return '<img src="https://i.ytimg.com/vi/' + id + '/hqdefault.jpg" alt="' + title + '" />';
	}

	function getVideoHtml(id, el) {
		return '<iframe width="' + (el.width()) + '" src="https://www.youtube.com/embed/' + id + '?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
	}

})(jQuery);