using Invoice.Dto;
using Invoice.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Invoice.Services
{
    public class CustomerTypeService
    {
        private readonly Test_InvoiceContext _db;

        public CustomerTypeService(Test_InvoiceContext test_InvoiceContext)
        {
            _db = test_InvoiceContext;
        }

        public async Task<List<CustomerType>> GetcustomerTypeAll()
        {
            var customtype = await _db.CustomerTypes.ToListAsync();
            return customtype;
        }

        public async Task<CustomerType> GetCustomerTypeId(int id)
        {
            var customertype = await _db.CustomerTypes.Where(x => x.Id == id).FirstOrDefaultAsync();
            return customertype;
        }
        public string Save(CustomerType customerTypedto)
        {
            string result = string.Empty;
            try
            {
                if (customerTypedto.Id == 0)
                {
                    if (Exist(customerTypedto.Description))
                    {
                        return result = "existe";
                    }
                }
                else
                {
                    if (Update(customerTypedto))
                    {
                        return result = "actualizo";
                    }

                }

                var type = new CustomerType
                {
                    Description = customerTypedto.Description

                };

                if (type != null)
                {
                    _db.CustomerTypes.Add(type);
                    _db.SaveChanges();

                }
                return result = "guardo";
            }
            catch (Exception ex)
            {
                return result = "hubo un error" + ex.Message;
            }

        }
        public bool Update(CustomerType customertype)
        {
            try
            {

                var customer = _db.CustomerTypes.FirstOrDefault(t => t.Id == customertype.Id);

                if (customer != null)
                {
                    customer.Description = customertype.Description;

                    _db.SaveChanges();
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Exist(string customertype)
        {
            var user = _db.CustomerTypes.FirstOrDefault(t => t.Description == customertype);
            if (user != null)
            {
                return true;
            }
            return false;
        }

        public bool Delete(int id)
        {
            try
            {
                var customer = _db.CustomerTypes.FirstOrDefault(t => t.Id == id);
                if (customer != null)
                {
                    _db.CustomerTypes.Remove(customer);
                    _db.SaveChanges();
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}

