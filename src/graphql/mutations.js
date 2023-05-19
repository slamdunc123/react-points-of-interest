/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPoint = /* GraphQL */ `
  mutation CreatePoint(
    $input: CreatePointInput!
    $condition: ModelPointConditionInput
  ) {
    createPoint(input: $input, condition: $condition) {
      id
      name
      lat
      lng
      type
      yearBuilt
      url
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const updatePoint = /* GraphQL */ `
  mutation UpdatePoint(
    $input: UpdatePointInput!
    $condition: ModelPointConditionInput
  ) {
    updatePoint(input: $input, condition: $condition) {
      id
      name
      lat
      lng
      type
      yearBuilt
      url
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const deletePoint = /* GraphQL */ `
  mutation DeletePoint(
    $input: DeletePointInput!
    $condition: ModelPointConditionInput
  ) {
    deletePoint(input: $input, condition: $condition) {
      id
      name
      lat
      lng
      type
      yearBuilt
      url
      description
      image
      createdAt
      updatedAt
    }
  }
`;
