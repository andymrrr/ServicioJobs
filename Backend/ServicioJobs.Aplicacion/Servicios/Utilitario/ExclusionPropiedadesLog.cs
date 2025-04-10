using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Reflection;

namespace ServicioJobs.Aplicacion.Servicios.Utilitario
{
    public class ExclusionPropiedadesLog : DefaultContractResolver
    {
        protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
        {
            var propiedad = base.CreateProperty(member, memberSerialization);

            // Excluir propiedades marcadas con el atributo ExcludeFromLogging
            if (propiedad.AttributeProvider.GetAttributes(true).OfType<ExcluirDeLogAttribute>().Any())
            {
                propiedad.ShouldSerialize = instance => false; // No serializa
            }

            // Excluir propiedades de tipo ICollection o que sean binarios
            if (propiedad.PropertyType.IsGenericType && propiedad.PropertyType.GetGenericTypeDefinition() == typeof(ICollection<>))
            {
                propiedad.ShouldSerialize = instance => false;
            }
            else if (propiedad.PropertyType == typeof(byte[]))
            {
                propiedad.ShouldSerialize = instance => false;
            }

            return propiedad;
        }
    }

}
