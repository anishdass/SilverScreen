import "../css/Login.css";

function Login() {
  return (
    <div className='login-form'>
      <form>
        <div className='form-group'>
          <input
            type='email'
            className='login-form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            placeholder='Username'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='login-form-control'
            id='exampleInputPassword1'
            placeholder='Password'
          />
        </div>
        <div className='form-group form-check'>
          <input
            type='checkbox'
            className='form-check-input'
            id='exampleCheck1'
          />
          <label className='form-check-label' htmlFor='exampleCheck1'>
            Keep me logged in
          </label>
        </div>
        <button type='submit' className='submit-btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
