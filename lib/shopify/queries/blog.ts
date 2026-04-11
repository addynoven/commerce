import imageFragment from "../fragments/image";

const articleFragment = /* GraphQL */ `
  fragment article on Article {
    id
    title
    handle
    excerpt
    contentHtml
    publishedAt
    image {
      ...image
    }
    authorV2 {
      name
    }
    blog {
      handle
      title
    }
    seo {
      title
      description
    }
  }
  ${imageFragment}
`;

export const getBlogArticlesQuery = /* GraphQL */ `
  query getBlogArticles($handle: String!, $first: Int = 50) {
    blog(handle: $handle) {
      title
      handle
      articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
        edges {
          node {
            ...article
          }
        }
      }
    }
  }
  ${articleFragment}
`;

export const getBlogArticleQuery = /* GraphQL */ `
  query getBlogArticle($blogHandle: String!, $articleHandle: String!) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        ...article
      }
    }
  }
  ${articleFragment}
`;

export const getAllArticlesQuery = /* GraphQL */ `
  query getAllArticles($first: Int = 50) {
    articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
      edges {
        node {
          ...article
        }
      }
    }
  }
  ${articleFragment}
`;
