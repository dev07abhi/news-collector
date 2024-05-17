const newsOrgParser = (newsOrgResponse) => {
  const newArray = newsOrgResponse?.articles?.map((nolItem) => {
    // Create a new object with only the selected fields
    const newObject = {
      Headline: nolItem?.title,
      DescriptionText1: nolItem?.description,
      DescriptionText2: nolItem?.content,
      Author: nolItem?.author,
      Source: nolItem?.source?.name,
      PublishedDate: nolItem?.publishedAt,
      ImageContent: nolItem?.urlToImage,
      ExternalLink: nolItem?.url,
    };

    return newObject;
  });
  const sources = newsOrgResponse?.articles
    ?.map((nolItem) => nolItem?.source?.name?.trim())
    .filter((sourceName) => sourceName);
  const authors = newsOrgResponse?.articles
    ?.map((nolItem) => nolItem?.author?.trim())
    .filter((authorName) => authorName);
  const metaInfo = { totalRecords: newsOrgResponse?.totalResults };
  return {
    TransformedList: newArray,
    Sources: sources,
    Authors: authors,
    MetaInfo: metaInfo,
  };
};

const nyTimesParser = (nyTimeResponse) => {
  const newArray = nyTimeResponse?.response?.docs?.map((nylItem) => {
    // Create a new object with only the selected fields
    const newObject = {
      Headline: nylItem?.headline?.main,
      DescriptionText1: nylItem?.abstract,
      DescriptionText2: nylItem?.lead_paragraph,
      Author: `${nylItem?.byline?.person[0]?.firstname} ${nylItem?.byline?.person[0]?.lastname}`,
      Source: nylItem?.source,
      PublishedDate: nylItem?.pub_date,
      ImageContent: `https://www.nytimes.com/${
        nylItem?.multimedia?.find((mm) => mm.subType === "mediumThreeByTwo440")
          ?.url
      }`,
      ExternalLink: nylItem?.web_url,
    };

    return newObject;
  });

  const sources = newArray?.reduce((uniqueSources, nylItem) => {
    const trimmedSource = nylItem?.Source?.trim();
    if (trimmedSource && !uniqueSources.includes(trimmedSource)) {
      uniqueSources.push(trimmedSource);
    }
    return uniqueSources;
  }, []);

  const authors = newArray
    ?.map((nylItem) => nylItem?.Author?.trim())
    .filter((authorName) => authorName);
  const metaInfo = { totalRecords: nyTimeResponse?.response?.meta.hits };
  return {
    TransformedList: newArray,
    Sources: sources,
    Authors: authors,
    MetaInfo: metaInfo,
  };
};

const theGuardianParser = (theGuardianResponse) => {
  const newArray = theGuardianResponse?.response?.results?.map((nolItem) => {
    // Create a new object with only the selected fields
    const newObject = {
      Headline: nolItem?.webTitle,
      DescriptionText1: nolItem?.fields?.trailText,
      DescriptionText2: nolItem?.fields?.bodyText,
      Author: null,
      Source: null,
      PublishedDate: nolItem?.webPublicationDate,
      ImageContent: nolItem?.fields?.thumbnail,
      ExternalLink: nolItem?.webUrl,
    };

    return newObject;
  });

  const metaInfo = { totalRecords: theGuardianResponse?.response?.total };
  return {
    TransformedList: newArray,
    MetaInfo: metaInfo,
  };
};

export default {
  newsOrgParser,
  nyTimesParser,
  theGuardianParser
};
