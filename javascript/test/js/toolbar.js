/**
 * 툴바추가
 */
function addToolbarButton(editor, graph) {
	// 그룹생성/해제 action 생성
	editor.addAction('groupOrUngroup', function(editor, cell) {
		cell = cell || editor.graph.getSelectionCell();
		if (cell != null && editor.graph.isSwimlane(cell)) {
			editor.execute('ungroup', cell);
		}
		else {
			editor.execute('group');
		}
	});
	// export action 생성
	editor.addAction('export', function(editor, cell) {
		var textarea = document.createElement('textarea');
		textarea.style.width = '400px';
		textarea.style.height = '400px';
		var enc = new mxCodec(mxUtils.createXmlDocument());
		var node = enc.encode(editor.graph.getModel());
		var xmlText = mxUtils.getPrettyXml(node);
		textarea.value = xmlText;
		showModalWindow(graph, 'export XML 문서', textarea, 1000, 700);
	});

	// import action 생성
	editor.addAction('import', function read(editor, filename) {
		filename = './sample.xml';
		var req = mxUtils.load(filename);
		var root = req.getDocumentElement();
		var dec = new mxCodec(root.ownerDocument);
		dec.decode(root, editor.graph.getModel());
	});

	// showProperties action 생성
	editor.addAction('showProperties', function showProperties(editor, cell) {
		var wnd = null;

		var propertiesHtml = null;
		$.ajax({
			url: "./properties.html",
			async: false, //동기
			success : function(result) {
				propertiesHtml = $(result);
			}
		});

		var cellValue = null;
		cellValue = cell.value.replace(/(\r\n\t|\n\t|\n|\r\t)/gm,"");
		cellValue = $(cellValue).clone();
		propertiesHtml.find("#arg1").val(cellValue[0].textContent);
		propertiesHtml.find("#arg2").prev().attr("src", cellValue[1].src);
		propertiesHtml.find("#arg2").val("");
		propertiesHtml.find("#arg3").val(cellValue[2].textContent);


		var okFunction = function() {
			var cellValue = cell.value.replace(/(\r\n\t|\n\t|\n|\r\t)/gm,"");
			cellValue = $(cellValue).clone();
			cellValue[0].textContent = propertiesHtml.find("#arg1").val();
			cellValue[1].src = propertiesHtml.find("#arg2").prev().attr("src");
			cellValue[2].textContent = propertiesHtml.find("#arg3").val();

			var value = "";
			cellValue.each(function (index, item) {
				value += item.outerHTML;
			});

			var content = $(wnd.content);
			editor.graph.model.setValue(cell, value);
			wnd.destroy();
		}

		var cancelFunction = function() {
			wnd.destroy();
		}

		$(propertiesHtml.find("#arg2")).on("change", function (event) {
			var fileList = this.files;
			var file = fileList[0];
			var reader = new FileReader();
			reader.onload = function (e) {
				propertiesHtml.find("#arg2").prev().attr("src", e.target.result);
			}
			reader.readAsDataURL(file);
		});
		$(propertiesHtml.find("button")[0]).on("click", okFunction);
		$(propertiesHtml.find("button")[1]).on("click", cancelFunction);


		wnd = showModalWindow(editor.graph, cellValue[0].textContent, propertiesHtml[0], 500, 300);
	});

	editor.addAction('toFront', function() { graph.orderCells(false); });
	editor.addAction('toBack', function() { graph.orderCells(true); });

	$('#toolbarContainer button,#statusContainer button').each(function (index, item) {
		$(this).on("click", function(event) {
			var action = $(this).attr("action");
			editor.execute(action);
		});
	});
};