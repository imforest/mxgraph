/**
 * 마우스 오른쪽버튼 메뉴 추가
 * @param editor
 * @param graph
 * @returns
 */
function addPpopupMenu(editor, graph) {
	graph.popupMenuHandler.autoExpand = true;
	graph.popupMenuHandler.factoryMethod = function(menu, cell, evt) {
		if (cell != null) {
			if(cell.getStyle() == null) {
				menu.addItem('Cut', 'images/cut.png', function() {
					editor.execute("cut");
				});
				menu.addItem('Copy', 'images/copy.png', function() {
					editor.execute("copy");
				});
			}
		}

		if(mxClipboard.getCells() != null) {
			menu.addItem('Paste', 'images/paste.png', function() {
				editor.execute("paste");
			});
		}

		if (cell != null) {
			if(menu.table.lastChild.lastElementChild != null && menu.table.lastChild.lastElementChild.classList != "") menu.addSeparator();

			if(cell.getStyle() == null) {
				menu.addItem('Delete', 'images/delete2.png', function() {
					editor.execute("delete");
				});
			}

			if(menu.table.lastChild.lastElementChild != null && menu.table.lastChild.lastElementChild.classList != "") menu.addSeparator();

			menu.addItem('To Front', "images/up.gif", function() {
				editor.execute("toFront");
		    });
			menu.addItem('To Back', "images/down.gif", function() {
				editor.execute("toBack");
		    });

			if(menu.table.lastChild.lastElementChild != null && menu.table.lastChild.lastElementChild.classList != "") menu.addSeparator();

			if(cell.isVertex() && cell.getStyle() == "group") {
				menu.addItem('EnterGroup', 'images/view_next.png', function() {
					editor.execute("enterGroup");
				});
			}

		}

		if(this.graph.getCurrentRoot()) {
			menu.addItem('ExitGroup', 'images/view_previous.png', function() {
				editor.execute("exitGroup");
			});
		}

		if (cell != null && cell.isVertex() && cell.getStyle() != "group") {
			if(menu.table.lastChild.lastElementChild != null && menu.table.lastChild.lastElementChild.classList != "") menu.addSeparator();


			if(cell.getStyle() == null) {
				menu.addItem('Properties', 'images/properties.gif', function() {
					editor.execute("showProperties", cell);
				});

				if(menu.table.lastChild.lastElementChild != null && menu.table.lastChild.lastElementChild.classList != "") menu.addSeparator();

				menu.addItem('Open Link', 'images/link.gif', function() {
					mxUtils.alert('Open Link');
				});
			}
		}



		if(menu.table.lastChild.lastElementChild != null && menu.table.lastChild.lastElementChild.classList != "") menu.addSeparator();

		var folder = menu.addItem('Folder', 'images/open.gif', null);
		menu.addItem('Sub Item1', null, function() {
			mxUtils.alert('Sub Item1');
	    }, folder);
		menu.addItem('Sub Item2', null, function() {
			mxUtils.alert('Sub Item2');
	    }, folder);


	};
};