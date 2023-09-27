using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogPessoal.Model
{
    public class Tema : Auditable
    {
        [Key] // Primary Key Id
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Identity 1,1
        public long Id { get; set; }

        [Column(TypeName ="varchar")]
        [StringLength(250)]
        public string Descricao { get; set; } = string.Empty;

        [InverseProperty ("Tema")]
        public virtual ICollection<Postagem>? Postagem { get; set; }
        
    }
}
