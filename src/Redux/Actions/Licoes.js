export const ADD_LICOES = 'ADD_LICOES';
export const LESSON_COMPLETED = 'LESSON_COMPLETED';
export const ADD_ANSWERS = 'ADD_ANSWERS';
export const IS_FETCHING_LESSONS = 'IS_FETCHING_LESSONS';

export const addLicoes = (data, licao, name) => (
  {
    type: 'ADD_LICOES',
    data,
    licao,
    name
  }
);

export const lessonCompleted = (pos, value) => (
  {
    type: 'LESSON_COMPLETED',
    pos,
    value
  }
);

export const addAnswers = (data) => (
  {
    type: 'ADD_ANSWERS',
    data
  }
);

export const isFetchingLessons = () => (
  {
    type: 'IS_FETCHING_LESSONS'
  }
);
