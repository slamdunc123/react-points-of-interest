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
      yearBuilt
      url
      description
      image
      imageName
      mapId
      categoryId
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
      yearBuilt
      url
      description
      image
      imageName
      mapId
      categoryId
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
      yearBuilt
      url
      description
      image
      imageName
      mapId
      categoryId
      createdAt
      updatedAt
    }
  }
`;
export const createMap = /* GraphQL */ `
  mutation CreateMap(
    $input: CreateMapInput!
    $condition: ModelMapConditionInput
  ) {
    createMap(input: $input, condition: $condition) {
      id
      name
      description
      center {
        lat
        lng
      }
      circleOptions {
        strokeColor
        strokeOpacity
        strokeWeight
        fillColor
        fillOpacity
        clickable
        draggable
        editable
        visible
        radius
        zIndex
      }
      zoom
      adminGroup
      points {
        items {
          id
          name
          lat
          lng
          yearBuilt
          url
          description
          image
          imageName
          mapId
          categoryId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateMap = /* GraphQL */ `
  mutation UpdateMap(
    $input: UpdateMapInput!
    $condition: ModelMapConditionInput
  ) {
    updateMap(input: $input, condition: $condition) {
      id
      name
      description
      center {
        lat
        lng
      }
      circleOptions {
        strokeColor
        strokeOpacity
        strokeWeight
        fillColor
        fillOpacity
        clickable
        draggable
        editable
        visible
        radius
        zIndex
      }
      zoom
      adminGroup
      points {
        items {
          id
          name
          lat
          lng
          yearBuilt
          url
          description
          image
          imageName
          mapId
          categoryId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteMap = /* GraphQL */ `
  mutation DeleteMap(
    $input: DeleteMapInput!
    $condition: ModelMapConditionInput
  ) {
    deleteMap(input: $input, condition: $condition) {
      id
      name
      description
      center {
        lat
        lng
      }
      circleOptions {
        strokeColor
        strokeOpacity
        strokeWeight
        fillColor
        fillOpacity
        clickable
        draggable
        editable
        visible
        radius
        zIndex
      }
      zoom
      adminGroup
      points {
        items {
          id
          name
          lat
          lng
          yearBuilt
          url
          description
          image
          imageName
          mapId
          categoryId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
      id
      name
      description
      points {
        items {
          id
          name
          lat
          lng
          yearBuilt
          url
          description
          image
          imageName
          mapId
          categoryId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
      id
      name
      description
      points {
        items {
          id
          name
          lat
          lng
          yearBuilt
          url
          description
          image
          imageName
          mapId
          categoryId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
      id
      name
      description
      points {
        items {
          id
          name
          lat
          lng
          yearBuilt
          url
          description
          image
          imageName
          mapId
          categoryId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
