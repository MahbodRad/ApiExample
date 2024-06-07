using ApiExample.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Data;
using System.Net.Http;
using System.Net;
using System.Net.Http.Headers;
using System.Reflection;
using System.Text;
using static System.Formats.Asn1.AsnWriter;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ApiExample.Pages
{
    public class IndexModel : PageModel
    {
        public List<Grp> listGrp;
        public List<Kala> listKala;
        public Persons person;
        public List<Orders> listOrders;
        public List<OrderDT> listOrderDT;

        public void OnGet()
        {

        }
        public async Task<IActionResult> OnPostListGroupKala(string username = "", string password = "")
        {
            try
            {
                HttpClient _httpClient = new HttpClient();
                var basicAuthenticationValue =
                        Convert.ToBase64String(
                               Encoding.ASCII.GetBytes($"{username}:{password}"));

                _httpClient.DefaultRequestHeaders.Authorization =
                     new AuthenticationHeaderValue("Basic", basicAuthenticationValue);

                var endpoint = new Uri("https://Api.BenIce.ir/ListGroupKala");

                // اجرای API و گرفتن نتیجه
                var response = await _httpClient.GetAsync(endpoint);

                // اگر نتیجه ای برگشت آنرا تجزیه کند
                if (response != null)
                {
                    // کنترل بازگشت 200 یا 400
                    if (response.StatusCode.ToString() != "OK")
                    {
                        ViewData["MSG"] = response.ToString();
                        ViewData["Switch"] = "MSG";
                    }
                    else
                    {
                        // نتیجه برگشت به صورت جیسون
                        var JsonStr = response.Content.ReadAsStringAsync().Result;
                        // پرکردن مقادیر جیسون در مدل
                        var jObject = JsonConvert.DeserializeObject<List<Grp>>(JsonStr);
                        Grp grp;
                        listGrp = new List<Grp>();
                        //نمایش دیتا
                        foreach (Grp obj in jObject)
                        {
                            grp = new Grp()
                            {
                                Si = obj.Si,
                                Name = obj.Name,
                            };

                            listGrp.Add(grp);
                        }
                        ViewData["Switch"] = "ListGrp";
                    }

                }
                else
                {
                    ViewData["MSG"] = "چیزی ثبت نشده";
                    ViewData["Switch"] = "MSG";
                }

            }
            catch (Exception ex)
            {
                ViewData["MSG"] = ex.Message;
                ViewData["Switch"] = "MSG";
            }

            return new PartialViewResult
            {
                ViewName = "Index_View",
                ViewData = this.ViewData
            };
        }

        public async Task<IActionResult> OnPostListKalaInGruop(string username = "", string password = "", string Grp = "")
        {
            try
            {
                HttpClient _httpClient = new HttpClient();
                var basicAuthenticationValue =
                        Convert.ToBase64String(
                               Encoding.ASCII.GetBytes($"{username}:{password}"));

                _httpClient.DefaultRequestHeaders.Authorization =
                     new AuthenticationHeaderValue("Basic", basicAuthenticationValue);


                var endpoint = new Uri("https://Api.BenIce.ir/ListKalaInGruop?Grp=" + Grp);

                // اجرای API و گرفتن نتیجه
                var response = await _httpClient.GetAsync(endpoint);

                // اگر نتیجه ای برگشت آنرا تجزیه کند
                if (response != null)
                {
                    // کنترل بازگشت 200 یا 400
                    if (response.StatusCode != HttpStatusCode.OK)
                    {
                        ViewData["MSG"] = response.ToString();
                        ViewData["Switch"] = "MSG";
                    }
                    else
                    {
                        // نتیجه برگشت به صورت جیسون
                        var JsonStr = response.Content.ReadAsStringAsync().Result;
                        // پرکردن مقادیر جیسون در مدل
                        
                        var jObject = JsonConvert.DeserializeObject<List<Kala>>(JsonStr);
                        Kala kala;
                        listKala = new List<Kala>();
                        //نمایش دیتا
                        foreach (Kala obj in jObject)
                        {
                            kala = new Kala()
                            {
                                Si = obj.Si,
                                Code = obj.Code,
                                Name = obj.Name,
                                Price = obj.Price,
                            };

                            listKala.Add(kala);
                        }
                        ViewData["Switch"] = "ListKala";
                    }

                }
                else
                {
                    ViewData["MSG"] = "چیزی ثبت نشده";
                    ViewData["Switch"] = "MSG";
                }

            }
            catch (Exception ex)
            {
                ViewData["MSG"] = ex.Message;
                ViewData["Switch"] = "MSG";
            }

            return new PartialViewResult
            {
                ViewName = "Index_View",
                ViewData = this.ViewData
            };
        }

        public async Task<IActionResult> OnPostCustomerInfo(string username = "", string password = "", string mobile = "")
        {
            try
            {

                using (var message = new HttpRequestMessage(HttpMethod.Get, "/someendpoint"))
                {
                    message.Headers.Add("Param1", "Value1");
                }


                HttpClient _httpClient = new HttpClient();
                var basicAuthenticationValue =
                        Convert.ToBase64String(
                               Encoding.ASCII.GetBytes($"{username}:{password}"));

                _httpClient.DefaultRequestHeaders.Authorization =
                     new AuthenticationHeaderValue("Basic", basicAuthenticationValue);

                string parametres = "?";
                parametres += "Mobile=" + mobile;
                var endpoint = new Uri("https://Api.BenIce.ir/CustomerInfo" + parametres);
                
                // اجرای API و گرفتن نتیجه
                var response = await _httpClient.GetAsync(endpoint);

                ///****************************

                // اگر نتیجه ای برگشت آنرا تجزیه کند
                if (response != null)
                {
                    // کنترل بازگشت 200 یا 400
                    if (response.StatusCode != HttpStatusCode.OK)
                    {
                        ViewData["MSG"] = response.ToString();
                        ViewData["Switch"] = "MSG";
                    }
                    else
                    {
                        // نتیجه برگشت به صورت جیسون
                        var JsonStr = response.Content.ReadAsStringAsync().Result;

                        // پرکردن مقادیر جیسون در مدل
                        Persons jObject = JsonConvert.DeserializeObject<Persons>(JsonStr);
                        //نمایش دیتا
                        person = new Persons()
                        {
                            ID = jObject.ID,
                            FName = jObject.FName,
                            LName = jObject.LName,
                            Gender = jObject.Gender,
                            Group = jObject.Group,
                            Mobile = jObject.Mobile,
                            Number = jObject.Number,
                        };
                        ViewData["Switch"] = "ListPerson";
                    }

                }
                else
                {
                    ViewData["MSG"] = "چیزی ثبت نشده";
                    ViewData["Switch"] = "MSG";
                }

            }
            catch (Exception ex)
            {
               ViewData["MSG"] = ex.Message;
               ViewData["Switch"] = "MSG";
            }

            return new PartialViewResult
            {
                ViewName = "Index_View",
                ViewData = this.ViewData
            };
        }

        public async Task<IActionResult> OnPostCustomerOrders(string username = "", string password = "", string CustomerId = "", string FromDate = "", string ToDate = "")
        {
            try
            {
                HttpClient _httpClient = new HttpClient();
                var basicAuthenticationValue =
                        Convert.ToBase64String(
                               Encoding.ASCII.GetBytes($"{username}:{password}"));

                _httpClient.DefaultRequestHeaders.Authorization =
                     new AuthenticationHeaderValue("Basic", basicAuthenticationValue);


                // ست کردن پارامترها
                string parametres = "?";
                parametres += "CustomerId=" + CustomerId;
                parametres += "&FromDate=" + FromDate;
                parametres += "&ToDate=" + ToDate;

                var endpoint = new Uri("https://Api.BenIce.ir/CustomerOrders" + parametres);

                // اجرای API و گرفتن نتیجه
                var response = await _httpClient.GetAsync(endpoint);
                ///****************************
                // اگر نتیجه ای برگشت آنرا تجزیه کند
                if (response != null)
                {
                    // کنترل بازگشت 200 یا 400
                    if (response.StatusCode.ToString() != "OK")
                    {
                        ViewData["MSG"] = response.ToString();
                        ViewData["Switch"] = "MSG";
                    }
                    else
                    {
                        // نتیجه برگشت به صورت جیسون
                        var JsonStr = response.Content.ReadAsStringAsync().Result;
                        // پرکردن مقادیر جیسون در مدل
                        var jObject = JsonConvert.DeserializeObject<List<Orders>>(JsonStr);
                        Orders order;
                        listOrders = new List<Orders>();
                        //نمایش دیتا
                        foreach (Orders obj in jObject)
                        {
                            order = new Orders()
                            {
                                OrderID = obj.OrderID,
                                CustomerID = obj.CustomerID,
                                DateKharid = obj.DateKharid,
                                ProductsCost = obj.ProductsCost,
                                OtherCost = obj.OtherCost,
                                TotalAmount = obj.TotalAmount,
                                StoreName = obj.StoreName,
                                AreaDS = obj.AreaDS,
                            };

                            listOrders.Add(order);
                        }
                        ViewData["Switch"] = "ListOrders";
                    }

                }
                else
                {
                    ViewData["MSG"] = "چیزی ثبت نشده";
                    ViewData["Switch"] = "MSG";
                }

            }
            catch (Exception ex)
            {
                ViewData["MSG"] = ex.Message;
                ViewData["Switch"] = "MSG";
            }

            return new PartialViewResult
            {
                ViewName = "Index_View",
                ViewData = this.ViewData
            };
        }

        public async Task<IActionResult> OnPostCustomerFactor(string username = "", string password = "", string CustomerId = "", string OrderID = "")
        {
            try
            {
                HttpClient _httpClient = new HttpClient();
                var basicAuthenticationValue =
                        Convert.ToBase64String(
                               Encoding.ASCII.GetBytes($"{username}:{password}"));

                _httpClient.DefaultRequestHeaders.Authorization =
                     new AuthenticationHeaderValue("Basic", basicAuthenticationValue);

                // ست کردن پارامترها
                string parametres = "?";
                parametres += "CustomerId=" + CustomerId;
                parametres += "&OrderID=" + OrderID;

                var endpoint = new Uri("https://Api.BenIce.ir/CustomerFactor" + parametres);

                // اجرای API و گرفتن نتیجه
                var response = await _httpClient.GetAsync(endpoint);

                // اگر نتیجه ای برگشت آنرا تجزیه کند
                if (response != null)
                {
                    // کنترل بازگشت 200 یا 400
                    if (response.StatusCode.ToString() != "OK")
                    {
                        ViewData["MSG"] = response.ToString();
                        ViewData["Switch"] = "MSG";
                    }
                    else
                    {
                        // نتیجه برگشت به صورت جیسون
                        var JsonStr = response.Content.ReadAsStringAsync().Result;
                        // پرکردن مقادیر جیسون در مدل
                        var jObject = JsonConvert.DeserializeObject<List<OrderDT>>(JsonStr);
                        OrderDT orderDt;
                        listOrderDT = new List<OrderDT>();
                        //نمایش دیتا
                        foreach (OrderDT obj in jObject)
                        {
                            orderDt = new OrderDT()
                            {
                                ProductCode = obj.ProductCode,
                                KalaName = obj.KalaName,
                                OrderCount = obj.OrderCount,
                                Price = obj.Price,
                            };

                            listOrderDT.Add(orderDt);
                        }
                        ViewData["Switch"] = "ListOrderDT";
                    }

                }
                else
                {
                    ViewData["MSG"] = "چیزی ثبت نشده";
                    ViewData["Switch"] = "MSG";
                }

            }
            catch (Exception ex)
            {
                ViewData["MSG"] = ex.Message;
                ViewData["Switch"] = "MSG";
            }

            return new PartialViewResult
            {
                ViewName = "Index_View",
                ViewData = this.ViewData
            };
        }
    }
}