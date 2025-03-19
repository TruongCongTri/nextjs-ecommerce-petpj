import { apiConfig } from "@/data/api";

const quote = {
  async getQuotes() {
    const res = await fetch(`${apiConfig.quote.quotes}`);
    return res;
  },
  async getQuoteDetails(quoteId: number) {
    const res = await fetch(`${apiConfig.quote.quotes}/${quoteId}`);
    return res;
  },
};

export default quote;
