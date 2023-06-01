namespace API.Errors
{
    public class ApiException
    {
        public ApiException(int statusCode, string messsage, string detalis)
        {
            this.StatusCode = statusCode;
            this.Messsage = messsage;
            this.Detalis = detalis;

        }
        public int StatusCode { get; set; }
        public string Messsage { get; set; }
        public string Detalis { get; set; }
    }
}