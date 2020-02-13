import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          King Tote Checkout Component.
        </p>
      </header>
      <main>
        <article>
          <form>
            <label>
              Name:
              <input type="text" name="name" />
            </label>
            <label>
              Email:
              <input type="email" name="email" />
            </label>
            <label>
              Service area:
              <select value="" onChange="">
                <option value="grapefruit">Select a service area</option>
                <option value="lime">Portland</option>
                <option value="coconut">Portland</option>
                <option value="mango">Portland</option>
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </article>
      </main>
    </div>
  );
}

export default App;
