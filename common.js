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

/*
 * Exemple d'utilisation
 * 
 */
var Conversation = {
		
		acquereur : "",
		purchaser : "",
		listeMessage : [],
		dateDernierMessage : "",
		
		idChat : "",
		
		init: function(acquereur, purchaser, listeMessage, dateDernierMessage, idChat) {
			this.acquereur = acquereur;
			this.purchaser = purchaser;
			this.listeMessage = listeMessage;
			this.dateDernierMessage = dateDernierMessage;
			this.idChat = idChat;
		},

		toString: function() {
			return "acquereur : " + acquereur + "purchaser : " + purchaser + "listeMessage : " + listeMessage.toString();
		},

		envoyerDonnees : function(idMessagerie) {
			var quotationRequest = getConnectionAwareXmlHttpRequest('POST', 'messageChat', function(ResponseText) {
				
			})
			quotationRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			quotationRequest.setRequestHeader("Accept", "application/json");
			
			var jsonData = {
				'acquereur'	: this.acquereur,
				'message' : $("#" + idMessagerie).val()
			}
			jsonData = JSON.stringify(jsonData);
		    quotationRequest.send(jsonData);
		    
			$("#" + idMessagerie).val("");
		},

		rafraichir : function(idChat) {
			var theChat = this;
			var quotationRequest = getConnectionAwareXmlHttpRequest('POST', 'messageChats', function(ResponseText) {
				//2 cas de figure possible : le tableau est vide ou il ne l'est pas
				if(theChat.listeMessage == null) {
					theChat.listeMessage = [];
				}
				theChat.listeMessage = theChat.listeMessage.concat(JSON.parse(ResponseText));
				
				//on vide la liste des messages
				//clearContent("msg-conversation-content");
				
				//on affiche la liste des message à l'écran et on met à jour la date
				for(var newMessageIndex=0; newMessageIndex < theChat.listeMessage.length; newMessageIndex++) {
					if((theChat.dateDernierMessage == null) || (theChat.dateDernierMessage < theChat.listeMessage[newMessageIndex].date)){
						theChat.dateDernierMessage = theChat.listeMessage[newMessageIndex].date;
						
						//TODO on call la méthode de création d'un message RenderNew
						var contactListContainer = document.getElementById('msg-conversation-content');
						contactListContainer.appendChild(renderWaitingMessagesItem(newMessageIndex, theChat.listeMessage[newMessageIndex].purchaser, theChat.listeMessage[newMessageIndex].date, theChat.listeMessage[newMessageIndex].message));
					}
					
					
					
					
				}
			})
			quotationRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			quotationRequest.setRequestHeader("Accept", "application/json");
			var jsonData = {
				'date' : this.dateDernierMessage,
				'acquereur'	: this.acquereur
			}
			jsonData = JSON.stringify(jsonData);
			quotationRequest.send(jsonData);
		},
	}*/