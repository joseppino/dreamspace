<form method="POST" class="pure-form pure-form-stacked">
  <fieldset>
      <legend>Register</legend>
      <label for="stacked-email">Email</label>
      <input name="email" type="email" id="stacked-email" placeholder="Email" />
      <!-- <label for="stacked-username">Username</label>
      <input type="text" id="stacked-username" placeholder="Username" /> -->
      <span class="pure-form-message">This is a required field.</span>
      <label for="stacked-password">Password</label>
      <input name="password" type="password" id="stacked-password" placeholder="Password" />
      <label for="stacked-conf-password">Confirm Password</label>
      <input name="password-conf" type="password" id="stacked-conf-password" placeholder="Password" />
      <div class="regbtn">
        <button type="submit" class="pure-button pure-button-primary">Register</button>
      </div>
      <p>Already have an account? <a href="/login">Log In</a></p>
  </fieldset>
</form>

<style>
  legend {
    color: var(--colour5) !important;
    text-align: center;
    margin-top: 5px;
  }

  .regbtn {
    text-align: center;
    margin-top: 10px;
  }
</style>