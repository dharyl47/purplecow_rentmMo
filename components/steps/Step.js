// components/Step.js

const Step = ({ number, title, description, children, onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div>
      <h2>
        Step {number}: {title}
      </h2>
      <p>{description}</p>
      <form onSubmit={handleSubmit}>
        {children}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Step;
