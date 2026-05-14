import React from 'react'

export default function ContactTemplate1() {
  return (
    <div>
      <h1>Contact Us — Template 1</h1>
      <p>Reach out to us at hello@example.com or call 555-0100.</p>
      <h2>Send a Message</h2>
      <form>
        <label>Name</label>
        <br />
        <input />
        <br />
        <label>Email</label>
        <br />
        <input />
        <br />
        <label>Message</label>
        <br />
        <textarea />
        <br />
        <button type="button">Send</button>
      </form>
    </div>
  )
}
