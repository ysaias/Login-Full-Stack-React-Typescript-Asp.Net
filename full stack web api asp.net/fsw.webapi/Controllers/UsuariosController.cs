
using fsw.webapi.DTOs;
using fsw.webapi.DTOs.Request;
using fsw.webapi.DTOs.Response;
using fsw.webapi.Repositorios;
using fsw.webapi.Repositorios.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace fsw.webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {

        private readonly AppDbContext Context;
        private readonly IConfiguration Configuration;

        public UsuariosController(AppDbContext context, IConfiguration configuration)
        {
            Context = context;
            Configuration = configuration;
        }

        private LoginResponseDto Token(UsuarioDto usuarioDto) 
        {
            try
            {
                var expires = DateTime.UtcNow.AddHours(16);
                var claims = new List<Claim>() {

                    new Claim("SystemName", usuarioDto.SystemName)

                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JwtKey"]));
                var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
                var securityToken = new JwtSecurityToken(

                        issuer: null,
                        audience: null,
                        claims: claims,
                        expires: expires,
                        signingCredentials: credentials
                    );
                return new LoginResponseDto
                {
                    Token = new JwtSecurityTokenHandler().WriteToken(securityToken)
                };
            } catch (Exception ex) {

                return new LoginResponseDto
                {
                    Token = "ERROR: " + ex.Message
                };
            }


           
        }

        private string encripted(string texto)
        {
            SHA512 sHA512 = SHA512.Create();
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] textoEnBytes = sHA512.ComputeHash(encoding.GetBytes(texto));
            StringBuilder textoEncriptado = new StringBuilder();
            for (int i = 0; i < textoEnBytes.Length; i++)
            {
                textoEncriptado.AppendFormat("{0:x2}", textoEnBytes[i]);
            }
            return textoEncriptado.ToString();
        }


        [HttpPost("registrar")]
        public async ValueTask<ActionResult<LoginResponseDto>> Crear([FromBody]LoginRequestDto login)
        {
            try
            {
                var encriptedPassword = encripted(login.Password);
                var usuario = new Usuario { Nombre = login.Username, Password = encriptedPassword };
                await Context.Usuarios.AddAsync(usuario);
                await Context.SaveChangesAsync();
                var query = from tUsuarios in Context.Usuarios
                    where tUsuarios.Nombre == login.Username
                    select new UsuarioDto
                    {
                        Id = tUsuarios.Id,
                        SystemName = tUsuarios.Nombre,
                        Password = "A"
                    };
                var nuevoUsuario = await query.FirstAsync();
                return Ok(Token(nuevoUsuario));

            }
            catch (Exception ex) 
            { 
               return BadRequest(ex.Message);
            
            }
        
        }

        [HttpPost("login")]
        public async ValueTask<ActionResult<LoginResponseDto>> Login([FromBody] LoginRequestDto login)
        {
            try
            {
                var encriptedPassword = encripted(login.Password);
               
                var query = from tUsuarios in Context.Usuarios
                            where tUsuarios.Nombre == login.Username && tUsuarios.Password == encriptedPassword
                            select new UsuarioDto
                            {
                                Id = tUsuarios.Id,
                                SystemName = tUsuarios.Nombre,
                                Password = "A"
                            };
                var usuario = await query.FirstAsync();
                if (usuario == null) 
                {
                    return NotFound("No ha sido posible identificarf al usuario ");
                }

                return Ok(Token(usuario as UsuarioDto));

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }

        }
    }
}
