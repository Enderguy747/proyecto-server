
/**
 * It returns a boolean value that indicates whether or not a record with the specified id exists in
 * the specified model.
 * @param modelId - The id of the model you want to check
 * @param model - The model you want to check if it exists
 * @returns A function that returns a promise.
 */
async function validateIfNotExists (modelId, model) {
  try {
    const { count } = await model.findAndCountAll({ where: { id: modelId } })
    return !(count > 0)
  } catch (error) {
    console.error(error.message)
  }
}

export {
  validateIfNotExists
}
