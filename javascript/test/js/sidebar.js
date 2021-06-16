/**
 * 노드 추가
 * @param graph
 * @returns
 */
function addSidebarIcon(editor, graph) {
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
				createNode(graph, nodeId, label, x, y);
			}

			/*var dragElt = document.createElement('div');
			dragElt.style.border = 'dashed black 1px';
			dragElt.style.width = '120px';
			dragElt.style.height = '120px';*/

			var ds = mxUtils.makeDraggable(item, graph, funct, null, 0, 0, true, true);
			ds.setGuidesEnabled(true);

			//노드 클릭하여 그리는방법
			item.addEventListener(mxEvent.CLICK, mxUtils.bind(this, function(sender, evt) {
				if(this.style.borderStyle == "inset") {
					this.style.borderStyle = "";
					editor.insertFunction = null;
				} else {
					$('#sidebarContainer img').each(function (index, item) {
						this.style.borderStyle = "";
					});
					this.style.borderStyle = "inset";
					editor.insertFunction = mxUtils.bind(this, function(evt){
						createNode(graph, nodeId, label, evt.offsetX, evt.offsetY);
						editor.insertFunction = null;
						this.style.borderStyle = "";
					});
				}
			}));

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

/**
 * 노드생성
 * @param graph
 * @param id
 * @param label
 * @param x
 * @param y
 * @param width
 * @param height
 * @param parentId
 * @returns
 */
function createNode(graph, id, label, x, y,	width, height, parentId) {
	var parent = graph.getDefaultParent();
	if(!_.isEmpty(parentId)) {
		parent = graph.getModel().getCell(parentId);
	}

	if(_.isEmpty(width)) width = 260;
	if(_.isEmpty(height)) height = 260;

	var model = graph.getModel();

	var v1 = null;

	model.beginUpdate();
	try {
		v1 = graph.insertVertex(parent, id, label, x, y, width, height);

		v1.getTooltip = function(){
			var index = this.value.indexOf('</h1>');
			if (index > 0) {
				return this.value.substring(0, index+5);
			}
			return null;
		};

		v1.setConnectable(false);

		// Presets the collapsed size
		v1.geometry.alternateBounds = new mxRectangle(0, 0, 120, 40);

		// Adds the ports at various relative locations
		var port = graph.insertVertex(v1, id+'Trigger', 'Trigger', 0, 0.25, 16, 16,
				'port;image=images/overlays/flash.png;align=right;imageAlign=right;spacingRight=18', true);
		port.geometry.offset = new mxPoint(-6, -8);

		var port = graph.insertVertex(v1, id+'Input', 'Input', 0, 0.75, 16, 16,
				'port;image=images/overlays/check.png;align=right;imageAlign=right;spacingRight=18', true);
		port.geometry.offset = new mxPoint(-6, -4);

		var port = graph.insertVertex(v1, id+'Error', 'Error', 1, 0.25, 16, 16,
				'port;image=images/overlays/error.png;spacingLeft=18', true);
		port.geometry.offset = new mxPoint(-8, -8);

		var port = graph.insertVertex(v1, id+'Result', 'Result', 1, 0.75, 16, 16,
				'port;image=images/overlays/information.png;spacingLeft=18', true);
		port.geometry.offset = new mxPoint(-8, -4);
	} finally {
		model.endUpdate();
	}

	graph.setSelectionCell(v1);
	return v1;
}


/**
 * 라인생성
 * @param graph
 * @param label
 * @param startId
 * @param endId
 * @param parentId
 * @returns
 */
function createEdge(graph, id, label, startId, endId, parentId) {
	var parent = graph.getDefaultParent();
	if(!_.isEmpty(parentId)) {
		parent = graph.getModel().getCell(parentId);
	}

	var source = null;
	var target = null;
	if(_.isEmpty(startId) || _.isEmpty(endId)) {
		return false;
	} else {
		source = graph.getModel().getCell(startId);
		target = graph.getModel().getCell(endId);
	}

	var e = null;

	var model = graph.getModel();
	model.beginUpdate();
	try {
		if ( !_.isEmpty(source) && !_.isEmpty(target)) {
			e = graph.insertEdge(parent, id, label, source, target);

			// Uses the special 2-way style for 2-way labels
	//		if (value.indexOf('2-Way') >= 0) {
	//			e.style = '2way';
	//		}
		}
	} finally {
		model.endUpdate();
	}

	return e;
}


/**
 * 그룹생성
 * @param graph
 * @param label
 * @returns
 */
function createGroup(graph, id, label, x, y, width, height) {
	var parent = graph.getDefaultParent();
	var model = graph.getModel();

	if(_.isEmpty(width)) width = 500;
	if(_.isEmpty(height)) height = 500;

	var v1 = null;

	model.beginUpdate();
	try {
		v1 = graph.insertVertex(parent, id, label, x, y, width, height, 'group');
		v1.setConnectable(false);
	} finally {
		model.endUpdate();
	}

	return v1;
}

