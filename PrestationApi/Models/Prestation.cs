using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PrestationApi.Models
{
    public class Prestation
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public string CodeChantierId { get; set; }
        public DateTime Date { get; set; }
        public int Duration { get; set; }
        public string Description { get; set; }

        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }

        [ForeignKey(nameof(CodeChantierId))]
        public virtual CodeChantier CodeChantier { get; set; }

    }
}