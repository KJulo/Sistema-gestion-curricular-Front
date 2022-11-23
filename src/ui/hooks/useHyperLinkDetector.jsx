import React from 'react';

const useHyperLinkDetector = message => {

	if(!message) return message;
	let text = message;

	const firstFilter = /[a-zA-Z]{2,256}\.[a-zA-Z]{2,6}/g
	const output = message.match(firstFilter)

	if (output) {
		const urlRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=-]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

		let messageReplaced =  message.replace(urlRegex, (url) => {
			let hyperlink = url;
			if (!hyperlink.match('^https?:\/\/')) {
				hyperlink = 'https://' + hyperlink;
			}
			return '<a href="'+hyperlink+'" target="_blank">'+url+'</a>';
		});

		text = messageReplaced;
	}

	return (
		<div
			dangerouslySetInnerHTML={{__html:text}}
		/>
	)
}

export default useHyperLinkDetector;
