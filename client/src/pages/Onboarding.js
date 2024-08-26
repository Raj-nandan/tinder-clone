import React from 'react'
import { useState } from 'react'
import Nav from '../components/Nav'

const Onboarding = () => {

  const [formData, setFormData] = useState({
    user_id: "",
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_gender: false,
    gender_identity: 'man',
    gender_interest: 'woman',
    email: "",
    url: "",
    about: "",
    matches: []
  })



  const handleSubmit = () => {
    console.log("submitted");
  }
  const handleChange = (e) => {
    console.log('e' + e)
    const value =  e.target.type === "checkbox" ? e.target.checked : e.target.value
    const name = e.target.name
 
    console.log('value ' + value, 'name ' + name)

    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  console.log(formData)

  return (
    <div>
      <Nav minimal={true} setShowModal={() => { }} showModel={false} />

      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required={true}
              value={formData.first_name}
              onChange={handleChange}
            />

            <label>Birthday</label>
            <div className="multiple_input_container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />
              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />
              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>

            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-identity"
                type="radio"
                name="gender_identity"
                value={"man"}
                onChange={handleChange}
                checked={formData.gender_identity === 'man'}
              />
              <label htmlFor="man-gender-identity">Man</label>
              <input
                id="woman-gender-identity"
                type="radio"
                name="gender_identity"
                value={"woman"}
                onChange={handleChange}
                checked={formData.gender_identity === 'woman'}
              />
              <label htmlFor="woman-gender-identity">Woman</label>
              <input
                id="other-gender-identity"
                type="radio"
                name="gender_identity"
                value={"other"}
                onChange={handleChange}
                checked={formData.gender_identity === 'other'}
              />
              <label htmlFor="other-gender-identity">Other</label>
            </div>

            <label htmlFor="show-gender">Show gender on my profile</label>
            <input
              id="show-gender"
              type="checkbox"
              name="show_gender"
              onChange={handleChange}
              checked={formData.show_gender}
            />


            <label >My Interest</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-interest"
                type="radio"
                name="gender_interest"
                value={"man"}
                onChange={handleChange}
                checked={formData.gender_interest === 'man'}
              />
              <label htmlFor="man-gender-interest">Man</label>
              <input
                id="woman-gender-interest"
                type="radio"
                name="gender_interest"
                value={"woman"}
                onChange={handleChange}
                checked={formData.gender_interest === 'woman'}
              />
              <label htmlFor="woman-gender-interest">Woman</label>
              <input
                id="other-gender-interest"
                type="radio"
                name="gender_interest"
                value={"other"}
                onChange={handleChange}
                checked={formData.gender_interest === 'other'}
              />
              <label htmlFor="other-gender-interest">Other</label>
            </div>

            <label htmlFor="about">About Me</label>
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like to have late night walks..."
              value={formData.about}
              onChange={handleChange}
            />
            <input type="submit" />

          </section>

          <section>
            <label htmlFor="url">Profile Picture</label>

            <input
              type="url"
              name="url"
              id="url"
              onChange={handleChange}
              required={true}
            />

            <div className="photo-container">
            <img src={formData.url} alt="profile preview" />
            </div>

          </section>

        </form>

      </div>
    </div>
  )
}

export default Onboarding
