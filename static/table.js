$('head').append('<link rel="stylesheet" href="//cdn.datatables.net/plug-ins/1.10.7/integration/bootstrap/3/dataTables.bootstrap.css" type="text/css" />');
$(document).ready(function () {
    $('#maintable tfoot th').each( function () {
        var title = $('#maintable thead th').eq( $(this).index() ).text();
        if (title) {
            $(this).html( '<input type="text" class="form-control" placeholder="Search ' + title + '" />' );
        }
    } );

    // Set all cell heights to value of largest cell height
    var maxCellHeight = Math.max.apply(null, $("#maintable td").map(function () {
        return $(this).height();
    }).get());
    $("<style>#maintable td { height: " + maxCellHeight.toString() + "px; }</style>" ).appendTo("head");

    var table = $('#maintable').DataTable({
        processing : true,
        dom : 'rtiS',
        deferRender: true,
        scrollY: "500px",
        stateSave: true,
        columns : [
            {
                width : 'auto'
            },
            {
                width : '10%'
            },
            {
                className : 'text-right',
                orderable : false,
                searchable : false,
                width : '60px'
            }
        ]
    });

    table.columns().eq( 0 ).each( function ( colIdx ) {
        $( 'input', table.column( colIdx ).footer() ).on( 'keyup change', function () {
            table
                .column( colIdx )
                .search( this.value )
                .draw();
        } );
    } );

    var r = $('.dataTables_scrollFoot tfoot');
    $('.dataTables_scrollHead table').append(r);
    $('#search_0').css('text-align', 'center');

    function resizeDataTable () {
        var windowHeight = $(window).height();
        var tableBodyOffset = $('.dataTables_scrollBody').offset().top;
        var tableInfoHeight = $('.dataTables_info').outerHeight();
        var footerHeight = $('.navbar-fixed-bottom').outerHeight();
        $('.dataTables_scrollBody').css('height', (windowHeight - tableBodyOffset - (tableInfoHeight * 2) - footerHeight));
    }

    resizeDataTable();

    $(window).resize(function() {
        resizeDataTable();
    });

    // Force a manual window.resize event; DataTables Scroller plugin won't read proper row heights if we don't
    // Delay the event so that the table and all styling has been applied
    setTimeout(function () {
        $(window).trigger('resize');
    }, 500);

});