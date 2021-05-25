/**
 * 스타일
 * @param graph
 * @returns
 */
function configureStylesheet(graph) {
	// NOTE: Alternative vertex style for non-HTML labels should be as
	// follows. This repaces the above style for HTML labels.
	/*var style = new Object();
	style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;
	style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
	style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
	style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
	style[mxConstants.STYLE_IMAGE_ALIGN] = mxConstants.ALIGN_CENTER;
	style[mxConstants.STYLE_IMAGE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
	style[mxConstants.STYLE_SPACING_TOP] = '56';
	style[mxConstants.STYLE_GRADIENTCOLOR] = '#7d85df';
	style[mxConstants.STYLE_STROKECOLOR] = '#5d65df';
	style[mxConstants.STYLE_FILLCOLOR] = '#adc5ff';
	style[mxConstants.STYLE_FONTCOLOR] = '#1d258f';
	style[mxConstants.STYLE_FONTFAMILY] = 'Verdana';
	style[mxConstants.STYLE_FONTSIZE] = '12';
	style[mxConstants.STYLE_FONTSTYLE] = '1';
	style[mxConstants.STYLE_ROUNDED] = '1';
	style[mxConstants.STYLE_IMAGE_WIDTH] = '48';
	style[mxConstants.STYLE_IMAGE_HEIGHT] = '48';
	style[mxConstants.STYLE_OPACITY] = '80';
	graph.getStylesheet().putDefaultVertexStyle(style);*/

	var style = new Object();
	style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
	style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
	style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
	style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
	style[mxConstants.STYLE_GRADIENTCOLOR] = '#41B9F5';
	style[mxConstants.STYLE_FILLCOLOR] = '#8CCDF5';
	style[mxConstants.STYLE_STROKECOLOR] = '#1B78C8';
	style[mxConstants.STYLE_FONTCOLOR] = '#000000';
	style[mxConstants.STYLE_ROUNDED] = true;
	style[mxConstants.STYLE_OPACITY] = '80';
	style[mxConstants.STYLE_FONTSIZE] = '12';
	style[mxConstants.STYLE_FONTSTYLE] = 0;
	style[mxConstants.STYLE_IMAGE_WIDTH] = '48';
	style[mxConstants.STYLE_IMAGE_HEIGHT] = '48';
	graph.getStylesheet().putDefaultVertexStyle(style);

	style = new Object();
	style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
	style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
	style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
	style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
	style[mxConstants.STYLE_FILLCOLOR] = '#FF9103';
	style[mxConstants.STYLE_GRADIENTCOLOR] = '#F8C48B';
	style[mxConstants.STYLE_STROKECOLOR] = '#E86A00';
	style[mxConstants.STYLE_FONTCOLOR] = '#000000';
	style[mxConstants.STYLE_ROUNDED] = true;
	style[mxConstants.STYLE_OPACITY] = '80';
	style[mxConstants.STYLE_STARTSIZE] = '30';
	style[mxConstants.STYLE_FONTSIZE] = '16';
	style[mxConstants.STYLE_FONTSTYLE] = 1;
	graph.getStylesheet().putCellStyle('group', style);

	style = new Object();
	style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
	style[mxConstants.STYLE_FONTCOLOR] = '#774400';
	style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
	style[mxConstants.STYLE_PERIMETER_SPACING] = '6';
	style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_LEFT;
	style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
	style[mxConstants.STYLE_FONTSIZE] = '10';
	style[mxConstants.STYLE_FONTSTYLE] = 2;
	style[mxConstants.STYLE_IMAGE_WIDTH] = '16';
	style[mxConstants.STYLE_IMAGE_HEIGHT] = '16';
	graph.getStylesheet().putCellStyle('port', style);

	style = new Object();
	style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
	style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
	style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
	style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
	style[mxConstants.STYLE_ROTATION] = '0';
	style[mxConstants.STYLE_SPACING_TOP] = '0';
	style[mxConstants.STYLE_SPACING_BOTTOM] = '0';
	style[mxConstants.STYLE_GRADIENTCOLOR] = '#FFFFFF';
	style[mxConstants.STYLE_STROKECOLOR] = mxConstants.NONE;
	style[mxConstants.STYLE_FILLCOLOR] = mxConstants.NONE;
	style[mxConstants.STYLE_FONTCOLOR] = '#000000';
	style[mxConstants.STYLE_FONTFAMILY] = 'Verdana';
	style[mxConstants.STYLE_FONTSIZE] = '12';
	style[mxConstants.STYLE_FONTSTYLE] = '1';
	style[mxConstants.STYLE_ROUNDED] = '1';
	style[mxConstants.STYLE_IMAGE_WIDTH] = '40';
	style[mxConstants.STYLE_IMAGE_HEIGHT] = '40';
	graph.getStylesheet().putCellStyle('toolbar', style);


	style = new Object();
	style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;
	style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
	style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
	style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
	style[mxConstants.STYLE_IMAGE_ALIGN] = mxConstants.ALIGN_CENTER;
	style[mxConstants.STYLE_IMAGE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
	style[mxConstants.STYLE_ROTATION] = '0';
	style[mxConstants.STYLE_SPACING_TOP] = '0';
	style[mxConstants.STYLE_GRADIENTCOLOR] = '#FFFFFF';
	style[mxConstants.STYLE_STROKECOLOR] = mxConstants.NONE;
	style[mxConstants.STYLE_FILLCOLOR] = mxConstants.NONE;
	style[mxConstants.STYLE_FONTCOLOR] = '#000000';
	style[mxConstants.STYLE_FONTFAMILY] = 'Verdana';
	style[mxConstants.STYLE_FONTSIZE] = '24';
	style[mxConstants.STYLE_FONTSTYLE] = '1';
	style[mxConstants.STYLE_ROUNDED] = '1';
	style[mxConstants.STYLE_IMAGE_WIDTH] = '48';
	style[mxConstants.STYLE_IMAGE_HEIGHT] = '48';
	graph.getStylesheet().putCellStyle('text', style);

	style = graph.getStylesheet().getDefaultEdgeStyle();
	style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#FFFFFF';
	style[mxConstants.STYLE_STROKEWIDTH] = '2';
	style[mxConstants.STYLE_ROUNDED] = true;
	style[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
};