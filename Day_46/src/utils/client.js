const client = {
   serverApi: import.meta.env.VITE_SERVER_API,
   setUrl: function (url) {
      this.serverApi = url;
   },
   apiKey: "",
   setApIKey: function (apiKey) {
      this.apiKey = apiKey;
   },
   token: "",
   setToken: function (token) {
      this.token = token;
   },
   send: async function (url, method = "GET", body = null) {
      url = `${this.serverApi}${url}`;
      const headers = {
         "Content-Type": "application/json",
      };

      if (this.apiKey) {
         headers["X-Api-Key"] = this.apiKey;
      }

      const options = {
         method,
         headers,
      };

      if (body) {
         options.body = JSON.stringify(body);
      }

      let response = await fetch(url, options);
      let data = await response.json();

      if (!response.ok) {
         throw new Error(data.message || "Request failed");
      }

      return { res: response, data };
   },

   //http get
   get: function (url) {
      return this.send(url);
   },
   //http post
   post: function (url, body) {
      return this.send(url, "POST", body);
   },
   //http put
   put: function (url, body) {
      return this.send(url, "PUT", body);
   },
   //http patch
   patch: function (url, body) {
      return this.send(url, "PATCH", body);
   },
   //http delete
   delete: function (url) {
      return this.send(url, "DELETE");
   },
};

export default client;
