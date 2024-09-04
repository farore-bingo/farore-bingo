import { arrayOf } from "$lib/utils"

export interface Space {
	html: string
	weight?: number
}

export interface Config {
	freeSpaces: Space[]
	spaces: Space[]
}

const BINGOS = [
	[0, 1, 2, 3, 4],
	[5, 6, 7, 8, 9],
	[10, 11, 12, 13, 14],
	[15, 16, 17, 18, 19],
	[20, 21, 22, 23, 24],
	[0, 5, 10, 15, 20],
	[1, 6, 11, 16, 21],
	[2, 7, 12, 17, 22],
	[3, 8, 13, 18, 23],
	[4, 9, 14, 19, 24],
	[0, 6, 12, 18, 24],
	[4, 8, 12, 16, 20],
]

export class BingoBoard {
	spaces = $state(arrayOf(25, ""))
	checked = $state(arrayOf(25, false))
	bingos = $state(arrayOf(12, false))

	constructor(config: Config) {
		let freeSpace = weightedPickN(config.freeSpaces, 1)
		let normalSpaces = weightedPickN(config.spaces, 24)
		normalSpaces.splice(12, 0, freeSpace[0])
		this.spaces = normalSpaces.map(({ html }) => html)
	}

	check(i: number) {
		this.checked[i] = !this.checked[i]
		this.recomputeBingos()
	}

	private recomputeBingos() {
		for (let i = 0; i < BINGOS.length; i++) {
			let bingo = BINGOS[i]
			let complete = true
			for (const j of bingo) {
				complete &&= this.checked[j]
			}
			this.bingos[i] = complete
		}
	}
}

export class BagTooSmallError extends Error {
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
