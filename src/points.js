import {v4 as uuidv4} from 'uuid'

const points = [
	{
		id: uuidv4(),
		lat: 53.19404899493641,
		lng: -1.696920702254617,
		name: "St Anne's Church",
		yearBuilt: '1880',
		url: 'https://bakewellchurch.co.uk/st-annes/',
	},
	{
		id: uuidv4(),
		lat: 53.19466133419585,
		lng: -1.6923020801932414,
		name: 'Village Hall',
		yearBuilt: '2011',
		url: 'http://www.ohvh.org.uk/',
	},
	{
		id: uuidv4(),
		lat: 53.19441922553541,
		lng: -1.6918493628112956,
		name: 'Wesleyan Reform Chapel',
		yearBuilt: '1861',
		url: 'https://churchdb.gukutils.org.uk/DBY495.php',
	},
	{
		id: uuidv4(),
		lat: 53.19439458686612,
		lng: -1.6911380015094384,
		name: 'Lathkil Hotel',
		yearBuilt: '1828',
		url: 'https://www.lathkil.co.uk/',
	},
];

export default points;
