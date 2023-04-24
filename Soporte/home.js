document.addEventListener('DOMContentLoaded', () => {
  const btnNewPortButton = document.querySelector('.btn__newport__button');
  const closeModalButton = document.querySelector('#closeModal');
  const acceptModalButton = document.querySelector('#accept-modal');
  const modal = document.querySelector('#myModal');  

  

  btnNewPortButton.addEventListener("click", function () {
    openModal(modal);
  });
  
  closeModalButton.addEventListener('click', () => {
      modal.classList.remove('open');      
  });
  
  // Código para abrir y cerrar el modal inicial
  function openModal(myModal) {
    modal.classList.add("open");
  }
  
  function closeModal(myModal) {
    modal.classList.remove("open");
  }

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      closeModal(modal);
    }
  });    

  // Asegurarse de que el formulario no se envíe al hacer clic en el botón submit
  document.querySelector('#newPortfolioForm').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  acceptModalButton.addEventListener('click', () => {
    const portfolioName = document.querySelector('#portfolioName').value;
    const broker = document.querySelector('#broker').value;
    const ticker = document.querySelector('#ticker').value;
    const quantity = document.querySelector('#quantity').value;
    const price = document.querySelector('#price').value;

    // Verifica si todos los campos están completos
    if (portfolioName && broker && ticker && quantity && price) {
      createPortfolioTable(portfolioName, broker, ticker, quantity, price);

      // Restablecer valores en inputs excepto Bróker y Ticker
      const inputs = document.querySelectorAll('#newPortfolioForm input:not(#broker):not(#ticker)');
      inputs.forEach(input => {
        input.value = "";
      });

      modal.classList.remove('open');      
    } else {
      alert("Por favor, complete todos los campos antes de continuar.");
    }
  });
    
  modal.classList.remove('open');  

  

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  
  function createPortfolioTable(portfolioName, broker, ticker, quantity, price) {
    // Crear el ID dinámicamente  
    const rowId = `${portfolioName.replace(/\s/g, '').toUpperCase()}_${broker.substring(0, 2).toUpperCase()}_${ticker}`;
    const portfolioID = `portfolio-${portfolioName.replace(/\s/g, '').toUpperCase()}`;
    portfolioName = capitalizeFirstLetter(portfolioName);
    broker = capitalizeFirstLetter(broker);
    const newTable = `
      <section class="contenedor-portfolio">
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
            <tr id="${rowId}" class="portfolio__fila">
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
          
                     
            <div id="btn__newport__user" class="btn__newport__user">
            <button id="btn__newport__button__user" class="btn__newport__button__user">+ Nuevo portfolio</button>
                <div class="btn__newport__Bienvenida_user">
                    <p>¡Enhorabuena, has creado tu primer Portofolio!</p>
                </div>
            </div>


          <div class="modalFila" id="myModalFila-${rowId}">
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

          <div class="modalChanges" id="myModalChanges-${rowId}">
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
                    <input type="submit" id="aplicar-activo" data-row-id="${rowId}" value="Aplicar">
                    <div></div>
                    <input type="button" id="eliminar-activo" class="btn btn-danger" data-row-id="${rowId}" value="Eliminar fila">
                  </div>
                  <input type="button" class="btn btn-dark text-center" id="closeModalChanges" value="Cancelar">
                </form>
            </div>
          </div>
      </section>`; 
      
      
      const btnNewPortContainer = document.querySelector('.btn__newport__container');
      btnNewPortContainer.insertAdjacentHTML('beforebegin', newTable);
      
      const newTableRow = document.getElementById(rowId);
      
      const cotiTH = newTableRow.querySelector('#cotiTH');
      const cantidad = newTableRow.querySelector('#cantidad').textContent;
      const inversion = newTableRow.querySelector('#inversion').textContent;
      
      
      // Ocultar el botón de Nuevo portfolio inicial al haber un portfolio creado
      function hideButtonIfTableExists() {
        const portfolioTables = document.querySelectorAll('.portfolio-table');
        const newPortButtonContainer = document.getElementById('btn__newport__container');
      
        if (portfolioTables.length > 0) {
          newPortButtonContainer.style.display = 'none';
        } else {
          newPortButtonContainer.style.display = 'block';
        }
      }
      // Llama a la función hideButtonIfTableExists
      hideButtonIfTableExists();

      // Fin de Ocultar el botón de Nuevo portfolio inicial al haber un portfolio creado
      
      // Establecer el valor inicial para la diferencia y la diferencia en porcentaje
      const initialValue = parseFloat(price);
      updateDifference(initialValue, cantidad, inversion, newTableRow);

      cotiTH.addEventListener('input', () => {
        const valorActual = cotiTH.value || price; // Utiliza el valor de price cuando el input está vacío
        updateDifference(valorActual, cantidad, inversion, newTableRow);
      });      

      // Código para abrir y cerrar el modal de añadir fila
      const addIcon = document.querySelector("#add-row");
      const myModalFila = document.querySelector(`#myModalFila-${rowId}`);
      const closeModalFila = document.getElementById("closeModalFila");

      addIcon.addEventListener("click", function() {
          myModalFila.style.display = "block";
      });

      closeModalFila.addEventListener("click", function() {
          myModalFila.style.display = "none";
      });

      window.addEventListener("click", function(event) {
          if (event.target == myModalFila) {
              myModalFila.style.display = "none";
          }
      });      

      const btnMenuFilaPort = newTableRow.querySelector('#btnMenuFilaPort');

      // Función para los cálculos de nueva operación en el modalChanges
      function calculateInvestment() {
        // Obtén los valores de los campos de entrada
        var cantidad = parseFloat(document.getElementById("he_comprado_cantidad").value);
        var precio = parseFloat(document.getElementById("he_comprado_precio").value);

        // Calcula la inversión y muestra el resultado en el campo "he_invertido"
        if (!isNaN(cantidad) && !isNaN(precio)) {
          var inversion = cantidad * precio;
          document.getElementById("he_invertido").value = inversion.toFixed(2);
        } else {
          document.getElementById("he_invertido").value = "";
        }

        // Calcula los valores para los campos "cantidad_virtual", "virtualMedia" y "virtualInversion"
        calculateVirtual();
      }

      // Función para calcular los valores de "cantidad_virtual", "virtualMedia" y "virtualInversion"
      function calculateVirtual() {
        // Obtener los valores de la fila de la tabla y los campos "he_comprado_cantidad" y "he_comprado_precio"
        var cantidadTotal = parseFloat(document.getElementById("cantidad").innerHTML);
        var precioMedio = parseFloat(document.getElementById("precioMedio").innerHTML);
        var inversionTotal = parseFloat(document.getElementById("inversion").innerHTML);
        var inversion = parseFloat(document.getElementById("inversion").innerHTML);
        var heCompradoCantidad = parseFloat(document.getElementById("he_comprado_cantidad").value);
        var heCompradoPrecio = parseFloat(document.getElementById("he_comprado_precio").value);

        // Calcular los valores de "cantidad_virtual", "virtualMedia" y "virtualInversion"
        var cantidadVirtual = cantidadTotal + heCompradoCantidad;
        var virtualInversion = inversionTotal + (heCompradoCantidad * heCompradoPrecio);
        var virtualMedia = (virtualInversion / cantidadVirtual);

        // Mostrar los valores en los campos correspondientes
        document.getElementById("cantidad_virtual").value = cantidadVirtual.toFixed(2);
        document.getElementById("virtualMedia").value = virtualMedia.toFixed(2);
        document.getElementById("virtualInversion").value = virtualInversion.toFixed(2);
      }

      // Agrega eventos "input" a los campos "he_comprado_cantidad" y "he_comprado_precio"
      document.getElementById("he_comprado_cantidad").addEventListener("input", calculateInvestment);
      document.getElementById("he_comprado_precio").addEventListener("input", calculateInvestment);

      // Agrega eventos "DOMSubtreeModified" a los campos de la tabla
      document.getElementById("cantidad").addEventListener("input", calculateInversion);
      document.getElementById("precioMedio").addEventListener("input", calculateInversion);
      document.getElementById("inversion").addEventListener("input", calculateInversion);


      function calculateInversion() {
        var cantidad = parseFloat(document.getElementById("cantidad").value);
        var precioMedio = parseFloat(document.getElementById("precioMedio").value);
        var inversion = parseFloat(document.getElementById("inversion").value);
        
        // if (cantidad && precioMedio) {
        //   if (inversion > 0) {
        //     inversion = -inversion;
        //   }
        // } else {
        //   if (inversion < 0) {
        //     inversion = -inversion;
        //   }
        // }
        
        document.getElementById("inversion").value = inversion.toFixed(2);
      }
      
      // Código para abrir y cerrar el modal de editar fila
      const myModalChanges = document.getElementById(`myModalChanges-${rowId}`);
      const closeModalChanges = document.getElementById('closeModalChanges');      
      
      btnMenuFilaPort.addEventListener("click", function() {
        myModalChanges.style.display = "block";
      });
      
      myModalChanges.querySelector('#changesForm').appendChild(closeModalChanges);
      closeModalChanges.addEventListener("click", function() {
        myModalChanges.style.display = "none";
      });
      
      window.addEventListener("click", function(event) {
        if (event.target == myModalChanges) {
          myModalChanges.style.display = "none";
        }
      });      

      // Funciones del botón "Aplicar" del modal de editar fila
      document.addEventListener('click', (e) => {
        if (e.target.id === 'aplicar-activo') {
          e.preventDefault();
      
          const rowId = e.target.getAttribute('data-row-id');
          const row = document.getElementById(rowId);
      
          const cantidadVirtualElement = document.getElementById('cantidad_virtual');
          const virtualMediaElement = document.getElementById('virtualMedia');
      
          const cantidad = parseFloat(cantidadVirtualElement.value);
          const precioMedio = parseFloat(virtualMediaElement.value);
      
          if (!isNaN(cantidad) && !isNaN(precioMedio)) {
            row.querySelector('#cantidad').textContent = cantidad;
            row.querySelector('#precioMedio').textContent = precioMedio;
      
            const inversion = (cantidad * precioMedio).toFixed(2);
            row.querySelector('#inversion').textContent = inversion;
      
            const valorActual = parseFloat(row.querySelector('#cotiTH').value);
      
            if (!isNaN(valorActual)) {
              updateDifference(valorActual, cantidad, inversion, row);
            }
      
            // Limpiar el modal y ocultarlo
            cantidadVirtualElement.value = cantidad;
            virtualMediaElement.value = precioMedio;
            const modalElement = document.getElementById(`myModalChanges-${rowId}`);  
            modalElement.style.display = "none";

            const heCompradoCantidadElement = document.getElementById('he_comprado_cantidad');
            const heCompradoPrecioElement = document.getElementById('he_comprado_precio');
            heCompradoCantidadElement.value = '';
            heCompradoPrecioElement.value = '';

            // Actualizar los campos de cantidad_virtual, virtualMedia y virtualInversion con los nuevos valores guardados
            document.getElementById("cantidad_virtual").value = cantidad;
            document.getElementById("virtualMedia").value = precioMedio;
            document.getElementById("virtualInversion").value = inversion;
          }
        }     
        

        // Funciones del botón "Eliminar" del modal de editar fila
        if (e.target.id === 'eliminar-activo') {
          e.preventDefault();
      
          const rowId = e.target.getAttribute('data-row-id');
          const row = document.getElementById(rowId);
      
          const confirmDelete = window.confirm('¿Eliminar activo del portfolio?');
          if (confirmDelete) {
            // Cerrar el modal y ocultarlo
            const modalElement = document.getElementById(`myModalChanges-${rowId}`);  
            modalElement.style.display = "none";
            
            // Eliminar la fila correspondiente
            row.remove();
      
            // Comprobar si quedan filas en la tabla
            const table = document.querySelector(portfolioID); // Reemplaza "ID_DE_LA_TABLA" con el ID de la tabla del DOM
            const rows = table.querySelectorAll(rowId);
      
            // Si no hay filas, mostrar la tabla vacía
            if (rows.length === 0) {
              const emptyTableMessage = '<tr><td colspan="9">La tabla está vacía</td></tr>';
              table.innerHTML = emptyTableMessage;
            }
          }
        }
      });

      // Agregar un listener al evento 'input' en todos los inputs con la clase 'valorActual-placeholder'
      document.querySelectorAll('.valorActual-placeholder').forEach((inputElement) => {
        inputElement.addEventListener('input', (e) => {
          const row = e.target.closest('tr');
          const cantidad = parseFloat(row.querySelector('#cantidad').textContent);
          const precioMedio = parseFloat(row.querySelector('#precioMedio').textContent);
          const inversion = cantidad * precioMedio;
          const valorActual = parseFloat(e.target.value);

          if (!isNaN(valorActual) && !isNaN(cantidad) && !isNaN(inversion)) {
            updateDifference(valorActual, cantidad, inversion, row);
          }
        });
      });    
      
      
  } 
  
  

  function updateDifference(valorActual, cantidad, inversion, row) {
    const diferencia = (valorActual * cantidad - inversion).toFixed(2);
    const diferenciaPercent = (diferencia / inversion * 100).toFixed(2);
    row.querySelector('#diferencia').textContent = diferencia;
    row.querySelector('#diferenciaPercent').textContent = diferenciaPercent;
  
    // Cambiar el color de fondo de la celda de diferencia en porcentaje
    const diferenciaPercentCell = row.querySelector('#diferenciaPercent');
    const diferenciaPercentValue = parseFloat(diferenciaPercentCell.textContent);
  
    if (diferenciaPercentValue > 0) {
      diferenciaPercentCell.classList.add('bg-up');
      diferenciaPercentCell.classList.remove('bg-down');
      diferenciaPercentCell.classList.remove('bg-white');
    } else if (diferenciaPercentValue < 0) {
      diferenciaPercentCell.classList.add('bg-down');
      diferenciaPercentCell.classList.remove('bg-up');
      diferenciaPercentCell.classList.remove('bg-white');
    } else {
      diferenciaPercentCell.classList.add('bg-white');
      diferenciaPercentCell.classList.remove('bg-up');
      diferenciaPercentCell.classList.remove('bg-down');
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



  




  
  
  // Cierre del codigo completo
  });
  