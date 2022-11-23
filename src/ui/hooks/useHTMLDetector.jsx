import React from 'react';

const useHTMLDetector = text => {
    if (!text) return text;

    return (
        <div
			dangerouslySetInnerHTML={{__html:text}}
		/>
    )
}

export default useHTMLDetector;