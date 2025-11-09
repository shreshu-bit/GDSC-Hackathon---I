const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname));

// Change '/*' to '/*splat' to fix the error
app.get('/*splat', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
