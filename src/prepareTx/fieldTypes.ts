//@ts-ignore
const fieldFactory = type => (fromField, toField = fromField, processor = null, optional = false) => ({
    name: fromField,
    field: toField || fromField,
    optional,
    processor,
    type
});
