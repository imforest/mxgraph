/**
 * 노드 추가
 * @param graph
 * @returns
 */
function addSidebarIcon(graph) {
	var nodeHtml = null;
	$.ajax({
		url: "./node.html",
		async: false, //동기
		success : function(result) {
			var tmp = result.replace(/(\r\n\t|\n\t|\n|\r\t)/gm,"");
			nodeHtml = $(tmp).clone();
		}
	});

	$('#sidebarContainer img').each(function (index, item) {
		var label = "";
		var nodeId = $(this).attr("id");
		nodeHtml.each(function (index, item) {
			if($(this).attr("id") == ("label_" + nodeId) ) {
				label = $(this).html();
			}
		});

		var funct = null;
		if(nodeId.indexOf("node") > -1) { //노드일경우
			funct = function(graph, evt, cell, x, y) {
				var parent = graph.getDefaultParent();
				var model = graph.getModel();

				var v1 = null;

				model.beginUpdate();
				try {
					v1 = graph.insertVertex(parent, null, label, x, y, 260, 260);
					v1.setConnectable(false);

					// Presets the collapsed size
					v1.geometry.alternateBounds = new mxRectangle(0, 0, 120, 40);

					// Adds the ports at various relative locations
					var port = graph.insertVertex(v1, null, 'Trigger', 0, 0.25, 16, 16,
							'port;image=images/overlays/flash.png;align=right;imageAlign=right;spacingRight=18', true);
					port.geometry.offset = new mxPoint(-6, -8);

					var port = graph.insertVertex(v1, null, 'Input', 0, 0.75, 16, 16,
							'port;image=images/overlays/check.png;align=right;imageAlign=right;spacingRight=18', true);
					port.geometry.offset = new mxPoint(-6, -4);

					var port = graph.insertVertex(v1, null, 'Error', 1, 0.25, 16, 16,
							'port;image=images/overlays/error.png;spacingLeft=18', true);
					port.geometry.offset = new mxPoint(-8, -8);

					var port = graph.insertVertex(v1, null, 'Result', 1, 0.75, 16, 16,
							'port;image=images/overlays/information.png;spacingLeft=18', true);
					port.geometry.offset = new mxPoint(-8, -4);
				} finally {
					model.endUpdate();
				}

				graph.setSelectionCell(v1);
			}

			/*var dragElt = document.createElement('div');
			dragElt.style.border = 'dashed black 1px';
			dragElt.style.width = '120px';
			dragElt.style.height = '120px';*/

			var ds = mxUtils.makeDraggable(item, graph, funct, null, 0, 0, true, true);
			ds.setGuidesEnabled(true);

		} else { // 일반적인 툴바기능일경우
			var icon = null;
			if(nodeId.indexOf("text") > -1) {
				icon = new mxCell("Text", new mxGeometry(0, 0, 60, 30), "text;shape=label;html=1;");
			} else {
				var cellStyle = 'toolbar;shape=image;image=' + $(this).attr("src") + ";";
				icon = new mxCell("Actor", new mxGeometry(0, 0, 40, 40), cellStyle);
			}
			icon.setVertex(true);
			icon.setConnectable(false);

			funct = function(graph, evt, cell)
			{
				graph.stopEditing(false);

				var pt = graph.getPointForEvent(evt);
				var vertex = graph.getModel().cloneCell(icon);
				vertex.geometry.x = pt.x;
				vertex.geometry.y = pt.y;

				graph.setSelectionCells(graph.importCells([vertex], 0, 0, cell));
			}

			mxUtils.makeDraggable(item, graph, funct);
		}

	});
};

