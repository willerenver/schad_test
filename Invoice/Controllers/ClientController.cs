using Invoice.Dto;
using Invoice.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Invoice.Controllers
{
    public class ClientController : Controller
    {

        private readonly ClientService _service;
        public ClientController(ClientService clientService)
        {
            _service = clientService;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult ClientType()
        {
            return View();
        }


        [HttpGet]
        public async Task<IActionResult> GetCustomerAll()
        {
            var result = await _service.GetCustomerAll();
            return Ok(result);

        }
        [HttpPost]

        public IActionResult Save(CustomerDto customerDto)
        {
            var result = _service.Save(customerDto);
            return Ok(result);
        }

        [HttpGet]
        public ActionResult Delete(int id)
        {
            var result = _service.Delete(id);
            if (result)
            {
                return Ok("exito");
            }
            else
            {
                return Ok("fallo");
            }
        }

        [HttpGet]
        public async Task<ActionResult> GetClientId(int id)
        {
            var result = await _service.GetCustomerId(id);
            return Ok(result);
        }


    }
}
