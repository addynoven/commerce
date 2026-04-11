import imageFragment from "./image";
import seoFragment from "./seo";

const productFragment = /* GraphQL */ `
  fragment product on Product {
    id
    handle
    availableForSale
    title
    description
    descriptionHtml
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      ...image
    }
    images(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }
    seo {
      ...seo
    }
    tags
    updatedAt
    productType
    vendor
    usps: metafield(namespace: "custom", key: "usps") {
      value
    }
    offers: metafield(namespace: "custom", key: "product_offers") {
      value
    }
    viewCount: metafield(namespace: "custom", key: "view_count") {
      value
    }
    faqs: metafield(namespace: "custom", key: "faqs") {
      value
    }
    rating: metafield(namespace: "reviews", key: "rating") {
      value
    }
    ratingCount: metafield(namespace: "reviews", key: "rating_count") {
      value
    }
    reviewsJson: metafield(namespace: "custom", key: "reviews_json") {
      value
    }
    media(first: 10) {
      edges {
        node {
          ... on Video {
            id
            sources {
              url
              mimeType
              format
            }
            previewImage {
              url
            }
          }
        }
      }
    }
  }
  ${imageFragment}
  ${seoFragment}
`;

export default productFragment;
