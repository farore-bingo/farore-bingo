import * as rawData from "$data/bingo.json"

export interface Space {
	html: string
	weight?: number
}

export interface Config {
	freeSpaces: Space[]
	spaces: Space[]
}

export interface Board {
	spaces: string[]
	checked: boolean[]
}

const config = rawData as Config

export function createBoard(): Board {
	let freeSpace = weightedPickN(config.freeSpaces, 1)
	let normalSpaces = weightedPickN(config.spaces, 24)
	normalSpaces.splice(12, 0, freeSpace[0])
	return {
		spaces: normalSpaces.map(({ html }) => html),
		checked: Array.from<boolean>({ length: 25 }).fill(false),
	}
}

class BagTooSmallError extends Error {
	name = "BagTooSmallError"
	constructor(
		public bagLength: number,
		public n: number,
	) {
		super(`Tried to pick ${n} elements from a bag of ${bagLength} elements`)
	}
}

function weightedPickN<T extends { weight?: number }>(bag: T[], n: number): T[] {
	if (bag.length < n) throw new BagTooSmallError(bag.length, n)
	let choices: number[] = []
	for (let i = 0; i < bag.length; i++) {
		let { weight = 1 } = bag[i]
		for (let j = 0; j < weight; j++) {
			choices.push(i)
		}
	}
	let picked = new Set<T>()
	while (n > 0) {
		let choice = choices[Math.floor(Math.random() * choices.length)]
		if (!picked.has(bag[choice])) {
			picked.add(bag[choice])
			n--
		}
	}
	return Array.from(picked)
}
