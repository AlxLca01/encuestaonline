const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Servir archivos estáticos del directorio raíz
app.use(express.static(__dirname));

// Cualquier ruta que no coincida con un archivo estático enviará el index.html
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
