using Invoice.Models;
using Invoice.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Invoice.Controllers
{
    public class CustomerTypeController : Controller
    {
        private readonly CustomerTypeService _services;
        public CustomerTypeController(CustomerTypeService customerTypeService)
        {
            _services = customerTypeService;
        }
        public IActionResult Index()
        {
            return View();
        }
        public async Task<IActionResult> CustomerTypeAll()
        {
            var result = await _services.GetcustomerTypeAll();
            return Ok(result);
        }
    
        [HttpPost]

        public IActionResult Save(CustomerType customeryTypeDto)
        {
            var result = _services.Save(customeryTypeDto);
            return Ok(result);
        }

        [HttpGet]
        public ActionResult Delete(int id)
        {
            var result = _services.Delete(id);
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
        public async Task<ActionResult> GetCustomertypeId(int id)
        {
            var result = await _services.GetCustomerTypeId(id);
            return Ok(result);
        }




    }

}
