import { useSelector } from "react-redux";

import { Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  AuthorName,
  CardContainer,
  CardWrapper,
  NewsContentBox,
  NewsImage,
  NewsLink,
  NewsPublicationDate,
  NewsTitle,
} from "./StyledComponents";

const NewsCard = () => {
  const news = useSelector((state) => state.news);
  // const news2 = useSelector((state) => state.newsNyTimes);
  // const news3 = useSelector((state) => state.newsTheGuardian);




  // console.log(sourceList, "sourceList");
  // console.log(authorList, "authorList");
  console.log(news, "newsApi");
  // console.log(newsMeta, "newsMeta");
  // console.log(news2, "news2NYtimes");
  // console.log(news2Meta, "news2Meta");
  // console.log(news3, "news3theguardian");
  // console.log(news3Meta, "news3Meta");

  const newsWithImageContentfilter = news.filter((news) => news.ImageContent);
  // const news2filter = news2.filter((news2) => news2.ImageContent);
  // const news3filter = news3.filter((news3) => news3.ImageContent);

  // const mergedNews = [...newsfilter, ...news2filter, ...news3filter];

  return (
    <CardWrapper maxWidth="lg">
      {newsWithImageContentfilter && newsWithImageContentfilter?.map((articles, index) => (
        <CardContainer key={index}>
          <Box>
            <NewsImage src={articles?.ImageContent} alt="news_img" />
          </Box>
          <NewsContentBox>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ width: "100%" }}>
                <NewsPublicationDate variant="subtitle2">
                  {articles?.PublishedDate && (
                    <Box sx={{ textAlign: "end" }}>
                      {new Date(articles.PublishedDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </Box>
                  )}
                </NewsPublicationDate>
              </Box>
              <NewsTitle variant="h6">{articles?.Headline}</NewsTitle>
              {articles?.ExternalLink && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <NewsLink
                    href={articles.ExternalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                  </NewsLink>
                  <ArrowForwardIcon sx={{ height: "14px" }} />
                </Box>
              )}
            </Box>
            <Box sx={{ textAlign: "end" }}>
              {!articles?.Author?.startsWith("http://") &&
                !articles?.Author?.startsWith("https://") &&
                articles?.Author && (
                  <AuthorName>Author: {articles?.Author}</AuthorName>
                )}
            </Box>
          </NewsContentBox>
        </CardContainer>
      ))}
    </CardWrapper>
  );
};

export default NewsCard;
