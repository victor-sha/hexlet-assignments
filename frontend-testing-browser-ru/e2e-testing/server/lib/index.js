import { faker } from '@faker-js/faker';
import _ from 'lodash';

const seed = 123;
const categoriesCount = 3;
const artclesCount = 4;

// eslint-disable-next-line
export const generateData = () => {
  faker.seed(seed);

  const categories = Array(categoriesCount).fill(null)
    .map(() => ({
      id: _.uniqueId(),
      name: faker.lorem.words(),
    }));

  const articles = Array(artclesCount).fill(null)
    .map(() => {
      const categoryIndex = _.random(categories.length - 1);
      return {
        id: _.uniqueId(),
        name: faker.lorem.words(),
        content: faker.lorem.paragraphs(),
        categoryId: categories[categoryIndex].id,
      };
    });

  return {
    categories,
    articles,
  };
};
