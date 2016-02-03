function do_submit_pages($page_size, add_url) {
	var page_jump = $('#page_jump').val();
	var base_url = $('#base_url').val();
	if (isNaN(parseInt(page_jump)) || page_jump<=0) {
		return;
	}
	if (page_jump > $page_size) {
		return;
	} else {
		var jump_url = base_url + '/' + page_jump + add_url;
		window.document.location = jump_url;
	}
}
