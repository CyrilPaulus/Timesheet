using System;
using System.ComponentModel.DataAnnotations;

namespace PrestationApi.Models
{
    public class CodeChantier
    {
        [Key]
        public string Code { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
    }
}