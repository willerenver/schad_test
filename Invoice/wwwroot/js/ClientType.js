$(document).ready(function () {
    $(".loader").fadeOut(200);

    $("#btnregistrar").click(function (e) {
        e.preventDefault();
        clear();
        $("#modal-frmclienttype").modal("show");
        $("#title_form").html("Registrar Tipo Cliente");
    });
    //obtener el CustomerType
    $.ajax({
        type: 'GET',
        url: '/CustomerType/CustomerTypeAll',
        dataType: 'json',
        delay: 250,
        success: function (result) {
            $.each(result, function (index, val) {
                $("#CustomerTypeId").append("<option value=" + val.id + ">" + val.description + "</option>");
            });
        }
    });

    $("#frmclienttype").bootstrapValidator({
        message: 'Este valor no es válido',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            Description: {
                message: 'El campo descripcion no es valido',
                validators: {
                    notEmpty: {
                        message: 'Le nombre es descripcion y no puede estar vacío'
                    },
                    stringLength: {
                        min: 5,
                        max: 30,
                        message: 'Le descripcion debe tener más de 5 y menos de 30 caracteres.'
                    }
                }
            }

        }
    }).on('success.form.bv', function (e) {
        // Prevent form submission
        e.preventDefault();
        // Get the form instance
        var $form = $(e.target);
        // Get the BootstrapValidator instance
        var bv = $form.data('bootstrapValidator');
        // Use Ajax to submit form data
        $.ajax({
            url: "/CustomerType/Save", // Url
            data: $("#frmclienttype").serialize(),
            type: "post"
        })
            // Se ejecuta si todo fue bien.
            .done(function (result) {
                if (result == "guardo") {
                    // Mostramos un mensaje de éxito.
                    swal("Exitosamente", "Registro guardado", "success");
                    $("#tbl_clienttype").DataTable().ajax.reload();
                    clear();
                } else if (result == "actualizo") {
                    swal("Exitosamente", "Registro Actualizado", "success");
                    $("#tbl_clienttype").DataTable().ajax.reload();
                } else if (result == "existe") {
                    swal("Advertencia", "Le cliente Existe.", "warning");
                    $("#tbl_clienttype").DataTable().ajax.reload();
                }
                //recarga la datatable
                $("#tbl_client").DataTable().ajax.reload();
                $('#frmclient').bootstrapValidator('resetForm', true);
                // Habilitamos el botón de Submit
                $("#btnsave").prop("disabled", false);
            })
            // Se ejecuta si se produjo un error.
            .fail(function (xhr, status, error) {
                // Mostramos un mensaje de error.
                swal("Error", "Error al intentar Registrar", "error");
                // Habilitamos el botón de Submit
                $("#btnsave").prop("disabled", false);
            });
    });



    //cargar datos tabla
    $('#tbl_clienttype').DataTable({
        autoWidth: true,
        responsive: true,
        scrollX: true,
        processing: true,
        "ajax": {
            'url': "/CustomerType/CustomerTypeAll",
            'type': "GET",
            "datatype": "json",
            dataSrc: ''
        },
        columns: [
            { "data": "id" },
            { "data": "description" },
            {
                "render": function (data, type, row) {
                    return '<a id="btneditar" name="btneditar" class="btn btn-warning btn-sm" onclick="Edit(' + row.id + ')" title="Editar"><i class="fa fa-fw fa-edit fa-lg"></i>Editar</a> <a id="btnborrar" name="btnborrar" class="btn btn-danger btn-sm " onclick="Delete(' + row.id + ')" title="Eliminar"><i class="fa fa-fw  fa-trash-o fa-lg"></i>Eliminar</a>';
                }
            }
        ]
    });

});


function Delete(id) {
    swal({
        title: '¿Está seguro que desea eliminar este tipo cliente?',
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: true,
        closeOnCancel: false
    },
        function (isConfirm) {
            if (isConfirm) {
                swal.close()
                $.ajax({
                    type: 'GET',
                    data: { id: id },
                    url: "/CustomerType/Delete",
                    success: function (resp) {
                        if (resp === "exito") {
                            swal("Exitosamente", "Registro Eliminado", "success");
                            $("#tbl_clienttype").DataTable().ajax.reload();

                        }

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert(errorThrown);
                        swal("Error", errorThrown, "danger");
                    }
                });
            }
            else {
                swal("Cancelado", "Se cancelo la operación", "error");
            }
        });
}

function clear() {
    $('#Description').val("");
    $('#Id').val("");
}

function Edit(id) {
    GetCustomertypeId(id);
    $("#modal-frmclienttype").modal("show");
    $("#title_form").html("Editar Tipo Cliente");
    $("#Description").focus();
}
function GetCustomertypeId(id) {
    $.ajax({
        type: "GET",
        url: '/CustomerType/GetCustomertypeId',
        dataType: "json",
        data: { id: id },
        async: true,
        success: function (data) {
            $('#Description').val(data.description);
            $("#Id").val(data.id);

        }
    });

}