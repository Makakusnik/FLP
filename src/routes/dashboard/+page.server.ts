import type { ServerCurrencyData } from '$lib/common/widgets/CurrencyWidget/types';
import type { Order } from '$lib/common/widgets/SalesWidget/types';
import type { TodoData } from '$lib/common/widgets/TodoWidget/types';
import { codePairs, twoLetterCodes } from '$lib/constants/flags';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const schema = z.object({
	listName: z.string(),
	toDoUntil: z.date()
});

export const load = async () => {
	const currencyData: ServerCurrencyData[] = populateCurrencyData();
	const todoData: TodoData[] = populateTodoData();
	const form = await superValidate(schema);

	return { currencyData, todoData, form, orderData: populateOrders() };
};

function generateRandomNumbersArray(number: number) {
	const length = 9;
	const randomNumbersArray = [];

	for (let i = 0; i < length; i++) {
		if (number === 1) {
			randomNumbersArray.push(1);
			continue;
		}
		const num = Math.random() * number * 0.1 + number;
		const numberToRandomize = num + num * 0.1;

		if (numberToRandomize === 1) {
			randomNumbersArray.push(1);
			continue;
		}

		randomNumbersArray.push(Number(numberToRandomize.toFixed(2)));
	}

	return randomNumbersArray;
}

const populateCurrencyData = () => {
	const currencyData: ServerCurrencyData[] = [];
	for (let i = 0; i < 9; i++) {
		const flagCode = twoLetterCodes[i];
		const generatedData = generateRandomNumbersArray(
			[85.66, 89.69, 9.95, 0.89, 1, 21.4, 0.78, 0.86, 3.98][i]
		);
		const currencyCode = codePairs[flagCode];
		currencyData.push({
			dailyValues: generatedData,
			name: currencyCode,
			flagComponent: flagCode
		});
	}
	return currencyData;
};

const populateTodoData = () => {
	const todoData: TodoData[] = [];
	const todoParent1: TodoData = {
		id: '0',
		title: 'Create site',
		date: new Date().toISOString(),
		children: [
			{
				id: '0',
				name: 'Create nginx config'
			},
			{
				id: '1',
				name: 'Add DNS type A for site'
			},
			{
				id: '2',
				name: 'Setup github actions CI/CD pipline'
			}
		]
	};

	const todoParent2: TodoData = {
		id: '1',
		title: 'Fill fridge',
		date: new Date().toISOString(),
		children: [
			{
				id: '3',
				name: 'Buy gas'
			},
			{
				id: '4',
				name: 'Buy stuff'
			},
			{
				id: '5',
				name: "Don't forget kilo chleba"
			}
		]
	};

	todoData.push(todoParent1, todoParent2);

	return todoData;
};

