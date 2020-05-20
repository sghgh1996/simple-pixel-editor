let paintingGrid = function(document) {
  const paintingCanvas = document.querySelector('#painting-canvas');
  const paintingCanvasCtx = paintingCanvas.getContext('2d');
  var gridSize = 16;
  var paintingColor = '#000';

  paintingCanvas.addEventListener('mousedown', function(e) {
    paintingCanvasMouseDown(e);
  });

  function getMousePosition(canvas, e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }
  
  function paintingCanvasMouseDown(e) {
    const paintCellNumbers = parseInt(gridSize);
    const paintCellSize = 400 / paintCellNumbers;
  
    const mousePosition = getMousePosition(paintingCanvas, e);
    const rowIndex = Math.ceil(mousePosition.x / paintCellSize);
    const columnIndex = Math.ceil(mousePosition.y / paintCellSize);
    
    paintingCanvasCtx.fillStyle = paintingColor;
    paintingCanvasCtx.fillRect((rowIndex - 1) * paintCellSize, (columnIndex - 1) * paintCellSize, paintCellSize, paintCellSize);
  }

  function updatePaintingBoard () {
    paintingCanvasCtx.clearRect(0, 0, paintingCanvas.width, paintingCanvas.height);
  
    paintingCanvasCtx.beginPath();
    paintingCanvasCtx.strokeStyle = '#d7d7d7';
    const paintCellNumbers = parseInt(gridSize);
    const paintCellSize = 400 / paintCellNumbers;
  
    for (let i = 0; i < paintCellNumbers; i++) {
      
      for (let j = 0; j < paintCellNumbers; j++) {
        paintingCanvasCtx.rect(i * paintCellSize, j * paintCellSize, paintCellSize, paintCellSize);
      }
    }
    paintingCanvasCtx.stroke();
  }

  function updatePaintingGridSize (size) {
    gridSize = size;
    updatePaintingBoard();
  }

  function updatePaintingGridColor (color) {
    paintingColor = color;    
  }

  function downloadPainting () {
    let downloadLink = document.createElement('a');
    downloadLink.href = paintingCanvas.toDataURL();
    downloadLink.download = 'painting.png';

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return {
    updatePaintingGridSize,
    updatePaintingGridColor,
    downloadPainting
  };
}

module.exports = paintingGrid;