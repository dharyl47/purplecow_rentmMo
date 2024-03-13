const StepForm1 = () => {
  return (
    <div>
      <label htmlFor="age">Age:</label>
      <input type="number" id="age" name="age" />
      <label htmlFor="gender">Gender:</label>
      <select id="gender" name="gender">
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
};

export default StepForm1;
