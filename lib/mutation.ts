import gql from "graphql-tag";

export const LOGIN_USER = gql`
        mutation Login($input: UsersPermissionsLoginInput!) {
          login(input: $input) {
            jwt,
            user {
              email
            }
          }
        }
    `

export const SIGNUP_USER = gql`
       mutation Mutation($input: UsersPermissionsRegisterInput!) {
          register(input: $input) {
            jwt
            user {
              email
            }
          }
        }
    `