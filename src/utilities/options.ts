import Case from "case";

interface Option {
  name: string;
  value: string;
}

/**
 * Creates an array of options from an object's keys.
 * @param {object} o - The object to create options from.
 * @returns {Option[]} An array of options from the object's keys.
 * @example options({ foo: "foo", bar: "bar" })
 */
const options = (o: object): Option[] => {
  return Object.keys(o).map((value) => ({
    name: Case.capital(value),
    value,
  }));
};

export default options;
