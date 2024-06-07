using ApiExample.Models;

namespace ApiExample.Models
{
    public class Orders
    {
        public string OrderID { get; set; }
        public string CustomerID { get; set; }
        public string DateKharid { get; set; }
        public string ProductsCost { get; set; }
        public string OtherCost { get; set; }
        public string TotalAmount { get; set; }
        public string AreaDS { get; set; }
        public string StoreName { get; set; }
    }
}
