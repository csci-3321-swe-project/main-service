import Case from "case";

interface Option {
  name: string;
  value: string;
}

const options = (o: object): Option[] => {
  return Object.keys(o).map((value) => ({
    name: Case.capital(value),
    value,
  }));
};

export default options;
