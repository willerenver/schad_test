using Invoice.Dto;
using Invoice.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Invoice.Services
{
    public class ClientService
    {
        private readonly Test_InvoiceContext _db;
        public ClientService(Test_InvoiceContext test_InvoiceContext)
        {
            _db = test_InvoiceContext;
        }

        public async Task<List<CustomerDto>> GetCustomerAll()
        {
            var clients = await _db.Customers.Include(x => x.CustomerType).Select(x => new CustomerDto
            {
                Id = x.Id,
                CustomerName = x.CustName,
                Status = x.Status,
                Adress = x.Adress,
                CustomerTypeId = x.CustomerTypeId,
                CustomerType = x.CustomerType.Description

            }).ToListAsync();
            return clients;
        }


        public async Task<CustomerDto> GetCustomerId(int id)
        {
            var clients = await _db.Customers.Include(x => x.CustomerType).Select(x => new CustomerDto
            {
                Id = x.Id,
                CustomerName = x.CustName,
                Status = x.Status,
                Adress = x.Adress,
                CustomerTypeId = x.CustomerTypeId,
                CustomerType = x.CustomerType.Description

            }).Where(x => x.Id == id).FirstOrDefaultAsync();
            return clients;
        }
        public string Save(CustomerDto customerDto)
        {
            string result = string.Empty;
            try
            {
                if (customerDto.Id == 0)
                {
                    if (Exist(customerDto.CustomerName))
                    {
                        return result = "existe";
                    }
                }
                else
                {
                    if (Update(customerDto))
                    {
                        return result = "actualizo";
                    }

                }

                var customer = new Customer
                {
                    CustName = customerDto.CustomerName,
                    Adress = customerDto.Adress,
                    Status = customerDto.Status,
                    CustomerTypeId = customerDto.CustomerTypeId
                };

                if (customer != null)
                {
                    _db.Customers.Add(customer);
                    _db.SaveChanges();

                }
                return result = "guardo";
            }
            catch (Exception ex)
            {
                return result = "hubo un error" + ex.Message;
            }

        }
        public bool Update(CustomerDto customerDto)
        {
            try
            {

                var customer = _db.Customers.FirstOrDefault(t => t.Id == customerDto.Id);

                if (customer != null)
                {
                    customer.CustName = customerDto.CustomerName;
                    customer.Adress = customerDto.Adress;
                    customer.Status = customerDto.Status;
                    customer.CustomerTypeId = customerDto.CustomerTypeId;

                    _db.SaveChanges();
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Exist(string CustomerName)
        {
            var user = _db.Customers.FirstOrDefault(t => t.CustName == CustomerName);
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
                var customer = _db.Customers.FirstOrDefault(t => t.Id == id);
                if (customer != null)
                {
                    _db.Customers.Remove(customer);
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
