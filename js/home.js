$(document).ready(function () {
  // Abrir el modal cuando el usuario haga clic en el botón "btn__newport__button"
  $(".btn__newport__button").on("click", function () {
    $("#myModal").fadeIn(200); // Muestra el modal con una animación de 500ms
  });

  // Cerrar el modal cuando el usuario haga clic en el botón "cerrar"
  $("#closeModal").on("click", function () {
    $("#myModal").fadeOut(500); // Oculta el modal con una animación de 500ms
  });

  // Cerrar el modal cuando el usuario haga clic fuera del contenido del modal
  $(document).on("click", function (event) {
    if ($(event.target).closest(".modal-content").length === 0 && $(event.target).closest(".btn__newport__button").length === 0) {
      $("#myModal").fadeOut(500); // Oculta el modal con una animación de 500ms
    }
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  $("#accept-modal").on("click", function (e) {
    e.preventDefault();
    // Obtener los valores ingresados por el usuario
    const portfolioName = capitalizeFirstLetter($("#portfolioName").val());
    const broker = capitalizeFirstLetter ($("#broker").val());
    const ticker = $("#ticker").val();
    const quantity = parseFloat($("#quantity").val());
    const price = parseFloat($("#price").val());

    // Verificar si todos los campos están completados
    if (!portfolioName || !broker || !ticker || isNaN(quantity) || isNaN(price)) {
      alert("Por favor, complete todos los campos.");
      return;
    }
    
    // Crear un nuevo portfolio con los valores ingresados
    createNewPortfolio(portfolioName, broker, ticker, quantity, price);

    // Limpiar los campos de entrada del modal
    $("#portfolioName").val('');
    $("#broker").val('');
    $("#ticker").val('');
    $("#quantity").val('');
    $("#price").val('');

    // Ocultar el mensaje de bienvenida y mostrar el nuevo contenido
    $(".btn__newport__Bienvenida > p").hide();
    $("#post-portfolio-content").show();
  
    // Cerrar el modal
    $("#myModal").fadeOut(500);
  });  

});

function createNewPortfolio(portfolioName, broker, ticker, quantity, price) {
  // Verificar si ya existe un portfolio con el mismo nombre
  const existingPortfolio = $(`.portfolio__titulo h1:contains("${portfolioName}")`);
  if (existingPortfolio.length > 0) {
    alert('Ya existe un portfolio con este nombre. Por favor, elija otro nombre.');
    return;
  }

  // Crear el ID único del portfolio
  const portfolioID = portfolioName.replaceAll(" ", "_"); // Reemplaza los espacios en blanco por '_'

  // Crear el ID único de la fila
  const filaId = `${portfolioID}-${broker.substring(0, 3).toUpperCase()}-${ticker.toUpperCase()}`;

  // Crear el ID único para los modales
  const modalFilaId = `${filaId}-modalFila`;
  const modalChangesId = `${filaId}-modalChanges`;

  // Generar el código HTML para el nuevo portfolio
  const newPortfolioHtml = `
  <div class="portfolio__titulo">
    <h1 class="nowrap">${portfolioName}</h1>
    <hr class="portfolio__nombre__linea"></hr>
  </div>
  <table id="${portfolioID}" class="portfolio-table">
    <thead class="">
      <tr class="portfolio__th">
        <th class="border-radius-left-top">Bróker</th>
        <th class="">Ticker</th>
        <th class="">Cant.</th>
        <th class="">Media</th>
        <th class="">Inv.</th>
        <th class="">Precio</th>
        <th class="">P&L</th>
        <th class="">%</th>
        <th class="border-radius-right-top cursor"><img id="" class="size-min op-50" src="img/settings_white_18dp.svg" alt=""></th> 
      </tr>
    </thead>    
    <tbody id="" class="">
      <tr id="${filaId}" class="portfolio__fila">
        <td id="broker" class="px-1">${broker}</td>
        <td id="ticker" class="t-naranja">${ticker.toUpperCase()}</td>
        <td id="cantidad" class="">${quantity}</td>
        <td id="precioMedio" class="">${price}</td>
        <td id="inversion" class="">${(quantity * price).toFixed(2)}</td>
        <td id="valorActual" class="py-05"><input id="cotiTH" class="valorActual-placeholder" type="number" step="0.01" defaultValue="${price}" placeholder="Manual"></td>
        <td id="diferencia" class=""></td>
        <td id="diferenciaPercent" class=""></td>
        <td id="btnMenuFilaPort" class="cursor"><img class="icono_compraventa" src="img/icono_compraventa-01.svg" title="Añadir operación Compra/Venta" alt="Añadir operación de compra o venta del activo"></td>
      </tr>
      <tr class="salto1"></tr>
      <!-- /** TOTALES **/ -->
      <tr class="portfolio__totales">
        <th id="" class="border-radius-left-bottom"></th>
        <th id="totalActivos" class="nowrap">2 Activos</th>
        <th id="" class=""></th>
        <th id="" class=""></th>
        <th id="totalInversion" class=""> &nbsp111,200 </th>
        <th id="" class=""></th>
        <th id="totalProfit" class=""> &nbsp300,000</th>
        <th id="totalDiferenciaPercent" class=""> &nbsp300%</th>
        <th id="add-row" class="cursor border-radius-right-bottom"><img id="add-icon" class="op-50" src="img/add_box_white_24dp.svg" alt=""></th>
      </tr>             
    </tbody>
  </table>
  <div class="modalFila" id="${modalFilaId}">
    <div class="modal-content">
        <h2>Añadir activo</h2>
        <form id="newFilaForm" class="newFilaForm">
            <label for="broker">Bróker:</label>
            <input type="text" id="broker" name="broker" required>
            <label for="ticker">Activo:</label>
            <input type="text" id="ticker" name="ticker" required>
            <label for="quantity">Cantidad:</label>
            <input type="number" id="quantity" name="quantity" step="0.01" required>
            <label for="price">Precio:</label>
            <input type="number" id="price" name="price" step="0.01" min="0" required>
            <div class="modalButtons">
                <input type="submit" id="accept-modal-fila" value="Aceptar">
                <input type="button" id="closeModalFila" value="Cerrar">
            </div>
          </form>
      </div>
  </div>
  <div class="modalChanges" id="${modalChangesId}">
    <div class="modal-changes-content">
      <img src="img/helpChanges.svg" class="question-icon" title="Modo de uso:
      Añade la cantidad de ${ticker.toUpperCase()} comprada y el precio de compra.
      Si has vendido ${ticker.toUpperCase()} la cantidad debería ser negativa.
      Por ejemplo: Cantidad -100 y el precio de venta normal.
      En caso de venta el precio medio no se verá afectado.

      El formulario calculará automáticamente la operación,
      además de tener en cuenta la cantidad de ${ticker.toUpperCase()} que ya tienes.

      Una vez apliques los cambios, los resultados se reflejarán
      en tu activo ${ticker.toUpperCase()} dentro del Portfolio ${portfolioName}."> <!-- Agrega el icono y el mensaje personalizado -->      
      <h2 class="mt-3 nowrap"><span class="op-50">${portfolioName} /</span> ${ticker.toUpperCase()}</h2>
      <form id="changesForm" class="">
        <label for="he_comprado">Añadir operación:</label>
        <input class="ml-2" type="number" id="he_comprado_cantidad" name="he_comprado_cantidad" step="0.00001" placeholder="Cantidad de ${ticker.toUpperCase()}..." required>
        <input class="ml-2" type="number" id="he_comprado_precio" name="he_comprado_precio" step="0.00001" placeholder="A precio..." required> 
        <input class="ml-2 no-select" type="number" id="he_invertido" name="he_invertido" step="0.00001" placeholder="Inversión..." required readonly>                   
        <div class="resultadoModalChanges">
          <h2 class="" for="resultado_virtual">Cálculos tras la operación</h2> 
          <label for="cantidad_virtual">Cantidad total ${ticker.toUpperCase()}:</label> 
          <input type="number" id="cantidad_virtual" name="cantidad_virtual" step="0.01" value="${quantity}" readonly>
          <label for="precio_medio_virtual">Media:</label>
          <input type="number" id="virtualMedia" name="virtualMedia" step="0.001" value="${price}" readonly>
          <label for="inversion_virtual">Inversión global:</label> 
          <input type="number" id="virtualInversion" name="virtualInversion" step="any" value="${(quantity * price)}" readonly>
        </div>
        <hr class="row_linea op-25"></hr>
        <div class="modalChangesButtons">
          <input type="submit" id="aplicar-activo" class="cursor" data-row-id="${filaId}" value="Aplicar a ${ticker.toUpperCase()}">
          <div></div>
          <input type="button" id="eliminar-activo" class="btn btn-danger cursor" data-row-id="${filaId}" value="Eliminar ${ticker.toUpperCase()}">
        </div>
        <input type="button" class="btn btn-dark text-center" id="closeModalChanges" value="Cerrar">
      </form>
    </div>
  </div>
    `;

  // Agregar el nuevo portfolio al DOM
  $("section").append(newPortfolioHtml);

  // Agregar evento "change" al campo de entrada "valorActual"
  $(`#${filaId} #cotiTH`).on("change", function () {
    updateDiferencia(filaId);
  });

  // Actualizar el valor de "diferencia" inicial
  updateDiferencia(filaId);

  // Agregar evento "click" al botón "btnMenuFilaPort"
  $(`#${filaId} #btnMenuFilaPort`).on("click", function () {
    openModalChanges(modalChangesId);
  });

  // Agregar evento "click" al botón de cierre del modal
  $(`#${modalChangesId} #closeModalChanges`).on("click", function () {
    $(`#${modalChangesId}`).fadeOut(200);
  });

  // Cálculos de resultados virtuales
  $(`#${modalChangesId} #he_comprado_cantidad, #${modalChangesId} #he_comprado_precio`).on("input", function () {
    calculateVirtualResults(modalChangesId);
  });

  $(`#${modalChangesId} #cantidad_virtual`).data('original', quantity);
  $(`#${modalChangesId} #virtualInversion`).data('original', (quantity * price));
  
  
  // Recuperar fila eliminada con Ctrl+Z
  function deleteRow(rowId) {
    const $row = $(`#${rowId}`);
    deletedRows.push({
      row: $row.clone(true, true),
      index: $row.index(),
      parent: $row.parent(),
    });
    $row.remove();
  }  

  function undoDeleteRow() {
    if (deletedRows.length > 0) {
      const deletedRowData = deletedRows.pop();
      const $parent = deletedRowData.parent;
      const index = deletedRowData.index;
      const $row = deletedRowData.row;
      if (index === 0) {
        $parent.prepend($row);
      } else {
        $parent.children().eq(index - 1).after($row);
      }
    }
  }

  $(document).keydown(function (e) {
    const isUndo = (e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'z';
  
    if (isUndo) {
      e.preventDefault();
      undoDeleteRow();
    }
  });

  $(`#${modalChangesId} #eliminar-activo`).on("click", function () {
    const rowId = $(this).data("row-id");
    const confirmDelete = confirm("¿Está seguro de querer eliminar el activo del portfolio?");
    if (confirmDelete) {
      deleteRow(rowId);
      $(`#${modalChangesId}`).fadeOut(200);
    }
  }); 

  const deletedRows = [];
  


}

function openModalChanges(modalChangesId) {
  const $modal = $(`#${modalChangesId}`);
  $modal.fadeIn(200);

  // Cerrar el modal al hacer clic fuera de su contenido
  $modal.on("click", function (event) {
    if ($(event.target).is($modal)) {
      $modal.fadeOut(200);
    }
  });
}

// Función para calcular el portfolio__th
function updateDiferencia(filaId) {
  let valorActual = parseFloat($(`#${filaId} #cotiTH`).val());
  if (isNaN(valorActual)) {
    valorActual = parseFloat($(`#${filaId} #precioMedio`).text());
  }
  const cantidad = parseFloat($(`#${filaId} #cantidad`).text());
  const inversion = parseFloat($(`#${filaId} #inversion`).text());
  
  let diferencia = 0;
  let diferenciaPercent = 0;

  if (!isNaN(valorActual)) {
    diferencia = valorActual * cantidad - inversion;
    diferenciaPercent = (diferencia / inversion) * 100;
  }
  
  $(`#${filaId} #diferencia`).text(diferencia.toFixed(2));

  $(`#${filaId} #diferenciaPercent`).html(diferenciaPercent.toFixed(2) + ' <span class="percent-symbol">%</span>');

  // Cambiar el color del texto según el valor de diferenciaPercent
  if (diferenciaPercent > 0) {
    $(`#${filaId} #diferenciaPercent`).css("color", "rgb(54 241 54)");
  } else if (diferenciaPercent < 0) {
    $(`#${filaId} #diferenciaPercent`).css("color", "#3bbdee");
  } else {
    $(`#${filaId} #diferenciaPercent`).css("color", "white");
  }
}


// Función para deshacer y rehacer cambios en inputs con Ctrl + Z
const inputHistory = new Map();
const inputFuture = new Map();

document.addEventListener('keydown', (e) => {
  const isRedo = (e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'Z'));
  const isUndo = (e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'z';

  if (e.target.tagName === 'INPUT' && (isRedo || isUndo)) {
    e.preventDefault(); // Evita la acción predeterminada del navegador

    const inputElement = e.target;

    if (!inputHistory.has(inputElement)) {
      inputHistory.set(inputElement, []);
    }
    if (!inputFuture.has(inputElement)) {
      inputFuture.set(inputElement, []);
    }

    const history = inputHistory.get(inputElement);
    const future = inputFuture.get(inputElement);

    if (isUndo && history.length > 0) {
      // Deshacer al valor anterior
      const previousValue = history.pop();
      future.push(inputElement.value);
      inputElement.value = previousValue;
    } else if (isRedo && future.length > 0) {
      // Rehacer al siguiente valor
      const nextValue = future.pop();
      history.push(inputElement.value);
      inputElement.value = nextValue;
    }
  }
});

document.addEventListener('input', (e) => {
  if (e.target.tagName === 'INPUT') {
    const inputElement = e.target;

    if (!inputHistory.has(inputElement)) {
      inputHistory.set(inputElement, []);
    }
    if (!inputFuture.has(inputElement)) {
      inputFuture.set(inputElement, []);
    }

    const history = inputHistory.get(inputElement);
    const future = inputFuture.get(inputElement);

    // Guardar el valor actual en el historial antes de cambiar
    history.push(inputElement.value);

    // Limpiar el futuro cuando se realiza una nueva entrada
    future.length = 0;
  }     
});  

// Función para calcular los resultados virtuales
function calculateVirtualResults(modalChangesId) {
  const cantidadComprada = parseFloat($(`#${modalChangesId} #he_comprado_cantidad`).val()) || 0;
  const precioComprado = parseFloat($(`#${modalChangesId} #he_comprado_precio`).val()) || 0;
  const cantidadVirtualOriginal = parseFloat($(`#${modalChangesId} #cantidad_virtual`).data('original')) || 0;
  const inversionVirtualOriginal = parseFloat($(`#${modalChangesId} #virtualInversion`).data('original')) || 0;

  const invertido = cantidadComprada * precioComprado;
  $(`#${modalChangesId} #he_invertido`).val(invertido.toFixed(2));

  const nuevaCantidadVirtual = cantidadComprada + cantidadVirtualOriginal;
  $(`#${modalChangesId} #cantidad_virtual`).val(nuevaCantidadVirtual.toFixed(2));

  const nuevaInversionVirtual = invertido + inversionVirtualOriginal;
  $(`#${modalChangesId} #virtualInversion`).val(nuevaInversionVirtual.toFixed(2));

  const nuevaMedia = (nuevaCantidadVirtual === 0) ? 0 : nuevaInversionVirtual / nuevaCantidadVirtual;
  $(`#${modalChangesId} #virtualMedia`).val(nuevaMedia.toFixed(4));
}






