$(document).ready(function () {
    // Abrir el modal cuando el usuario haga clic en el botón "btn__newport__button"
    $(".btn__newport__button").on("click", function () {
      $("#myModal").fadeIn(500); // Muestra el modal con una animación de 500ms
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


    $("#accept-modal").on("click", function (e) {
        e.preventDefault();
        // Obtener los valores ingresados por el usuario
        const portfolioName = $("#portfolioName").val();
        const broker = $("#broker").val();
        const ticker = $("#ticker").val();
        const quantity = parseFloat($("#quantity").val());
        const price = parseFloat($("#price").val());
      
        // Crear un nuevo portfolio con los valores ingresados
        createNewPortfolio(portfolioName, broker, ticker, quantity, price);
      
        // Cerrar el modal
        $("#myModal").fadeOut(500);
      });  


});
  




  

function createNewPortfolio(portfolioName, broker, ticker, quantity, price) {
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
    <hr class="portfolio__nombre__linea op-25"></hr>
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
        <td id="btnMenuFilaPort" class="cursor"><img class="size-min op-50" src="img/linear_scale_white_24dp.svg" alt=""></td>
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
        <h2 class="mt-3">${ticker.toUpperCase()}</h2>
          <form id="changesForm" class="">
            <label for="he_comprado">Cálculo de operación:</label>
            <input class="ml-2" type="number" id="he_comprado_cantidad" name="he_comprado_cantidad" step="0.00001" placeholder="Cantidad..." required>
            <input class="ml-2" type="number" id="he_comprado_precio" name="he_comprado_precio" step="0.00001" placeholder="A precio..." required> 
            <input class="ml-2 no-select" type="number" id="he_invertido" name="he_invertido" step="0.00001" placeholder="Inversión..." required readonly>                   
            <div class="resultadoModalChanges">
              <h2 class="" for="resultado_virtual">Resultado virtual:</h2> 
              <label for="cantidad_virtual">Cantidad total ${ticker.toUpperCase()}:</label> 
              <input type="number" id="cantidad_virtual" name="cantidad_virtual" step="0.01" value="${quantity}" readonly>
              <label for="precio_medio_virtual">Media:</label>
              <input type="number" id="virtualMedia" name="virtualMedia" step="0.01" value="${price}" readonly>
              <label for="inversion_virtual">Inversión total:</label> 
              <input type="number" id="virtualInversion" name="virtualInversion" step="any" value="${(quantity * price)}" readonly>
            </div>
            <hr class="row_linea op-25"></hr>
            <div class="modalChangesButtons">
              <input type="submit" id="aplicar-activo" data-row-id="${filaId}" value="Aplicar">
              <div></div>
              <input type="button" id="eliminar-activo" class="btn btn-danger" data-row-id="${filaId}" value="Eliminar fila">
            </div>
            <input type="button" class="btn btn-dark text-center" id="closeModalChanges" value="Cancelar">
          </form>
      </div>
    </div>
    `;
  
    // Agregar el nuevo portfolio al DOM
    $("section").append(newPortfolioHtml);
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







  
    
        