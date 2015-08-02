using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace simple_form.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return Redirect("/Registration.html");
        }

        public ActionResult Echo()
        {
            string[] keys = Request.Form.AllKeys;
            
            for (int i = 0; i < keys.Length; i++)
            {
                Response.Write(keys[i] + ": <strong>" + Request.Form[keys[i]] + "</strong><br>");
            }
            return View();
        }
    }
}
