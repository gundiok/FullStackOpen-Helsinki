const Form = ({ onSubmit, onChange, value }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input value={value.name} onChange={onChange} id="name" name="name" />
        <label htmlFor="number">Number</label>
        <input
          value={value.number}
          onChange={onChange}
          id="number"
          name="number"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
