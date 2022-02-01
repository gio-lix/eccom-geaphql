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

export const GET_ALL_CATEGORIES = gql`
    query Categories {
      categories {
        data {
          id
          attributes {
            name
          }
        }
      }
    }
  `

export const GET_PRODUCTS_BY_CATEGORIES = gql`
    query Category($categoryId: ID) {
      category(id: $categoryId) {
          data {
            id
            attributes {
                products {
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
          }
      }
    }
  `

export const GET_PRODUCT_BY_NAME = gql`
      query Products($filters: ProductFiltersInput) {
        products(filters: $filters) {
          data {
            id
            attributes {
              name
            }
          }
        }
      }
    `