import React from 'react'

class Register extends React.Component {
    constructor(props) {
        super()
        this.state = {
            registerEmail: "",
            registerPassword: "",
            registerName: "",
        }
    }

    onEmailChange = (event) => {
        this.setState({ registerEmail: event.target.value })
    }
    onPasswordChange = (event) => {
        this.setState({ registerPassword: event.target.value })
    }
    onNameChange = (event) => {
        this.setState({ registerName: event.target.value })
    }

    onSubmitRegister = () => {
        fetch('https://quiet-shore-53168.herokuapp.com/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.registerEmail,
                password: this.state.registerPassword,
                name: this.state.registerName
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home');
                }
            })
    }

    render() {
        return (
            <main className="pa4 mw6 center br3 pa3 mv3 ba bw1 shadow-5 b--black">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f3 fw6 ph0 mh0">Register</legend>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input
                                onChange={this.onNameChange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="text" name="name" id="name" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                                onChange={this.onEmailChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email" name="email-address" id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                                onChange={this.onPasswordChange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password" name="password" id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib br2" type="submit" value="Register" onClick={this.onSubmitRegister} />
                    </div>
                </div>
            </main>
        )
    }
}

export default Register;