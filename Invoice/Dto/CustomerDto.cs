using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Invoice.Dto
{
    public class CustomerDto
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string Adress { get; set; }
        public bool? Status { get; set; }
        public string CustomerType { get; set; }
        public int CustomerTypeId { get; set; }
    }

}
