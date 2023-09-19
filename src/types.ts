export type MapType = {
	id: string;
	name: string;
	description: string;
	center: MapCenter;
	circleOptions: MapCircleOptions;
	zoom: number;
	adminGroup: string;
	points: {
		items: PointType[];
	};
};

type MapCenter = {
	lat: number;
	lng: number;
};

type MapCircleOptions = {
	strokeColor: string;
	strokeOpacity: number;
	strokeWeight: number;
	fillColor: string;
	fillOpacity: number;
	clickable: boolean;
	draggable: boolean;
	editable: boolean;
	visible: boolean;
	radius: number;
	zIndex: number;
};

export type CategoryType = {
	id: string;
	name: string;
	description: string;
	points: {
		items: PointType[];
	};
};

export type PointType = {
	id: string;
	name: string;
	lat: string;
	lng: string;
	type: string;
	yearBuilt: string;
	url: string;
	description: string;
	image: any;
	imageName: string;
	categoryId: string;
	history: {
		items: HistoryType[];
	};
};

export type HistoryType = {
	id: string;
	date: string;
	name: string;
	description: string;
};
