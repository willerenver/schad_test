$(document).ready(function () {
    $(".loader").fadeOut(500);
    $.ajax({
        type: "GET",
        url: '/Home/GetResult',
        dataType: "json",
        async: true,
        success: function (data) {
            $("#totalrealizada").html(data);
        }
    });

    $.ajax({
        type: "GET",
        url: '/Home/GetResultProcess',
        dataType: "json",
        async: true,
        success: function (data) {
            $("#totalrealizadaproceso").html(data);
        }
    });

    $.ajax({
        type: "GET",
        url: '/Home/GetResultProduct',
        dataType: "json",
        async: true,
        success: function (data) {
            $("#totalproducto").html(data);
        }
    });

    $.ajax({
        type: "GET",
        url: '/Home/GetResultOrder',
        dataType: "json",
        async: true,
        success: function (data) {
            $("#totalsalida").html(data);
        }
    });

    // Get context with jQuery - using jQuery's .get() method.
    var salesChartCanvas = $('#salesChart').get(0).getContext('2d');
    // This will get the first returned node in the jQuery collection.
    var salesChart = new Chart(salesChartCanvas);




    var salesChartData = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
            {
                label: 'Recepcion de Almacen',
                fillColor: 'rgb(221, 75, 57)',
                strokeColor: 'rgb(210, 214, 222)',
                pointColor: 'rgb(221, 75, 57)',
                pointStrokeColor: '#004976',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgb(220,220,220)',
                data: [13, 127, 160, 214, 188, 56, 7, 1, 7, 36, 7]
            },
            {
                label: 'Salida de almacen',
                fillColor: 'rgb(0, 73, 118)',
                strokeColor: 'rgb(210, 214, 222)',
                pointColor: 'rgb(0, 73, 118)',
                pointStrokeColor: '#004976',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgb(220,220,220)',
                data: [13]
            }

        ]
    };
    var salesChartOptions = {
        // Boolean - If we should show the scale at all
        showScale: true,
        // Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: false,
        // String - Colour of the grid lines
        scaleGridLineColor: 'rgba(0,0,0,.05)',
        // Number - Width of the grid lines
        scaleGridLineWidth: 1,
        // Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,
        // Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,
        // Boolean - Whether the line is curved between points
        bezierCurve: true,
        // Number - Tension of the bezier curve between points
        bezierCurveTension: 0.3,
        // Boolean - Whether to show a dot for each point
        pointDot: false,
        // Number - Radius of each point dot in pixels
        pointDotRadius: 4,
        // Number - Pixel width of point dot stroke
        pointDotStrokeWidth: 1,
        // Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius: 20,
        // Boolean - Whether to show a stroke for datasets
        datasetStroke: true,
        // Number - Pixel width of dataset stroke
        datasetStrokeWidth: 2,
        // Boolean - Whether to fill the dataset with a color
        datasetFill: true,
        // String - A legend template
        legendTemplate: '<ul class=\'<%=name.toLowerCase()%>-legend\'><% for (var i=0; i<datasets.length; i++){%><li><span style=\'background-color:<%=datasets[i].lineColor%>\'></span><%=datasets[i].label%></li><%}%></ul>',
        // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
        maintainAspectRatio: true,
        // Boolean - whether to make the chart responsive to window resizing
        responsive: true
    };

    // Create the line chart
    salesChart.Line(salesChartData, salesChartOptions);
});