const populateOrders: () => Order[] = () => {
	const addresses = [
		'123 Main Street, Bratislava',
		'456 Elm Avenue, Kosice',
		'789 Oak Road, Zilina',
		'321 Pine Lane, Presov',
		'654 Birch Street, Nitra',
		'987 Maple Drive, Trnava',
		'234 Cedar Court, Banska Bystrica',
		'567 Willow Place, Trencin',
		'890 Redwood Road, Poprad',
		'432 Spruce Avenue, Martin',
		'765 Juniper Lane, Piestany',
		'098 Fir Street, Zvolen',
		'345 Pinecone Road, Michalovce',
		'678 Sycamore Street, Levice',
		'901 Magnolia Lane, Komarno',
		'234 Laurel Avenue, Prievidza',
		'567 Cypress Road, Cadca',
		'890 Aspen Court, Dunajska Streda',
		'123 Holly Lane, Lucenec',
		'456 Birch Avenue, Rimavska Sobota',
		'789 Cedar Drive, Roznava',
		'321 Redwood Place, Snina',
		'654 Oak Lane, Kezmarok',
		'987 Elm Road, Humenne',
		'234 Willow Street, Stara Lubovna'
	];

	const names = [
		'Marek Novák',
		'Jana Kováčová',
		'Peter Horvát',
		'Eva Šimková',
		'Michal Krajčí',
		'Zuzana Hrušová',
		'Lukáš Ondrejka',
		'Mária Tomčíková',
		'Martin Varga',
		'Anna Urbanová',
		'Tomáš Hlaváč',
		'Veronika Dubová',
		'Jozef Jurčík',
		'Monika Gregorová',
		'Andrej Adamčík',
		'Michaela Bieliková',
		'Matúš Lukáč',
		'Barbora Chovanová',
		'Štefan Polák',
		'Lenka Fabiánová',
		'Róbert Švec',
		'Lucia Horváthová',
		'Samuel Vlk',
		'Nina Tkáčová',
		'Juraj Kratochvíl'
	];

	const productNames = [
		'ZenithTech Smartwatch',
		'LunaLux Bedside Lamp',
		'QuantumFlare Wireless Earbuds',
		'AeroGlide Luggage Set',
		'SolarPulse Portable Charger',
		'TerraTrek Hiking Boots',
		'FusionWave Blender',
		'NovaGlow Skin Serum',
		'SwiftShift Backpack',
		'LunaFrost Ice Cream Maker',
		'PinnaclePeak Trekking Poles',
		'AquaStream Water Purifier',
		'BlazeRide Electric Scooter',
		'VitaVibe Health Tracker',
		'PolarisScope Telescope',
		'ZephyrBreeze Fan',
		'SolarGaze Solar Panels',
		'TrailBlazer Camping Tent',
		'EcoCycle Bike Helmet',
		'HarmonyHub Home Automation Kit',
		'BioFresh Food Storage Containers',
		'LuxeLounge Massage Chair',
		'VitaVista Plant Growth Kit',
		'LuminancePro Projector',
		'FlexiFit Yoga Mat'
	];
	const productNames1 = [
		'StellarX Pro Gaming Mouse',
		'AquaFrost Water Bottle',
		'LunaSync Wireless Headphones',
		'EcoGlide Eco-Friendly Skateboard',
		'SolarBoost Power Bank',
		'TrailMaster Hiking Shoes',
		'BlitzBlend Smoothie Maker',
		'LuxeLift Anti-Aging Cream',
		'SkyRush Travel Backpack',
		'ChocoDeluxe Chocolate Fountain',
		'PolarPulse Ski Poles',
		'HydroGuard Water Purification System',
		'SolarRide Electric Bike',
		'VitaTrack Fitness Watch',
		'GalaxyQuest Space Telescope',
		'ZephyrBreeze Ceiling Fan',
		'SunGaze Solar Panels',
		'WildernessExplorer Camping Tent',
		'EcoRide Bike Helmet',
		'CasaConnect Smart Home Kit',
		'BioFresh Food Storage Containers',
		'SerenitySoothe Massage Chair',
		'VitaGrowth Plant Growth Kit',
		'CineMaster Home Theater Projector',
		'FlexiFlow Yoga Mat'
	];
	const productNames2 = [
		'NebulaGaze Virtual Reality Headset',
		'HydroWave Water Dispenser',
		'EcoRide Electric Scooter',
		'SolarGlow Garden Lights',
		'AeroDash Sports Shoes',
		'AquaFlow Water Filter',
		'LuxeLounge Recliner Chair',
		'QuantumPulse Bluetooth Speaker',
		'WildTrail Backpack',
		'LunaChill Ice Cream Maker',
		'GigaFlex Gaming Keyboard',
		'PolarisView Binoculars',
		'EcoPod Recycling System',
		'ZenithView 4K TV',
		'BioFresh Eco-Friendly Containers',
		'GalacticBreeze Ceiling Fan',
		'SolarSprint Solar Panels',
		'TrailBlitz Camping Gear',
		'EcoGuard Bike Helmet',
		'SmartSync Home Automation Kit',
		'VitaBloom Indoor Garden Kit',
		'NovaStream Projector',
		'AquaPulse Water Purifier',
		'LunaLuxe Massage Chair',
		'ZenithVibe Yoga Mat'
	];
	const productNames3 = [
		'EcoScape Eco-Friendly Backpack',
		'SolarFlare Portable Solar Charger',
		'LunaGlow Bedside Lamp',
		'TrailBlazer Hiking Boots',
		'AeroStream Blender',
		'StellarSound Wireless Earbuds',
		'NovaBloom Plant Growth Kit',
		'LuxeLounge Massaging Recliner',
		'QuantumPod Bluetooth Speaker',
		'AquaRise Water Bottle',
		'LunaMist Air Purifier',
		'GalaxyGlide Electric Scooter',
		'ZenithPulse Smartwatch',
		'PolarisShade Outdoor Umbrella',
		'HydroHarmony Water Filtration System',
		'TerraTrek Camping Tent',
		'FlexiFlow Yoga Mat',
		'SerenitySoothe Aromatherapy Diffuser',
		'BioBoost Organic Fertilizer',
		'ZephyrCool Cooling Fan',
		'PinnaclePower Trekking Poles',
		'SolarGaze Solar Panels',
		'EcoCycle Bike Helmet',
		'VitaSync Smart Home Hub',
		'GigaGlow LED Strip Lights'
	];

	const orders: Order[] = [];

	for (let i = 0; i <= 22; i++) {
		orders.push({
			id: Math.floor(Math.random() * 25) + '' + i,
			items: [
				{
					name: productNames[i],
					boughtAtPrice: Math.floor(Math.random() * 100 * i * 5),
					quantity: Math.floor(Math.random() * 10) + 2
				},
				{
					name: productNames1[i],
					boughtAtPrice: Math.floor(Math.random() * 100 * i * 5),
					quantity: Math.floor(Math.random() * 10) + 2
				},
				{
					name: productNames2[i],
					boughtAtPrice: Math.floor(Math.random() * 100 * i * 5),
					quantity: Math.floor(Math.random() * 10) + 2
				},
				{
					name: productNames3[i],
					boughtAtPrice: Math.floor(Math.random() * 100 * i * 5),
					quantity: Math.floor(Math.random() * 10) + 2
				}
			],
			person: {
				address: addresses[i],
				name: names[i]
			}
		});
	}
	return orders;
};
