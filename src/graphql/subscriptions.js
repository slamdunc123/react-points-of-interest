/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePoint = /* GraphQL */ `
  subscription OnCreatePoint($filter: ModelSubscriptionPointFilterInput) {
    onCreatePoint(filter: $filter) {
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
      history {
        items {
          id
          date
          name
          description
          pointId
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
export const onUpdatePoint = /* GraphQL */ `
  subscription OnUpdatePoint($filter: ModelSubscriptionPointFilterInput) {
    onUpdatePoint(filter: $filter) {
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
      history {
        items {
          id
          date
          name
          description
          pointId
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
export const onDeletePoint = /* GraphQL */ `
  subscription OnDeletePoint($filter: ModelSubscriptionPointFilterInput) {
    onDeletePoint(filter: $filter) {
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
      history {
        items {
          id
          date
          name
          description
          pointId
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
export const onCreateMap = /* GraphQL */ `
  subscription OnCreateMap($filter: ModelSubscriptionMapFilterInput) {
    onCreateMap(filter: $filter) {
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
export const onUpdateMap = /* GraphQL */ `
  subscription OnUpdateMap($filter: ModelSubscriptionMapFilterInput) {
    onUpdateMap(filter: $filter) {
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
export const onDeleteMap = /* GraphQL */ `
  subscription OnDeleteMap($filter: ModelSubscriptionMapFilterInput) {
    onDeleteMap(filter: $filter) {
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
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onCreateCategory(filter: $filter) {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onUpdateCategory(filter: $filter) {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onDeleteCategory(filter: $filter) {
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
export const onCreateHistory = /* GraphQL */ `
  subscription OnCreateHistory($filter: ModelSubscriptionHistoryFilterInput) {
    onCreateHistory(filter: $filter) {
      id
      date
      name
      description
      pointId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHistory = /* GraphQL */ `
  subscription OnUpdateHistory($filter: ModelSubscriptionHistoryFilterInput) {
    onUpdateHistory(filter: $filter) {
      id
      date
      name
      description
      pointId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHistory = /* GraphQL */ `
  subscription OnDeleteHistory($filter: ModelSubscriptionHistoryFilterInput) {
    onDeleteHistory(filter: $filter) {
      id
      date
      name
      description
      pointId
      createdAt
      updatedAt
    }
  }
`;
