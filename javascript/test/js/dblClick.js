/**
 * 더블클릭기능 추가
 */
function addDblClick(graph) {
	// Shows a "modal" window when double clicking a vertex.
	graph.dblClick = function(evt, cell) {
		// Do not fire a DOUBLE_CLICK event here as mxEditor will
		// consume the event and start the in-place editor.
		if (this.isEnabled() && !mxEvent.isConsumed(evt) && cell != null && this.isCellEditable(cell)) {
			if (this.model.isEdge(cell) || !this.isHtmlLabel(cell)
					|| this.getCurrentCellStyle(cell)['shape'] == "label"
					|| this.getCurrentCellStyle(cell)['shape'] == "image") {
				this.startEditingAtCell(cell);
			} else {
				var content = document.createElement('div');
				content.innerHTML = this.convertValueToString(cell);
				showModalWindow(this, 'Properties', content, 400, 300);
			}
		}

		// Disables any default behaviour for the double click
		mxEvent.consume(evt);
	};
};