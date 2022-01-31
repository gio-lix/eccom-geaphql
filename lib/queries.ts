import {gql} from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
    query getAllProducts {
      products {
        data {
          id
          attributes {
            name
            description
            price
            images {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  `
export const GET_PRODUCT_BY_ID = gql`
    query Product($productId: ID) {
      product(id: $productId) {
        data {
          id
          attributes {
            name
            price
            description
            images {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  `