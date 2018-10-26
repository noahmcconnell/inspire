const url = '//bcw-getter.herokuapp.com/?url=';
const url2 ='http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';
const apiUrl = url + encodeURIComponent(url2);

const quoteApi = axios.create({
  baseURL: apiUrl,
  timeout: 3000
});

export default class QuoteService {
  constructor() {
    this.retryCount = 0;
    this.retryMax = 5;
  }

  getQuote() {
    return quoteApi()
      .then(res => res.data)
      .catch(error => {
        console.error(error);
        if (++this.retryCount > this.retryMax) {
          document.getElementById(
            'toasts'
          ).innerHTML += `<toast-message>Unable to load quote.</toast-message>`;
          return (this.retryCount = 0);
        }
        return this.getQuote();
      });
  }
}
