import React from "react"

class App extends React.Component {
    render() {
        return(
            <div className="app">
                <form>
                    <h1>Регистрация</h1>
                    <input name='email' type='text' placeholder='Enter your email....'/>
                    <input name='password' type='password' placeholder='Enter your password....'/>
                    <button type='submit'>Registration</button>
                </form>
            </div>
        )
    }
}
export default App;