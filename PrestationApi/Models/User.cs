using System;
using System.ComponentModel.DataAnnotations;

namespace PrestationApi.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Code { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime CreationDate { get; set; }
    }
}