const Course = ({ course }) => {
  const totalNoOfExercises = course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0,
  );
  return (
    <div>
      <h1>{course.name}</h1>
      <ul>
        {course.parts.map((p) => (
          <li key={p.id}>
            {p.name} {p.exercises}
          </li>
        ))}
      </ul>
      <p>
        Total of <b>{totalNoOfExercises}</b> exercises
      </p>
    </div>
  );
};

export default Course;
