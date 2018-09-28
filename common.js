function getConnectionAwareXmlHttpRequest(httpMethod, uri, successCallBack) {
	var httpRequest = new XMLHttpRequest();
	httpRequest.open(httpMethod, uri);

	httpRequest.setRequestHeader('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));
	httpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	httpRequest.addEventListener('readystatechange', function () {
		if (httpRequest.readyState === XMLHttpRequest.DONE) {
			if (httpRequest.status === 200) {
				if (successCallBack) successCallBack(httpRequest.responseText);
			} else if (httpRequest.status === 401 || httpRequest.status === 403) {
				// showDialogMessage('access-denied-dialog', 'error', I18N_ACCESS_DENIED_MESSAGE, I18N_RELOAD_LABEL, function () {
				// 	location.reload(true)
				// });
			}
		}
	});
	return httpRequest;
}

function getCookie(name) {
	var cookieValue = null;
	if (document.cookie && document.cookie != '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = jQuery.trim(cookies[i]);
			if (cookie.substring(0, name.length + 1) == (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}