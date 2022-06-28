export function useCommands() {
  const inverseCommands = []
  const restoreCommands = []
  let pointer = 0

  function addCommands(inverse, restore) {
    if (pointer < inverseCommands.length - 1)
      clearCommands()

    inverseCommands.push(inverse)
    restoreCommands.push(restore)
    ++pointer
  }

  function inverse() {
    if (inverseCommands.length === 0 || pointer - 1 < 0)
      return

    inverseCommands[pointer - 1]()
    --pointer
  }

  function restore() {
    if (restoreCommands.length === 0 || pointer >= restoreCommands.length)
      return

    restoreCommands[pointer]()
    ++pointer
  }

  function clearCommands() {
    inverseCommands.length = 0
    restoreCommands.length = 0
    pointer = 0
  }

  return {addCommands, inverse, restore, clearCommands}
}
