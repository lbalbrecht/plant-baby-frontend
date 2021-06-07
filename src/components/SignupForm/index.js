import React from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";

function SignupForm(props) {
  return (
    <form onSubmit={props.handleSignupFormSubmit}>
      <InputLabel htmlFor="component-outlined">Email</InputLabel>
      <OutlinedInput
        name="email"
        value={props.signupFormState.email}
        onChange={(e) =>
          props.setSignupFormState({
            ...props.signupFormState,
            email: e.target.value,
          })
        }
      />
      <InputLabel htmlFor="component-outlined">First Name</InputLabel>
      <OutlinedInput
        name="first_name"
        value={props.signupFormState.first_name}
        onChange={(e) =>
          props.setSignupFormState({
            ...props.signupFormState,
            first_name: e.target.value,
          })
        }
      />
      <InputLabel htmlFor="component-outlined">Last Name</InputLabel>
      <OutlinedInput
        name="last_name"
        value={props.signupFormState.last_name}
        onChange={(e) =>
          props.setSignupFormState({
            ...props.signupFormState,
            last_name: e.target.value,
          })
        }
      />
      <InputLabel htmlFor="component-outlined">Password</InputLabel>
      <OutlinedInput
        name="password"
        type="password"
        value={props.signupFormState.password}
        onChange={(e) =>
          props.setSignupFormState({
            ...props.signupFormState,
            password: e.target.value,
          })
        }
      />
      <button type="submit" value="signup">
        Signup
      </button>
    </form>
  );
}

export default SignupForm;
