/**
 * 모달창 호출
 * @param graph
 * @param title
 * @param content
 * @param width
 * @param height
 * @returns
 */
function showModalWindow(graph, title, content, width, height) {
	var background = document.createElement('div');
	background.style.position = 'absolute';
	background.style.left = '0px';
	background.style.top = '0px';
	background.style.right = '0px';
	background.style.bottom = '0px';
	background.style.background = 'black';
	mxUtils.setOpacity(background, 50);
	document.body.appendChild(background);

	if (mxClient.IS_IE) {
		new mxDivResizer(background);
	}

	var x = Math.max(0, document.body.scrollWidth/2-width/2);
	var y = Math.max(10, (document.body.scrollHeight ||
				document.documentElement.scrollHeight)/2-height*2/3);
	var wnd = new mxWindow(title, content, x, y, width, height, false, true);
	wnd.setClosable(true);

	// Fades the background out after after the window has been closed
	wnd.addListener(mxEvent.DESTROY, function(evt) {
		graph.setEnabled(true);
		mxEffects.fadeOut(background, 50, true, 10, 30, true);
	});

	graph.setEnabled(false);
	graph.tooltipHandler.hide();
	wnd.setVisible(true);
	return wnd;
};