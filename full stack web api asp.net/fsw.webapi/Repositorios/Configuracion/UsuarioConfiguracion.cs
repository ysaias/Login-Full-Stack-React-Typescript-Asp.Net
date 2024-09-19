using fsw.webapi.Repositorios.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace fsw.webapi.Repositorios.Configuracion
{
    public class UsuarioConfiguracion : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.ToTable("Usuarios");
            builder.HasKey(x => x.Id);

            builder.Property(x  => x.Id)
                .HasColumnName("Id");

            builder.Property(x => x.Nombre)
                .HasColumnName("Username");

            builder.Property(x => x.Password)
                .HasColumnName("Password");
        }
    }
}
