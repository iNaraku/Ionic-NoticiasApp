import { Article } from "./Article";

export interface TopHeadlines {
  status: string;
  totalResults: number;
  articles: Article[];
}
