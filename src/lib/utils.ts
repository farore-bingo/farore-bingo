type Result<T, E> = { kind: "success"; value: T } | { kind: "error"; error: E }

export function tryCatch<T, E = Error>(fn: () => T): Result<T, E> {
	try {
		return { kind: "success", value: fn() }
	} catch (error) {
		return { kind: "error", error: error as E }
	}
}
