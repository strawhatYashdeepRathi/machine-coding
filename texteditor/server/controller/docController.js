import document from '../schema/docSchema.js'

export const getDocument = async(id) => {
  if (id === null) return;

  const doc = await document.findById(id);

  if (doc) return doc;

  return await document.create({ _id: id, data: "" })

}

export const updateDocument = async (id, data) => {
  return await document.findByIdAndUpdate(id, { data });
}
