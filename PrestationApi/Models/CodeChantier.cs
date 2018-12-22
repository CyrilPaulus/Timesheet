using System;
using System.ComponentModel.DataAnnotations;

namespace PrestationApi.Models
{
    public class CodeChantier
    {
        [Key]
        public string Code { get; set; }
        public string Description { get; set; }
        public string Client { get; set; }
        public string Produit { get; set; }
        public DateTime CreationDate { get; set; }
    }
}