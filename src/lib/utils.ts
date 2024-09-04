type Result<T, E> = { kind: "success"; value: T } | { kind: "error"; error: E }

export function tryCatch<T, E = Error>(fn: () => T): Result<T, E> {
	try {
		return { kind: "success", value: fn() }
	} catch (error) {
		return { kind: "error", error: error as E }
	}
}

export function arrayOf<T>(length: number, value: T): T[] {
	return Array.from<T>({ length }).fill(value)
}

export function arrayBy<T>(length: number, f: (i: number) => T): T[] {
	return Array.from<T>({ length }).map((_, i) => f(i))
}
