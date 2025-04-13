

namespace ServicioJobs.Aplicacion.Helper
{
    public partial class ApiClient
    {
        private readonly HttpClient _httpClient;

        public ApiClient()
        {
            _httpClient = new HttpClient(new HttpClientHandler { UseDefaultCredentials = true });
        }

        public async Task<HttpResponseMessage> GetAsync(string requestUrl)
        {
            var response = await _httpClient.GetAsync(requestUrl, HttpCompletionOption.ResponseHeadersRead);

            return response;
        }

        public async Task<HttpResponseMessage> PosAsync(string requestUrl, List<(string, string)> parametros)
        {
            var keyValuePairs = parametros.Select(p => new KeyValuePair<string, string>(p.Item1, p.Item2));
            var jsonParametros = new FormUrlEncodedContent(keyValuePairs);
            var response = await _httpClient.PostAsync(requestUrl, jsonParametros);

            return response;
        }
        public async Task<HttpResponseMessage> PutAsync(string requestUrl, List<(string, string)> parametros)
        {
            var keyValuePairs = parametros.Select(p => new KeyValuePair<string, string>(p.Item1, p.Item2));
            var jsonParametros = new FormUrlEncodedContent(keyValuePairs);
            var response = await _httpClient.PutAsync(requestUrl, jsonParametros);

            return response;
        }

        public void AddOrUpdateHeader(string name, string value)
        {
            if (!string.IsNullOrEmpty(name) && !string.IsNullOrEmpty(value))
            {
                if (_httpClient.DefaultRequestHeaders.Contains(name))
                    _httpClient.DefaultRequestHeaders.Remove(name);

                _httpClient.DefaultRequestHeaders.Add(name, value);
            }

        }
    }
}
