/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPoint = /* GraphQL */ `
	query GetPoint($id: ID!) {
		getPoint(id: $id) {
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
				__typename
			}
			createdAt
			updatedAt
			__typename
		}
	}
`;
export const listPoints = /* GraphQL */ `
	query ListPoints(
		$filter: ModelPointFilterInput
		$limit: Int
		$nextToken: String
	) {
		listPoints(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
				__typename
			}
			nextToken
			__typename
		}
	}
`;
export const getMap = /* GraphQL */ `
	query GetMap($id: ID!) {
		getMap(id: $id) {
			id
			name
			description
			center {
				lat
				lng
				__typename
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
				__typename
			}
			zoom
			adminGroup
			points {
				nextToken
				__typename
			}
			createdAt
			updatedAt
			__typename
		}
	}
`;
export const listMaps = /* GraphQL */ `
	query ListMaps(
		$filter: ModelMapFilterInput
		$limit: Int
		$nextToken: String
	) {
		listMaps(filter: $filter, limit: $limit, nextToken: $nextToken) {
			items {
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
					nextToken
				}
				createdAt
				updatedAt
				__typename
			}
			nextToken
			__typename
		}
	}
`;
export const getCategory = /* GraphQL */ `
	query GetCategory($id: ID!) {
		getCategory(id: $id) {
			id
			name
			description
			points {
				nextToken
				__typename
			}
			createdAt
			updatedAt
			__typename
		}
	}
`;
export const listCategories = /* GraphQL */ `
	query ListCategories(
		$filter: ModelCategoryFilterInput
		$limit: Int
		$nextToken: String
	) {
		listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
			items {
				id
				name
				description
				points {
					nextToken
				}
				createdAt
				updatedAt
				__typename
			}
			nextToken
			__typename
		}
	}
`;
export const getHistory = /* GraphQL */ `
	query GetHistory($id: ID!) {
		getHistory(id: $id) {
			id
			date
			name
			description
			pointId
			createdAt
			updatedAt
			__typename
		}
	}
`;
export const listHistories = /* GraphQL */ `
	query ListHistories(
		$filter: ModelHistoryFilterInput
		$limit: Int
		$nextToken: String
	) {
		listHistories(filter: $filter, limit: $limit, nextToken: $nextToken) {
			items {
				id
				date
				name
				description
				pointId
				createdAt
				updatedAt
				__typename
			}
			nextToken
			__typename
		}
	}
`;
export const pointsByMapId = /* GraphQL */ `
	query PointsByMapId(
		$mapId: ID!
		$sortDirection: ModelSortDirection
		$filter: ModelPointFilterInput
		$limit: Int
		$nextToken: String
	) {
		pointsByMapId(
			mapId: $mapId
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
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
				__typename
			}
			nextToken
			__typename
		}
	}
`;
export const pointsByCategoryId = /* GraphQL */ `
	query PointsByCategoryId(
		$categoryId: ID!
		$sortDirection: ModelSortDirection
		$filter: ModelPointFilterInput
		$limit: Int
		$nextToken: String
	) {
		pointsByCategoryId(
			categoryId: $categoryId
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
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
				__typename
			}
			nextToken
			__typename
		}
	}
`;
export const historiesByPointId = /* GraphQL */ `
	query HistoriesByPointId(
		$pointId: ID!
		$sortDirection: ModelSortDirection
		$filter: ModelHistoryFilterInput
		$limit: Int
		$nextToken: String
	) {
		historiesByPointId(
			pointId: $pointId
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				date
				name
				description
				pointId
				createdAt
				updatedAt
				__typename
			}
			nextToken
			__typename
		}
	}
`;
