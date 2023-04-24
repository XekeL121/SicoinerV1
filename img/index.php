<!DOCTYPE html>
<html lang="es">
  <head>
    <?php
    include "includes/head.php";
    ?> 
  </head>
  <body class="container-full"> 

    <header class="cabecera row azul4">

      <div class="logo d-grid col-md-4 col-12 my-auto text-center justify-content-end">
        <img class="col-12 mx-auto" src="img/Isotipo Sicoiner v1.png" alt="">
        <p class="col-12 op50 d-flex mt-1 text-uppercase letter-spacing-3 text-light op80 mx-auto justify-content-center w-s">- Tu portfolio digital -</p>
      </div>       
      
      <nav class="col-sm-8 col-12 pt-2">
        <div class="menu row d-flex align-items-center">
          <a href="home.html" class="col-sm row align-items-center justify-content-end">
            <img class="icon op80 col-6" src="img/app_registration_white_24dp.svg" alt="">
            <h4 class="text-light col-6 ml-2">Portfolios</h4>
          </a>
          
          <a href="historial.html" class="col-sm row align-items-center justify-content-center">
            <img class="icon op80 col-6" src="img/insights_white_24dp.svg" alt="">
            <h4 class="text-light col-6 ml-2">Historial</h4>
          </a>
          
          <div class="col-sm row align-items-center justify-content-start">
            <img class="icon col-6" src="img/account_circle_white_24dp.svg" alt="">
            <img class="icon col-6" src="img/arrow_drop_down_white_18dp.svg" alt="">
          </div>
        </div>
      </nav>

      <!-- Menú Responsive -->
      <div class="menuResponsive row col-12 align-items-center mx-auto justify-content-center mb-3">     
          <div class="col-3 d-flex justify-content-center">
            <img class="icon" src="img/app_registration_white_24dp.svg" alt="">
          </div>
          <div class="col-3 d-flex justify-content-center">
            <img class="icon" src="img/insights_white_24dp.svg" alt="">
          </div>
          <div class="col-3 d-flex justify-content-center row nowrap">
            <img class="icon" src="img/account_circle_white_24dp.svg" alt="">
            <img class="icon" src="img/arrow_drop_down_white_18dp.svg" alt="">
          </div>
      </div>
      <!-- Fin Menú Responsive -->

    </header>

    <div class="nav2 d-flex no-wrap">
      <div class="noticias w-s col-sm-9 col-xs-8 col-12 col-xl-10 azul5 texto-naranja pb-1 pt-2 px-2 d-flex row align-items-center">
         <p>noticias noticias noticias noticias noticias</p>
      </div>
      <div class="subMenu d-flex col-sm-3 col-xs-4 col-12 col-xl-2 text-light">
        <button class="w-50 pt-1 text-light bg-transparent">Cálculos</button>
        <button class="w-50 pt-1 text-light bg-transparent">Alertas</button>
      </div>       
    </div>


    <div class="contenedor bg-dark row text-center justify-content-center p-2">



      <div class="titPort d-flex col-md-8 col-12 nowrap justify-content-center">
        <div class="tarjeta bg-warning mt-2 col w-s">Tarjeta 1</div>
        <div class="tarjeta bg-warning mt-2 col w-s">Tarjeta 1</div>
        <div class="tarjeta bg-warning mt-2 col w-s">Tarjeta 1</div>
        <div class="tarjeta bg-warning mt-2 col w-s">Tarjeta 1</div>
        <div class="tarjeta bg-warning mt-2 col w-s">Tarjeta 1</div>
        <div class="tarjeta bg-warning mt-2 col w-s">Tarjeta 1</div>
        <div class="tarjeta bg-warning mt-2 col w-s">Tarjeta 1</div> 
      </div>









    </div>

    <footer class="col justify-content-center text-center bg-primary">
      <p>Pie de página</p>
    </footer>















    <!-- Optional JavaScript; choose one of the two! -->

    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-p34f1UUtsS3wqzfto5wAAmdvj+osOnFyQFpp4Ua3gs/ZVWx6oOypYoCJhGGScy+8" crossorigin="anonymous"></script>

    <!-- Option 2: Separate Popper and Bootstrap JS -->
    <!--
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.min.js" integrity="sha384-lpyLfhYuitXl2zRZ5Bn2fqnhNAKOAaM/0Kr9laMspuaMiZfGmfwRNFh8HlMy49eQ" crossorigin="anonymous"></script> -->

  <!-- Code injected by live-server -->
<script type="text/javascript">
	// <![CDATA[  <-- For SVG support
	if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				if (msg.data == 'reload') window.location.reload();
				else if (msg.data == 'refreshcss') refreshCSS();
			};
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				console.log('Live reload enabled.');
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
	else {
		console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
	}
	// ]]>
</script></body>
</html>
    





