import React, { useState, useEffect } from "react";
import { render } from "react-dom";

const App = function() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);

    return <h1>App</h1>;
};

render(<App />, document.getElementById("root"));
