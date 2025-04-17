namespace ServicioJobs.Aplicacion.Helper
{
    public class ApiClient
    {
        public HttpClient CreateClient(TimeSpan timeout)
        {
            return new HttpClient(new HttpClientHandler { UseDefaultCredentials = true })
            {
                Timeout = timeout
            };
        }

        public void AddOrUpdateHeader(HttpClient client, string name, string value)
        {
            if (!string.IsNullOrEmpty(name) && !string.IsNullOrEmpty(value))
            {
                if (client.DefaultRequestHeaders.Contains(name))
                    client.DefaultRequestHeaders.Remove(name);

                client.DefaultRequestHeaders.Add(name, value);
            }
        }

        public async Task<HttpResponseMessage> GetAsync(HttpClient client, string requestUrl)
        {
            return await client.GetAsync(requestUrl, HttpCompletionOption.ResponseHeadersRead);
        }

        public async Task<HttpResponseMessage> PostAsync(HttpClient client, string requestUrl, List<(string, string)> parametros)
        {
            var content = new FormUrlEncodedContent(parametros.Select(p => new KeyValuePair<string, string>(p.Item1, p.Item2)));
            return await client.PostAsync(requestUrl, content);
        }

        public async Task<HttpResponseMessage> PutAsync(HttpClient client, string requestUrl, List<(string, string)> parametros)
        {
            var content = new FormUrlEncodedContent(parametros.Select(p => new KeyValuePair<string, string>(p.Item1, p.Item2)));
            return await client.PutAsync(requestUrl, content);
        }
    }
}
