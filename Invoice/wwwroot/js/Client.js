$(document).ready(function () {
    $(".loader").fadeOut(200);

    $("#btnregistrar").click(function (e) {
        e.preventDefault();
        clear();
        $("#modal-frmclient").modal("show");
        $("#title_form").html("Registrar Cliente");
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

    $("#frmclient").bootstrapValidator({
        message: 'Este valor no es válido',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            CustomerName: {
                message: 'El campo nombre no es valido',
                validators: {
                    notEmpty: {
                        message: 'Le nombre es obligatorio y no puede estar vacío'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: 'Le nombre debe tener más de 6 y menos de 50 caracteres.'
                    }
                }
            },
            Adress: {
                message: 'La campo direccion no es valido',
                validators: {
                    notEmpty: {
                        message: 'la direccion es obligatorio y no puede estar vacío'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: 'La direccion debe tener más de 6 y menos de 50 caracteres.'
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
            url: "/Client/Save", // Url
            data: $("#frmclient").serialize(),
            type: "post"
        })
            // Se ejecuta si todo fue bien.
            .done(function (result) {
                if (result == "guardo") {
                    // Mostramos un mensaje de éxito.
                    swal("Exitosamente", "Registro guardado", "success");
                    $("#tbl_client").DataTable().ajax.reload();
                    clear();
                } else if (result == "actualizo") {
                    swal("Exitosamente", "Registro Actualizado", "success");
                    $("#tbl_client").DataTable().ajax.reload();
                } else if (result == "existe") {
                    swal("Advertencia", "Le cliente Existe.", "warning");
                    $("#tbl_client").DataTable().ajax.reload();
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
    $('#tbl_client').DataTable({
        autoWidth: true,
        responsive: true,
        scrollX: true,
        processing: true,
        "ajax": {
            'url': "/Client/GetCustomerAll",
            'type': "GET",
            "datatype": "json",
            dataSrc: ''
        },
        columns: [
            { "data": "id" },
            { "data": "customerName" },
            { "data": "adress" },
            {

                "render": function (data, type, row) {

                    if (row.status == 1) {
                        return '<span class="label label-success">ACTIVO</span>';
                    } else {
                        return '<span class="label label-danger">NO ACTIVO</span>';
                    }
                }
            },
            { "data": "customerType" },
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
        title: '¿Está seguro que desea eliminar este Cliente?',
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
                    url: "/Client/Delete",
                    success: function (resp) {
                        if (resp == "exito") {
                            swal("Exitosamente", "Registro Eliminado", "success");
                            $("#tbl_client").DataTable().ajax.reload();

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
    $('#CustomerName').val("");
    $('#Adress').val("");
    $('#Id').val("");
}

function Edit(id) {
    GetClientId(id);
    $("#modal-frmclient").modal("show");
    $("#title_form").html("Editar Cliente");
    $("#CustomerName").focus();
}
function GetClientId(id) {
    $.ajax({
        type: "GET",
        url: '/Client/GetClientId',
        dataType: "json",
        data: { id: id },
        async: true,
        success: function (data) {
            $('#CustomerName').val(data.customerName);
            $("#Id").val(data.id);
            $("#Adress").val(data.adress);
            $("#CustomerTypeId").val('' + data.customerTypeId + '').trigger('change');
            $("#Status").val('' + data.status + '').trigger('change');
        }
    });

}